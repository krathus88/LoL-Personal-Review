import { configureStore } from "@reduxjs/toolkit";
import resizeListenerMiddleware from "../components/middleware/resizeListenerMiddleware";
import isMobileReducer from "./Slices/isMobileSlice";
import regionReducer from "./Slices/regionSlice";
import progressReducer from "./Slices/progressSlice";
import summonerReducer from "./Slices/summonerSlice";

export default configureStore({
    reducer: {
        isMobile: isMobileReducer,
        progress: progressReducer,
        region: regionReducer,
        summoner: summonerReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(resizeListenerMiddleware),
});
