import { createSlice } from "@reduxjs/toolkit";

export const regionSlice = createSlice({
    name: "region",
    initialState: "",
    reducers: {
        setRegion: (state, action) => {
            return action.payload;
        },
    },
});

export const { setRegion } = regionSlice.actions;

export const selectRegion = (state) => state.region;

export default regionSlice.reducer;
