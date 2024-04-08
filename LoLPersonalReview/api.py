from ninja import NinjaAPI
from summoners.api import router as summoners_router

api = NinjaAPI()

api.add_router("/summoners/", summoners_router)
