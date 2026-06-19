import pytest
import pytest_asyncio
from httpx import AsyncClient, ASGITransport
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from app.database import Base, get_db
from app.main import app, seed_database
from app.models.user import User, UserRole
from app.services.auth_service import get_password_hash, create_access_token

TEST_DATABASE_URL = "sqlite+aiosqlite:///./test_civitas.db"

test_engine = create_async_engine(TEST_DATABASE_URL, echo=False)
TestAsyncSessionLocal = async_sessionmaker(test_engine, class_=AsyncSession, expire_on_commit=False)

async def override_get_db():
    async with TestAsyncSessionLocal() as session:
        yield session

app.dependency_overrides[get_db] = override_get_db

@pytest_asyncio.fixture(scope="function", autouse=True)
async def initialize_test_db():
    async with test_engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)
    
    # Seed
    async with TestAsyncSessionLocal() as session:
        admin_user = User(
            email="admin_test@civitasai.org",
            username="admin_test",
            hashed_password=get_password_hash("TestAdmin2026!"),
            role=UserRole.admin,
            is_active=True
        )
        session.add(admin_user)

        user_test = User(
            email="user_test@civitasai.org",
            username="user_test",
            hashed_password=get_password_hash("TestUser2026!"),
            role=UserRole.registered,
            is_active=True
        )
        session.add(user_test)
        await session.commit()
        
    yield
    async with test_engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)


@pytest_asyncio.fixture(scope="function")
async def client():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        yield ac


@pytest.fixture
def admin_token():
    return create_access_token(subject=1, role="admin")


@pytest.fixture
def user_token():
    return create_access_token(subject=2, role="registered")
