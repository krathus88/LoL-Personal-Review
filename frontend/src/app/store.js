import { configureStore } from "@reduxjs/toolkit";
import resizeListenerMiddleware from "../components/middleware/resizeListenerMiddleware";
import IsMobileReducer from "./Slices/IsMobileSlice";
import RegionReducer from "./Slices/RegionSlice";
import ProgressReducer from "./Slices/ProgressSlice";
import SummonerReducer from "./Slices/SummonerSlice";

export default configureStore({
    reducer: {
        isMobile: IsMobileReducer,
        progress: ProgressReducer,
        region: RegionReducer,
        summoner: SummonerReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(resizeListenerMiddleware),
});
