import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import type { LoaderFunctionArgs } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { setProgress } from "../app/Slices/ProgressSlice";
import { setRegion } from "../app/Slices/RegionSlice";
import { MatchHistory } from "../components/Summoner/MatchHistory/MatchHistory";
import { PersonalRating } from "../components/Summoner/PersonalRating/PersonalRating";
import { RecentlyPlayed } from "../components/Summoner/RecentlyPlayed/RecentlyPlayed";
import { SummonerHeader } from "../components/Summoner/SummonerHeader/SummonerHeader";
import type { MatchDataType } from "../types/matchTypes";
import type { RecentlyPlayedType, SummonerDataType } from "../types/playerTypes";
import { fetchData } from "../utils/functions";

async function loader({ params }: LoaderFunctionArgs) {
    const { region, summonerNameTag } = params;

    if (!summonerNameTag || !region) {
        throw Error;
    }

    const [summonerName, summonerTag] = summonerNameTag.split("-");

    const responseData = await fetchData("get", "/api/summoners/", {
        region: region,
        summoner_name: summonerName,
        summoner_tag: summonerTag,
    });

    return responseData;
}

export function Component() {
    const dispatch = useDispatch();

    const summonerDataLoader = useLoaderData() as SummonerDataType;

    const [summonerData, setSummonerData] = useState(summonerDataLoader);
    const [loading, setLoading] = useState(true);
    const [errorMatchHistory, setErrorMatchHistory] = useState(false);
    const [matches, setMatches] = useState<MatchDataType[]>([]);
    const [playedWith, setPlayedWith] = useState<RecentlyPlayedType>({});

    useEffect(() => {
        setSummonerData(summonerDataLoader);
    }, [summonerDataLoader]);

    // Handles Match History Component
    const count = useRef(0); // DELETE FOR PRODUCTION

    useEffect(() => {
        document.title = `${summonerData.summonerInfo.name}#${summonerData.summonerInfo.tag} - LoL PR`;

        if (count.current !== 0) {
            dispatch(setProgress(100));
            dispatch(setRegion(summonerData.summonerInfo.region));

            fetchMatchHistoryData(); // Call the fetchData function when the component mounts
        }
        count.current++;

        return () => {
            setMatches([]);
            setLoading(true);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [summonerData.summonerInfo.puuid]);

    const fetchMatchHistoryData = async (start = "0", numGames = "10") => {
        try {
            // Reset Recently Played whilst changing player view
            if (!numGames) {
                setPlayedWith({});
            }

            setLoading(true);

            const responseData = await fetchData(
                "get",
                "/api/summoners/match-history/",
                {
                    puuid: summonerData.summonerInfo.puuid,
                    region: summonerData.summonerInfo.region,
                    start: start,
                    num_games: numGames,
                }
            );

            // Only update Recently Played with the initial 10 games data
            if (responseData.recentlyPlayed) {
                setPlayedWith(responseData.recentlyPlayed);
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
            region: summonerData.summonerInfo.region,
            lastMatch: matches[0].matchId,
            puuid: summonerData.summonerInfo.puuid,
        });

        // Insert new matches at the start of the existing matches array
        const updatedMatches = [...responseData.matches, ...matches];
        setMatches(updatedMatches);

        setSummonerData(responseData.summoner_data);
    };

    return (
        <main className="container-fluid mt-2">
            <SummonerHeader
                summonerInfo={summonerData.summonerInfo}
                onUpdate={updateInfo}
                loading={loading}
            />
            <div className="d-flex flex-lg-row flex-column gap-3">
                <div className="d-flex flex-column gap-3">
                    <PersonalRating rankedInfo={summonerData.rankedInfo} />
                    <RecentlyPlayed
                        loading={loading}
                        playedWith={playedWith}
                        matches={matches}
                    />
                </div>
                <MatchHistory
                    loading={loading}
                    errorMatchHistory={errorMatchHistory}
                    puuid={summonerData.summonerInfo.puuid}
                    matches={matches}
                    onFetchMatch={fetchMatchHistoryData}
                />
            </div>
        </main>
    );
}

Component.displayName = "SummonerPage";

Component.loader = loader;
