import { createSlice } from "@reduxjs/toolkit";

export const isMobileSlice = createSlice({
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

export const { setIsMobile } = isMobileSlice.actions;

export const selectIsMobile = (state) => state.isMobile.value;

export default isMobileSlice.reducer;
