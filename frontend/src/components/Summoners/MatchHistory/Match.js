import React from "react";
import MatchInfo from "./MatchInfo";
import Champion from "./Champion";
import Stats from "./Stats";
import Items from "./Items";
import TeamComp from "./TeamComp";
import Analysis from "./Analysis";
import Overview from "./Overview";

function Match() {
    const playerWin = true;

    return (
        <div className="match-container d-flex flex-column">
            <div
                className={`match overflow-hidden position-relative d-flex flex-column justify-content-center pe-0 rounded-1 ${
                    playerWin ? "background-win" : "background-defeat"
                }`}
            >
                <small className="truncate border-bottom">
                    30 minutes - ago
                </small>
                <div className="d-flex flex-row align-items-center flex-nowrap mx-0">
                    <div
                        className={`decoration ${
                            playerWin ? "decoration-win" : "decoration-defeat"
                        }`}
                    ></div>
                    <MatchInfo
                        gameModeId="490"
                        gameEnd="30 minutes"
                        gameDuration="25m 30s"
                    />
                    <Champion
                        champId="1"
                        sum1Id="13"
                        sum2Id="14"
                        primaryRune="perk-images/styles/domination/hailofblades/hailofblades.png"
                    />
                    <Stats
                        cs="999"
                        kp="100"
                        kills="99"
                        deaths="99"
                        assists="99"
                        kda="123:1"
                    />
                    <Items itemId="11" />
                    <TeamComp />
                    <Analysis />
                    <button
                        type="button"
                        className="btn btn-warning btn-review d-flex justify-content-center align-items-center"
                    >
                        <span className="ms-2">Review</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            fill="currentColor"
                            className="bi bi-chevron-double-right"
                            viewBox="0 0 16 16"
                        >
                            <path
                                fillRule="evenodd"
                                d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708"
                            />
                            <path
                                fillRule="evenodd"
                                d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708"
                            />
                        </svg>
                    </button>
                    <button
                        type="button"
                        className="btn btn-secondary btn-overview d-flex justify-content-center align-items-center ms-auto mt-auto"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-caret-down mt-1"
                            viewBox="0 0 16 16"
                        >
                            <path d="M3.204 5h9.592L8 10.481zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659" />
                        </svg>
                    </button>
                </div>
            </div>
            <Overview />
        </div>
    );
}

export default Match;
