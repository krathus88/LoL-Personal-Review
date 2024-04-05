import React from "react";
import SummonerHeader from "../components/Summoners/SummonerHeader";
import PersonalRating from "../components/Summoners/PersonalRating/PersonalRating";
import MatchHistory from "../components/Summoners/MatchHistory/MatchHistory";
import { useLocation } from "react-router-dom";

function Home() {
    const location = useLocation();
    const responseData = location.state?.responseData;

    return (
        <main className="container-fluid mt-2">
            <SummonerHeader summonerInfo={responseData.summoner_info} />
            <div className="d-flex flex-lg-row flex-column gap-3">
                <PersonalRating rankedInfo={responseData.ranked_info} />
                <MatchHistory
                    region={responseData.region}
                    puuid={responseData.puuid}
                />
            </div>
        </main>
    );
}

export default Home;
