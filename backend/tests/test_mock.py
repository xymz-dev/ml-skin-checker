import pytest
from app.providers.mock_provider import MockProvider

@pytest.mark.asyncio
async def test_mock():
    p = MockProvider()
    data = await p.check_player("123", "456")
    assert data.total_skins > 0
    assert len(data.heroes) > 0
