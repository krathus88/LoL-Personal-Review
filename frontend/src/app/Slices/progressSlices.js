import { createSlice } from "@reduxjs/toolkit";

export const progressSlice = createSlice({
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

export const { setProgress } = progressSlice.actions;

export const selectProgress = (state) => state.progress.width;

export default progressSlice.reducer;
