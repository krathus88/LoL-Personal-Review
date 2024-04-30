import { configureStore } from "@reduxjs/toolkit";
import IsMobileReducer from "./Slices/IsMobileSlice";
import ProgressReducer from "./Slices/ProgressSlice";
import RegionReducer from "./Slices/RegionSlice";
import { resizeListenerMiddleware } from "./middleware/resizeListenerMiddleware";

export const store = configureStore({
    reducer: {
        isMobile: IsMobileReducer,
        progress: ProgressReducer,
        region: RegionReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(resizeListenerMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
