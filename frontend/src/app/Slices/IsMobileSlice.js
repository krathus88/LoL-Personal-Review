import { createSlice } from "@reduxjs/toolkit";

export const IsMobileSlice = createSlice({
    name: "isMobile",
    initialState: {
        value: window.innerWidth <= 768,
    },
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

export const selectIsMobile = (state) => state.isMobile.value;

export default IsMobileSlice.reducer;
