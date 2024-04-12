import { configureStore } from "@reduxjs/toolkit";
import resizeListenerMiddleware from "../components/middleware/resizeListenerMiddleware";
import isMobileReducer from "./Slices/isMobileSlice";
import regionReducer from "./Slices/regionSlice";
import progressReducer from "./Slices/ProgressSlice";

export default configureStore({
    reducer: {
        isMobile: isMobileReducer,
        progress: progressReducer,
        region: regionReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(resizeListenerMiddleware),
});
