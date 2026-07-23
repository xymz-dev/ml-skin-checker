from app.providers.base import BaseProvider
from app.schemas.player import PlayerData, HeroCollection, SkinItem
import random
from datetime import datetime

ROLES = ["Tank","Fighter","Assassin","Mage","Marksman","Support"]
RARITIES = ["Grand","Exquisite","Deluxe","Exceptional","Common"]
HEROES = ["Layla","Miya","Alucard","Gusion","Ling","Hayabusa","Fanny","Aamon","Aulus","Beatrix","Melissa","Xavier","Julian","Fredrinn","Arlott","Novaria","Ixia","Lylia","Masha","Atlas","Paquito","Mathilda","Yve","Brody","Barats","Khaleed","Benedetta"]
SKIN_NAMES = ["Collector","Legend","Epic","Starlight","Elite","Special","Luckybox","Neon","Cyber","Inferno","Dragon","S.A.B.E.R","Exorcist","Aspirant","Sanrio","Transformer","Kung Fu Panda"]

class MockProvider(BaseProvider):
    def provider_name(self) -> str:
        return "mock_provider"

    async def check_player(self, player_id: str, server_id: str) -> PlayerData:
        random.seed(f"{player_id}_{server_id}")
        total_heroes = random.randint(80, 124)
        heroes_list = []
        total_skins = 0
        rarity_count = {r: 0 for r in RARITIES}
        
        nick_pool = ["Wann","R7","Clay","Lemon","Alberttt","Sanz","Kairi","Skylar","CW","Butsss","Vyn","Luminaire","Oura","Donkey","Brandon"]
        nickname = f"{random.choice(nick_pool)} • {random.choice(['Pro','Elite','Mythic','MLBB'])}"
        
        for i in range(min(total_heroes, 30)):
            hero_name = random.choice(HEROES)
            skin_count = random.randint(1, 9)
            skins = []
            for j in range(skin_count):
                rarity = random.choice(RARITIES)
                rarity_count[rarity] += 1
                total_skins += 1
                skins.append(SkinItem(
                    skin_id=f"skin_{player_id}_{i}_{j}",
                    name=f"{hero_name} {random.choice(SKIN_NAMES)}",
                    rarity=rarity,
                    image_url=f"https://picsum.photos/seed/{player_id}{i}{j}/300/400"
                ))
            heroes_list.append(HeroCollection(
                hero_id=f"hero_{i}",
                hero_name=hero_name,
                role=random.choice(ROLES),
                image_url=f"https://picsum.photos/seed/hero{player_id}{i}/200/200",
                skin_count=skin_count,
                skins=skins
            ))

        return PlayerData(
            avatar=f"https://i.pravatar.cc/150?img={random.randint(1,70)}",
            nickname=nickname,
            player_id=player_id,
            server_id=server_id,
            region=random.choice(["Indonesia","Malaysia","Singapore","Philippines","Myanmar"]),
            total_heroes=total_heroes,
            total_skins=total_skins,
            rarity_count=rarity_count,
            last_update=datetime.utcnow().isoformat(),
            heroes=heroes_list
        )
