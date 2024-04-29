import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type RegionState = {
    region: string; // Define the type for region state
};

const initialState: RegionState = {
    region: "",
};

export const RegionSlice = createSlice({
    name: "region",
    initialState,
    reducers: {
        setRegion: (state, action) => {
            return {
                ...state,
                region: action.payload,
            };
        },
    },
});

export const { setRegion } = RegionSlice.actions;

export const selectRegion = (state: RootState) => state.region;

export default RegionSlice.reducer;
