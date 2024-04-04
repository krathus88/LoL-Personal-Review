import React from "react";
import Match from "./Match";
import "./MatchHistory.css";

function MatchHistory() {
    return (
        <div className="col" id="matchHistoryContainer">
            <div className="container-fluid rounded-4 pt-1 pb-2">
                <p className="border-bottom ps-2 fw-light">Recent Games</p>
                <div className="rounded-1 d-flex flex-column gap-2">
                    <div className="match-container d-flex flex-column">
                        <Match />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MatchHistory;
