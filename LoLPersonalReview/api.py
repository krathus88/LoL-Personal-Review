from ninja import NinjaAPI

from summoners.api import router as summoners_router
from champions.api import router as champions_router

api = NinjaAPI()

api.add_router("/summoners/", summoners_router, tags=["Summoners"])
api.add_router("/champions/", champions_router, tags=["Champions"])
