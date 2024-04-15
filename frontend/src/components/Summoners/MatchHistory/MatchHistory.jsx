import Loading from "../../Common/Loading";
import Match from "./Match";
import "./MatchHistory.css";

function MatchHistory(props) {
    const handleShowMore = () => {
        const start = props.matches.length.toString();
        const numGames = "5";
        props.onShowMore(start, numGames);
    };

    return (
        <div className="col" id="matchHistoryContainer">
            <div className="container-fluid rounded-4 pt-1 pb-2">
                <p className="border-bottom ps-2 fw-light">Recent Games</p>
                <div className="rounded-1 d-flex flex-column gap-2">
                    {props.loading ? (
                        <Loading />
                    ) : (
                        // Render the Match components once data is fetched
                        <>
                            {props.matches.map((combinedMatch, index) => (
                                <div
                                    key={index}
                                    className="match-container d-flex flex-column">
                                    <Match
                                        playerData={combinedMatch.player_match}
                                        matchData={combinedMatch.match}
                                    />
                                </div>
                            ))}
                            {props.extraMatchLoading ? (
                                <Loading />
                            ) : (
                                <button
                                    className="match-container d-flex flex-column rounded-1 py-2"
                                    onClick={handleShowMore}>
                                    Show More
                                </button>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MatchHistory;
