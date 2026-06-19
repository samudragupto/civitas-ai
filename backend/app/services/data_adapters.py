import abc
import random
import asyncio
from typing import Dict, List, Any, Optional

class BaseDataSourceAdapter(abc.ABC):
    @abc.abstractmethod
    async def fetch_indicators(self) -> Dict[str, Any]:
        """Fetch global indicators and historical datasets."""
        pass

    @abc.abstractmethod
    def get_metadata(self) -> Dict[str, str]:
        """Return metadata about the source."""
        pass


class WorldBankAdapter(BaseDataSourceAdapter):
    async def fetch_indicators(self) -> Dict[str, Any]:
        # Simulating asynchronous fetch from World Bank API (e.g. World Development Indicators)
        await asyncio.sleep(0.05)
        return {
            "global_gdp_usd": 105.0e12,  # 105 Trillion USD
            "gdp_growth_global_avg": 2.8,
            "poverty_rate_pct": 8.4,
            "life_expectancy_global": 73.4
        }

    def get_metadata(self) -> Dict[str, str]:
        return {
            "name": "World Bank Group",
            "code": "world_bank",
            "description": "Global economic indicators, development metrics, and financial indices.",
            "url": "https://data.worldbank.org"
        }


class IMFAdapter(BaseDataSourceAdapter):
    async def fetch_indicators(self) -> Dict[str, Any]:
        await asyncio.sleep(0.05)
        return {
            "global_inflation_rate": 4.1,
            "public_debt_to_gdp_pct": 93.2,
            "emerging_market_growth": 4.2,
            "advanced_economy_growth": 1.7
        }

    def get_metadata(self) -> Dict[str, str]:
        return {
            "name": "International Monetary Fund",
            "code": "imf",
            "description": "Macroeconomic stability, fiscal policy, and currency reserves data.",
            "url": "https://www.imf.org/en/Data"
        }


class UNAdapter(BaseDataSourceAdapter):
    async def fetch_indicators(self) -> Dict[str, Any]:
        await asyncio.sleep(0.05)
        return {
            "world_population_current": 8.2e9,  # 8.2 Billion
            "urbanization_rate_pct": 57.5,
            "global_fertility_rate": 2.25,
            "migration_flows_millions": 281.0
        }

    def get_metadata(self) -> Dict[str, str]:
        return {
            "name": "United Nations Population Division",
            "code": "un",
            "description": "Demographic projections, migration patterns, and urbanization trends.",
            "url": "https://population.un.org"
        }


class NASAAdapter(BaseDataSourceAdapter):
    async def fetch_indicators(self) -> Dict[str, Any]:
        await asyncio.sleep(0.05)
        return {
            "global_temp_anomaly_c": 1.35,  # degrees C above pre-industrial
            "arctic_sea_ice_extent_mkm2": 4.2, # Million sq km
            "sea_level_anomaly_mm": 104.5,
            "co2_concentration_ppm": 425.0
        }

    def get_metadata(self) -> Dict[str, str]:
        return {
            "name": "NASA Goddard Institute for Space Studies",
            "code": "nasa",
            "description": "Earth science, global temperature anomalies, sea level altimetry, and atmospheric chemistry.",
            "url": "https://data.giss.nasa.gov"
        }


class OECDAdapter(BaseDataSourceAdapter):
    async def fetch_indicators(self) -> Dict[str, Any]:
        await asyncio.sleep(0.05)
        return {
            "rd_expenditure_pct_gdp": 2.7,
            "tertiary_edu_attainment_pct": 41.2,
            "automation_vulnerability_pct": 28.0,
            "renewable_energy_share_pct": 31.0
        }

    def get_metadata(self) -> Dict[str, str]:
        return {
            "name": "OECD Data",
            "code": "oecd",
            "description": "Innovation metrics, labor market shifts, automation risk, and educational standards.",
            "url": "https://data.oecd.org"
        }


class OurWorldInDataAdapter(BaseDataSourceAdapter):
    async def fetch_indicators(self) -> Dict[str, Any]:
        await asyncio.sleep(0.05)
        return {
            "internet_penetration_pct": 67.2,
            "ai_compute_growth_flops": 1.0e26,
            "solar_wind_cost_reduction_pct": 85.0,
            "extreme_poverty_trend": "declining"
        }

    def get_metadata(self) -> Dict[str, str]:
        return {
            "name": "Our World in Data",
            "code": "owid",
            "description": "Open-access empirical datasets covering technological progress, living conditions, and energy shifts.",
            "url": "https://ourworldindata.org"
        }


class DataSourceService:
    def __init__(self):
        self.adapters: Dict[str, BaseDataSourceAdapter] = {
            "world_bank": WorldBankAdapter(),
            "imf": IMFAdapter(),
            "un": UNAdapter(),
            "nasa": NASAAdapter(),
            "oecd": OECDAdapter(),
            "owid": OurWorldInDataAdapter()
        }

    def list_sources(self) -> List[Dict[str, str]]:
        return [adapter.get_metadata() for adapter in self.adapters.values()]

    async def fetch_all_data(self) -> Dict[str, Dict[str, Any]]:
        results = {}
        for code, adapter in self.adapters.items():
            results[code] = await adapter.fetch_indicators()
        return results

    async def fetch_source_data(self, code: str) -> Optional[Dict[str, Any]]:
        adapter = self.adapters.get(code)
        if not adapter:
            return None
        return await adapter.fetch_indicators()

data_source_service = DataSourceService()
