import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useLoaderData } from "react-router-dom";
import { setProgress } from "../app/Slices/ProgressSlice";
import { setRegion } from "../app/Slices/RegionSlice";
import MatchHistory from "../components/Summoner/MatchHistory/MatchHistory";
import PersonalRating from "../components/Summoner/PersonalRating/PersonalRating";
import RecentlyPlayed from "../components/Summoner/RecentlyPlayed/RecentlyPlayed";
import SummonerHeader from "../components/Summoner/SummonerHeader/SummonerHeader";
import { fetchData } from "../utils/functions";
import type { LoaderFunctionArgs } from "react-router-dom";

export const Loader = async ({ params }: LoaderFunctionArgs) => {
    const { region, summonerNameTag } = params;

    if (!summonerNameTag) {
        throw Error;
    }

    const [summonerName, summonerTag] = summonerNameTag.split("-");

    const responseData = await fetchData("get", "/api/summoners/", {
        region: region,
        summoner_name: summonerName,
        summoner_tag: summonerTag,
    });

    return responseData;
};

type SummonerDataType = {
    summoner_info: {
        puuid: string;
        region: string;
        name: string;
        tag: string;
        level: number;
        iconId: number;
    };
    ranked_info: {
        solo_queue: Record<string, unknown>;
        flex_queue: Record<string, unknown>;
    };
};

type MatchPlayerData = {
    puuid: string;
    summonerName: string;
    summonerTag: string | null;
    championId: number;
    championName: string;
    level: number;
    kills: number;
    deaths: number;
    assists: number;
    kda: number;
    killParticipation: number;
    cs: number;
    summoner1Id: string;
    summoner2Id: string;
    primaryRune: string;
    secondaryRune: string | null;
    items: (string | null)[];
    largestMultiKill: string;
    damageDealt: number;
    damageDealtPercentage: number;
    damageTaken: number;
    damageTakenPercentage: number;
    controlWards: number;
    wardsPlaced: number;
    wardsKilled: number;
    performanceScore: number;
    performanceRanking: number;
    win: boolean;
};

type MatchObjectives = {
    kills: number;
    gold: number;
    baron: number;
    dragon: number;
    riftHerald: number;
    voidgrubs: number;
    towers: number;
    inhibitors: number;
};

type MatchData = {
    gameMode: string;
    matchId: string;
    gameDuration: string;
    timeSinceGameEnd: string;
    win: "blue" | "red";
    playersData: MatchPlayerData[];
    objectives: MatchObjectives[];
};

export function Component() {
    const dispatch = useDispatch();

    const summonerDataLoader = useLoaderData() as SummonerDataType;

    const [summonerData, setSummonerData] = useState(summonerDataLoader);
    const [loading, setLoading] = useState(true);
    const [errorMatchHistory, setErrorMatchHistory] = useState(false);
    const [matches, setMatches] = useState<MatchData[]>([]);
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [summonerData.summoner_info.puuid]);

    const fetchMatchHistoryData = async (start = "0", numGames = "10") => {
        try {
            // Reset Recently Played whilst changing player view
            if (!numGames) {
                setPlayedWith([]);
            }

            setLoading(true);

            const responseData = await fetchData(
                "get",
                "/api/summoners/match-history/",
                {
                    puuid: summonerData.summoner_info.puuid,
                    region: summonerData.summoner_info.region,
                    start: start,
                    num_games: numGames,
                }
            );

            // Only update Recently Played with the initial 10 games data
            if (responseData.recently_played) {
                setPlayedWith(responseData.recently_played);
            }

            setErrorMatchHistory(false);
            setLoading(false);
            setMatches((matches) => [...matches, ...responseData.matches]);
        } catch {
            setErrorMatchHistory(true);
            setLoading(false);
        }
    };

    const updateInfo = async () => {
        const responseData = await fetchData("patch", "/api/summoners/", {
            region: summonerData.summoner_info.region,
            lastMatch: matches[0].matchId,
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
                    <RecentlyPlayed
                        loading={loading}
                        playedWith={playedWith}
                        matches={matches}
                    />
                </div>
                <MatchHistory
                    loading={loading}
                    errorMatchHistory={errorMatchHistory}
                    puuid={summonerData.summoner_info.puuid}
                    matches={matches}
                    onFetchMatch={fetchMatchHistoryData}
                />
            </div>
        </main>
    );
}

Component.displayName = "SummonerPage";
