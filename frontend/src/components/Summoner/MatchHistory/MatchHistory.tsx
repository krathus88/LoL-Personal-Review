import { Suspense, lazy } from "react";
import type { MatchDataType } from "../../../types/matchTypes";
import { Loading } from "../../Common/Loading";
import "./MatchHistory.css";

const Match = lazy(() =>
    import("./Match/Match").then((module) => ({ default: module.Match }))
);

type MatchHistoryProps = {
    loading: boolean;
    errorMatchHistory: boolean;
    puuid: string;
    matches: MatchDataType[];
    onFetchMatch: (start?: string, numGames?: string) => Promise<void>;
};

export function MatchHistory({
    loading,
    errorMatchHistory,
    puuid,
    matches,
    onFetchMatch,
}: MatchHistoryProps) {
    const handleButtons = (numGames: string | null = null) => {
        if (numGames) {
            const start = matches.length.toString();
            onFetchMatch(start, numGames);
        } else {
            onFetchMatch();
        }
    };

    return (
        <div className="col" id="matchHistoryContainer">
            <div className="container-fluid rounded-4 pt-1 pb-2">
                <p className="border-bottom ps-2 fw-light">Recent Games</p>
                <div className="rounded-1 d-flex flex-column gap-2">
                    {loading && matches.length === 0 ? (
                        <Loading />
                    ) : errorMatchHistory && matches.length === 0 ? (
                        <div className="d-flex justify-content-center">
                            <button
                                className="border-0 rounded-3 px-3 py-2"
                                onClick={() => handleButtons()}>
                                Failed to load match history. Please try again.
                            </button>
                        </div>
                    ) : (
                        <Suspense fallback={<Loading />}>
                            {matches.map((match, index) => (
                                <Match key={index} puuid={puuid} matchData={match} />
                            ))}
                            {loading ? (
                                <Loading />
                            ) : errorMatchHistory ? (
                                <div className="d-flex justify-content-center">
                                    <button
                                        className="border-0 rounded-3 px-3 py-2"
                                        onClick={() => handleButtons("5")}>
                                        Failed to load match history. Please try again.
                                    </button>
                                </div>
                            ) : (
                                <button
                                    className="d-flex flex-column rounded-1 py-2"
                                    onClick={() => handleButtons("5")}>
                                    Show More
                                </button>
                            )}
                        </Suspense>
                    )}
                </div>
            </div>
        </div>
    );
}
