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

    const summonerDataLoader = useLoaderData();

    const [summonerData, setSummonerData] = useState(summonerDataLoader);
    const [loading, setLoading] = useState(true);
    const [extraMatchLoading, setExtraMatchLoading] = useState(false);
    const [matches, setMatches] = useState([]);
    const [playedWith, setPlayedWith] = useState([]);

    useEffect(() => {
        setSummonerData(summonerDataLoader);
    }, [summonerDataLoader]);

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

    const fetchMatchHistoryData = async (start, numGames) => {
        if (numGames) {
            setExtraMatchLoading(true);
        }

        const responseData = await fetchData("get", "/api/summoners/match-history/", {
            region: summonerData.summoner_info.region,
            start: start || "0",
            num_games: numGames || "10",
            puuid: summonerData.summoner_info.puuid,
        });

        setMatches((matches) => [...matches, ...responseData.matches]);

        if (responseData.recently_played) {
            setPlayedWith(responseData.recently_played);
            setLoading(false);
        } else {
            setExtraMatchLoading(false);
        }
    };

    const updateInfo = async () => {
        const responseData = await fetchData("patch", "/api/summoners/", {
            region: summonerData.summoner_info.region,
            lastMatch: matches[0].match.metadata.matchId,
            puuid: summonerData.summoner_info.puuid,
        });

        // Insert new matches at the start of the existing matches array
        const updatedMatches = [...responseData.matches, ...matches];
        setMatches(updatedMatches);

        setSummonerData(responseData.summoner_data);
    };

    return (
        <main className="container-fluid mt-2">
            <SummonerHeader
                summonerInfo={summonerData.summoner_info}
                onUpdate={updateInfo}
                loading={loading}
            />
            <div className="d-flex flex-lg-row flex-column gap-3">
                <div className="d-flex flex-column gap-3">
                    <PersonalRating rankedInfo={summonerData.ranked_info} />
                    <RecentlyPlayed loading={loading} playedWith={playedWith} />
                </div>
                <MatchHistory
                    loading={loading}
                    extraMatchLoading={extraMatchLoading}
                    matches={matches}
                    onShowMore={fetchMatchHistoryData}
                />
            </div>
        </main>
    );
}

export default SummonerPage;
