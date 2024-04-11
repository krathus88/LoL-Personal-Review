import { useEffect, useState, useRef, createContext, useContext } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import axios from "axios";
import SummonerHeader from "../components/Summoners/SummonerHeader/SummonerHeader";
import PersonalRating from "../components/Summoners/PersonalRating/PersonalRating";
import MatchHistory from "../components/Summoners/MatchHistory/MatchHistory";
import RecentlyPlayed from "../components/Summoners/RecentlyPlayed/RecentlyPlayed";

export const RegionContext = createContext();

export const SummonerLoader = async ({ params }) => {
    const { region, summonerNameTag } = params;

    let [summonerName, summonerTag] = summonerNameTag.split("-");

    try {
        const response = await axios.get("/api/summoners/", {
            params: {
                region: region,
                summoner_name: summonerName,
                summoner_tag: summonerTag,
            },
        });

        return response.data;
    } catch (error) {
        throw error; // Re-throw the error to let React Router handle it
    }
};

function Summoner() {
    const summonerData = useLoaderData();

    const [loading, setLoading] = useState(true);
    const [matches, setMatches] = useState([]);
    const [playedWith, setPlayedWith] = useState([]);

    const { region } = useParams();

    // Change Page Title
    useEffect(() => {
        document.title = `${summonerData.summoner_info.name}#${summonerData.summoner_info.tag} - LoL PR`;
    }, [summonerData]);

    // Handles Match History Component
    const count = useRef(0); // DELETE FOR PRODUCTION

    useEffect(() => {
        if (count.current !== 0) {
            const fetchData = () => {
                axios
                    .get("/api/summoners/match-history/", {
                        params: {
                            region: summonerData.region,
                            start: "0",
                            end: "10",
                            puuid: summonerData.puuid,
                        },
                    })
                    .then((response) => {
                        setMatches(response.data.matches);
                        setPlayedWith(response.data.recently_played);
                        setLoading(false);
                    })
                    .catch((error) => {
                        if (error.response) {
                            console.error("Server Error:", error.response.status);
                        } else if (error.request) {
                            console.error("Network Error:", error.request);
                        } else {
                            console.error("Error:", error.message);
                        }
                    });
            };

            fetchData(); // Call the fetchData function when the component mounts
        }

        count.current++;

        return () => {
            setMatches([]);
            setLoading(true);
        };
    }, [summonerData.puuid]);

    return (
        <main className="container-fluid mt-2">
            <SummonerHeader summonerInfo={summonerData.summoner_info} />
            <div className="d-flex flex-lg-row flex-column gap-3">
                <div className="d-flex flex-column gap-3">
                    <PersonalRating rankedInfo={summonerData.ranked_info} />
                    <RegionContext.Provider value={region}>
                        <RecentlyPlayed loading={loading} playedWith={playedWith} />
                    </RegionContext.Provider>
                </div>
                <MatchHistory loading={loading} matches={matches} />
            </div>
        </main>
    );
}

export default Summoner;
