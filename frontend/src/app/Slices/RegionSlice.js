import { createSlice } from "@reduxjs/toolkit";

export const RegionSlice = createSlice({
    name: "region",
    initialState: "",
    reducers: {
        setRegion: (state, action) => {
            return action.payload;
        },
    },
});

export const { setRegion } = RegionSlice.actions;

export const selectRegion = (state) => state.region;

export default RegionSlice.reducer;
