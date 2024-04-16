import { createSlice } from "@reduxjs/toolkit";

export const ProgressSlice = createSlice({
    name: "progress",
    initialState: {
        width: 0,
    },
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

export const selectProgress = (state) => state.progress.width;

export default ProgressSlice.reducer;
