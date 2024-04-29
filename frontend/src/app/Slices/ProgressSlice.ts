import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type ProgressState = {
    width: number; // Define the type for region state
};

const initialState: ProgressState = {
    width: 0,
};

export const ProgressSlice = createSlice({
    name: "progress",
    initialState,
    reducers: {
        setProgress: (state, action) => {
            return {
                ...state,
                width: action.payload,
            };
        },
    },
});

export const { setProgress } = ProgressSlice.actions;

export const selectProgress = (state: RootState) => state.progress.width;

export default ProgressSlice.reducer;
