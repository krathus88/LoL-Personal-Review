import React from "react";
import SoloQueue from "./SoloQueue";
import FlexQueue from "./FlexQueue";
import "./PersonalRating.css";

function PersonalRating() {
    const rankedInfo = [
        {
            leagueId: "REDACTED_LEAGUE_ID",
            queueType: "RANKED_SOLO_5x5",
            tier: "CHALLENGER",
            rank: "I",
            summonerId:
                "REDACTED_ID",
            summonerName: "SummonerName",
            leaguePoints: 9999,
            wins: 9999,
            losses: 9999,
            veteran: false,
            inactive: false,
            freshBlood: false,
            hotStreak: false,
            winRate: 100,
        },
        {
            leagueId: "a9fbe73f-60af-43b3-b6ea-be4e3ef3483b",
            queueType: "RANKED_FLEX_SR",
            tier: "CHALLENGER",
            rank: "I",
            summonerId:
                "REDACTED_ID",
            summonerName: "SummonerName",
            leaguePoints: 9999,
            wins: 9999,
            losses: 9999,
            veteran: false,
            inactive: false,
            freshBlood: false,
            hotStreak: false,
            winRate: 100,
        },
    ];

    return (
        <div className="col-auto" id="personalRating">
            <div className="container-fluid container-lg rounded-4">
                <p className="border-bottom pt-1 ps-2 fw-light">
                    Personal Ratings
                </p>
                <div className="d-flex flex-lg-column flex-md-row flex-column justify-content-around">
                    {rankedInfo[0].tier === "unranked" ? (
                        <p className="fw-light unranked-soloq ps-3">
                            Ranked Solo: <small>Unranked</small>
                        </p>
                    ) : (
                        <SoloQueue rankSoloQ={rankedInfo[0]} />
                    )}
                    <div className="vertical-separator"></div>
                    <hr />
                    {rankedInfo[1].tier === "unranked" ? (
                        <p className="fw-light unranked-flex ps-3 pt-2 pb-2">
                            Ranked Flex: <small>Unranked</small>
                        </p>
                    ) : (
                        <FlexQueue rankFlex={rankedInfo[1]} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default PersonalRating;
