import abc
import json
import logging
import httpx
from typing import Dict, Any, Optional, List
from app.config import settings

logger = logging.getLogger(__name__)

class BaseAIProvider(abc.ABC):
    @abc.abstractmethod
    async def generate_text(self, prompt: str, max_tokens: int = 3000) -> str:
        pass


class OpenAIProvider(BaseAIProvider):
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.endpoint = "https://api.openai.com/v1/chat/completions"

    async def generate_text(self, prompt: str, max_tokens: int = 3000) -> str:
        if not self.api_key:
            raise ValueError("OpenAI API Key not provided")
        
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
        payload = {
            "model": "gpt-4o",
            "messages": [
                {"role": "system", "content": "You are CivitasAI, an expert strategic foresight engine capable of deep civilization simulation."},
                {"role": "user", "content": prompt}
            ],
            "max_tokens": max_tokens,
            "temperature": 0.7
        }
        
        async with httpx.AsyncClient(timeout=60.0) as client:
            response = await client.post(self.endpoint, headers=headers, json=payload)
            response.raise_for_status()
            data = response.json()
            return data["choices"][0]["message"]["content"]


class GeminiProvider(BaseAIProvider):
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.endpoint = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key={self.api_key}"

    async def generate_text(self, prompt: str, max_tokens: int = 3000) -> str:
        if not self.api_key:
            raise ValueError("Gemini API Key not provided")
        
        headers = {"Content-Type": "application/json"}
        payload = {
            "contents": [{"parts": [{"text": prompt}]}],
            "generationConfig": {
                "temperature": 0.7,
                "maxOutputTokens": max_tokens
            }
        }
        
        async with httpx.AsyncClient(timeout=60.0) as client:
            response = await client.post(self.endpoint, headers=headers, json=payload)
            response.raise_for_status()
            data = response.json()
            return data["candidates"][0]["content"]["parts"][0]["text"]


class AnthropicProvider(BaseAIProvider):
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.endpoint = "https://api.anthropic.com/v1/messages"

    async def generate_text(self, prompt: str, max_tokens: int = 3000) -> str:
        if not self.api_key:
            raise ValueError("Anthropic API Key not provided")
        
        headers = {
            "x-api-key": self.api_key,
            "anthropic-version": "2023-06-01",
            "Content-Type": "application/json"
        }
        payload = {
            "model": "claude-3-5-sonnet-20240620",
            "max_tokens": max_tokens,
            "system": "You are CivitasAI, an expert strategic foresight engine capable of deep civilization simulation.",
            "messages": [{"role": "user", "content": prompt}]
        }
        
        async with httpx.AsyncClient(timeout=60.0) as client:
            response = await client.post(self.endpoint, headers=headers, json=payload)
            response.raise_for_status()
            data = response.json()
            return data["content"][0]["text"]


class OllamaProvider(BaseAIProvider):
    def __init__(self, base_url: str, model_name: str = "llama3"):
        self.base_url = base_url.rstrip("/")
        self.model_name = model_name
        self.endpoint = f"{self.base_url}/api/generate"

    async def generate_text(self, prompt: str, max_tokens: int = 3000) -> str:
        headers = {"Content-Type": "application/json"}
        payload = {
            "model": self.model_name,
            "prompt": prompt,
            "stream": False,
            "options": {
                "temperature": 0.7,
                "num_predict": max_tokens
            }
        }
        
        async with httpx.AsyncClient(timeout=60.0) as client:
            response = await client.post(self.endpoint, headers=headers, json=payload)
            response.raise_for_status()
            data = response.json()
            return data["response"]


class MockProvider(BaseAIProvider):
    async def generate_text(self, prompt: str, max_tokens: int = 3000) -> str:
        logger.info("Using Mock AI Provider for forecast enhancement.")
        return (
            "Based on strategic multi-domain simulation, our synthesis indicates an accelerating rate of "
            "technological leapfrogging coupled with systemic vulnerability in resource management. "
            "Sustained investments in energy innovation and AI abstractions create robust pathways to mitigate black swan climate disruptions."
        )


class AIService:
    def __init__(self):
        self.providers: Dict[str, BaseAIProvider] = {}
        self._register_providers()

    def _register_providers(self):
        # Register available providers based on settings
        if settings.OPENAI_API_KEY:
            self.providers["openai"] = OpenAIProvider(settings.OPENAI_API_KEY)
        if settings.GEMINI_API_KEY:
            self.providers["gemini"] = GeminiProvider(settings.GEMINI_API_KEY)
        if settings.ANTHROPIC_API_KEY:
            self.providers["anthropic"] = AnthropicProvider(settings.ANTHROPIC_API_KEY)
        
        self.providers["ollama"] = OllamaProvider(settings.OLLAMA_BASE_URL)
        self.providers["mock"] = MockProvider()

    async def enhance_forecast(self, domain: str, scenario: str, slider_params: Dict[str, Any], model_choice: Optional[str] = None) -> str:
        provider_name = model_choice or settings.PRIMARY_AI_MODEL
        provider = self.providers.get(provider_name)
        
        # Fallback sequence
        if not provider:
            logger.warning(f"Provider {provider_name} not available, falling back to mock provider.")
            provider = self.providers["mock"]

        prompt = (
            f"Generate a concise, professional strategic foresight narrative for the {domain} domain under a {scenario} scenario. "
            f"Current global parameter indices (0-100 scale): {json.dumps(slider_params)}. "
            "Provide insightful, realistic synthesis suitable for executive decision-makers."
        )

        try:
            return await provider.generate_text(prompt)
        except Exception as e:
            logger.error(f"Error calling AI provider {provider_name}: {str(e)}. Falling back to mock provider.")
            mock_prov = self.providers["mock"]
            return await mock_prov.generate_text(prompt)

ai_service = AIService()
