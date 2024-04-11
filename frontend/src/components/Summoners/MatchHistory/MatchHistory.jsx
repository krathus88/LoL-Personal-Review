import Match from "./Match";
import Loading from "../../Common/Loading";
import "./MatchHistory.css";

function MatchHistory(props) {
    return (
        <div className="col" id="matchHistoryContainer">
            <div className="container-fluid rounded-4 pt-1 pb-2">
                <p className="border-bottom ps-2 fw-light">Recent Games</p>
                <div className="rounded-1 d-flex flex-column gap-2">
                    {props.loading ? (
                        <Loading />
                    ) : (
                        // Render the Match components once data is fetched
                        props.matches.map((combinedMatch, index) => (
                            <div
                                key={index}
                                className="match-container d-flex flex-column">
                                <Match
                                    playerData={combinedMatch.player_match}
                                    matchData={combinedMatch.match}
                                />
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default MatchHistory;
