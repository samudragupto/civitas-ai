import asyncio
import sys
import os

# Add backend to path so we can import app
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../backend')))

from app.main import seed_database
from app.database import engine

async def main():
    print("Initializing CivitasAI Enterprise PostgreSQL / SQLite Database...")
    await seed_database()
    print("Initialization Complete.")

if __name__ == "__main__":
    asyncio.run(main())
