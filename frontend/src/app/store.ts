import { configureStore } from "@reduxjs/toolkit";
import resizeListenerMiddleware from "./middleware/resizeListenerMiddleware";
import IsMobileReducer from "./Slices/IsMobileSlice";
import RegionReducer from "./Slices/RegionSlice";
import ProgressReducer from "./Slices/ProgressSlice";

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
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
