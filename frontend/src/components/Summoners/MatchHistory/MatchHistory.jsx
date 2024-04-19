import Loading from "../../Common/Loading";
import "./MatchHistory.css";
import { Suspense, lazy } from "react";

const Match = lazy(() => import("./Match/Match"));

function MatchHistory(props) {
    const handleButtons = (numGames = null) => {
        if (numGames) {
            const start = props.matches.length.toString();
            props.onFetchMatch(start, numGames);
        } else {
            props.onFetchMatch();
        }
    };

    return (
        <div className="col" id="matchHistoryContainer">
            <div className="container-fluid rounded-4 pt-1 pb-2">
                <p className="border-bottom ps-2 fw-light">Recent Games</p>
                <div className="rounded-1 d-flex flex-column gap-2">
                    {props.loading && props.matches.length === 0 ? (
                        <Loading />
                    ) : props.errorMatchHistory && props.matches.length === 0 ? (
                        <div className="d-flex justify-content-center">
                            <button
                                className="border-0 rounded-3 px-3 py-2"
                                onClick={() => handleButtons()}>
                                Failed to load match history. Please try again.
                            </button>
                        </div>
                    ) : (
                        <Suspense fallback=<Loading />>
                            {props.matches.map((combinedMatch, index) => (
                                <Match
                                    key={index}
                                    playerData={combinedMatch.player_match}
                                    matchData={combinedMatch.match}
                                />
                            ))}
                            {props.loading ? (
                                <Loading />
                            ) : props.errorMatchHistory ? (
                                <div className="d-flex justify-content-center">
                                    <button
                                        className="border-0 rounded-3 px-3 py-2"
                                        onClick={() => handleButtons(5)}>
                                        Failed to load match history. Please try again.
                                    </button>
                                </div>
                            ) : (
                                <button
                                    className="d-flex flex-column rounded-1 py-2"
                                    onClick={() => handleButtons(5)}>
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

export default MatchHistory;
