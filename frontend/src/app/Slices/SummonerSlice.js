import { createSlice } from "@reduxjs/toolkit";

export const SummonerSlice = createSlice({
    name: "summoner",
    initialState: {
        summonerInfo: {},
        rankedInfo: [],
    },
    reducers: {
        setSummonerData: (state, action) => {
            if (action.payload) {
                return {
                    ...state,
                    summonerInfo: action.payload.summoner_info,
                    rankedInfo: action.payload.ranked_info,
                };
            }
            return state;
        },
    },
});

export const { setSummonerData } = SummonerSlice.actions;

export const selectSummonerInfo = (state) => state.summoner.summonerInfo;
export const selectRankedInfo = (state) => state.summoner.rankedInfo;

export default SummonerSlice.reducer;
