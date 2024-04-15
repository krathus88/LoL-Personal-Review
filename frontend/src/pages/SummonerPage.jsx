import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useLoaderData } from "react-router-dom";
import { setProgress } from "../app/Slices/ProgressSlice";
import { setRegion } from "../app/Slices/regionSlice";
import MatchHistory from "../components/Summoners/MatchHistory/MatchHistory";
import PersonalRating from "../components/Summoners/PersonalRating/PersonalRating";
import RecentlyPlayed from "../components/Summoners/RecentlyPlayed/RecentlyPlayed";
import SummonerHeader from "../components/Summoners/SummonerHeader/SummonerHeader";
import { fetchData } from "../utils/functions";

export const SummonerLoader = async ({ params }) => {
    const { region, summonerNameTag } = params;

    let [summonerName, summonerTag] = summonerNameTag.split("-");

    const responseData = await fetchData("get", "/api/summoners/", {
        region: region,
        summoner_name: summonerName,
        summoner_tag: summonerTag,
    });

    return responseData;
};

function SummonerPage() {
    const dispatch = useDispatch();

    const summonerData = useLoaderData();

    const [loading, setLoading] = useState(true);
    const [matches, setMatches] = useState([]);
    const [playedWith, setPlayedWith] = useState([]);

    // Handles Match History Component
    const count = useRef(0); // DELETE FOR PRODUCTION

    useEffect(() => {
        document.title = `${summonerData.summoner_info.name}#${summonerData.summoner_info.tag} - LoL PR`;

        if (count.current !== 0) {
            dispatch(setProgress(100));
            dispatch(setRegion(summonerData.summoner_info.region));

            fetchMatchHistoryData(); // Call the fetchData function when the component mounts
        }
        count.current++;

        return () => {
            setMatches([]);
            setLoading(true);
        };
    }, [summonerData.summoner_info.puuid]);

    const fetchMatchHistoryData = async () => {
        const responseData = await fetchData("get", "/api/summoners/match-history/", {
            region: summonerData.summoner_info.region,
            start: "0",
            end: "10",
            puuid: summonerData.summoner_info.puuid,
        });

        setMatches(responseData.matches);
        setPlayedWith(responseData.recently_played);
        setLoading(false);
    };

    return (
        <main className="container-fluid mt-2">
            <SummonerHeader
                summonerInfo={summonerData.summoner_info}
                match={matches[0]}
                loading={loading}
            />
            <div className="d-flex flex-lg-row flex-column gap-3">
                <div className="d-flex flex-column gap-3">
                    <PersonalRating rankedInfo={summonerData.ranked_info} />
                    <RecentlyPlayed loading={loading} playedWith={playedWith} />
                </div>
                <MatchHistory
                    loading={loading}
                    matches={matches}
                    fetchMatchHistoryData={fetchMatchHistoryData}
                />
            </div>
        </main>
    );
}

export default SummonerPage;
