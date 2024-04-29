import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type IsMobileState = {
    value: boolean; // Define the type for region state
};

const initialState: IsMobileState = {
    value: window.innerWidth <= 768,
};

export const IsMobileSlice = createSlice({
    name: "isMobile",
    initialState,
    reducers: {
        setIsMobile: (state, action) => {
            return {
                ...state,
                value: action.payload,
            };
        },
    },
});

export const { setIsMobile } = IsMobileSlice.actions;

export const selectIsMobile = (state: RootState) => state.isMobile.value;

export default IsMobileSlice.reducer;
