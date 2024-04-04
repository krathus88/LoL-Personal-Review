import React from "react";
import SummonerHeader from "../components/Summoners/SummonerHeader";
import PersonalRating from "../components/Summoners/PersonalRating/PersonalRating";
import MatchHistory from "../components/Summoners/MatchHistory/MatchHistory";

function Home() {
    return (
        <main className="container-fluid mt-2">
            <SummonerHeader />
            <div className="d-flex flex-lg-row flex-column gap-3">
                <PersonalRating />
                <MatchHistory />
            </div>
        </main>
    );
}

export default Home;
