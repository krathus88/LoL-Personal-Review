import { Suspense, lazy, useState } from "react";
import Loading from "../../../Common/Loading";
import Analysis from "./Analysis";
import Champion from "./Champion";
import Items from "./Items";
import "./Match.css";
import MatchInfo from "./MatchInfo";
import Stats from "./Stats";
import TeamComp from "./TeamComp";
import Decoration from "../Decoration";

const MatchOverview = lazy(() => import("../MatchOverview/MatchOverview"));

function Match(props) {
    const [overviewOpen, setOverviewOpen] = useState(false);

    const toggleOverview = () => {
        setOverviewOpen(!overviewOpen);
    };

    let playerData = null;
    let gameDurationMinutes = 0;

    if (props.matchData.players_data && props.matchData.players_data.length > 0) {
        playerData = props.matchData.players_data.find(
            (player) => player.puuid === props.puuid
        );

        gameDurationMinutes = parseInt(props.matchData.gameDuration.match(/\d+m/));
    }

    if (playerData) {
        return (
            <div className="match-container d-flex flex-column">
                <div
                    className={`match position-relative d-flex flex-column justify-content-center pe-0 rounded-1 ${
                        gameDurationMinutes < 4
                            ? "background-remake"
                            : playerData.win
                            ? "background-win"
                            : "background-defeat"
                    }`}>
                    <Decoration
                        win={playerData.win}
                        gameDuration={props.matchData.gameDuration}
                    />
                    <small className="border-bottom truncate">
                        {props.matchData.gameMode} - {props.matchData.timeSinceGameEnd}{" "}
                        ago - {props.matchData.gameDuration}
                    </small>

                    <div className="d-flex flex-row align-items-center flex-nowrap mx-0">
                        <MatchInfo
                            gameMode={props.matchData.gameMode}
                            gameEnd={props.matchData.timeSinceGameEnd}
                            gameDuration={props.matchData.gameDuration}
                        />
                        <Champion
                            champId={playerData.championId}
                            champName={playerData.championName}
                            level={playerData.level}
                            sum1Id={playerData.summoner1Id}
                            sum2Id={playerData.summoner2Id}
                            primaryRune={playerData.primaryRune}
                        />
                        <Stats
                            gameDuration={props.matchData.gameDuration}
                            cs={playerData.cs}
                            kp={playerData.killParticipation}
                            kills={playerData.kills}
                            deaths={playerData.deaths}
                            assists={playerData.assists}
                            kda={playerData.kda}
                        />
                        <Items items={playerData.items} />
                        <TeamComp player={props.matchData.players_data} />
                        <Analysis
                            multiKill={playerData.largestMultiKill}
                            perfRank={playerData.performanceRanking}
                        />
                        <button
                            type="button"
                            className="btn btn-warning btn-review d-flex justify-content-center align-items-center">
                            <span className="ms-2">Review</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                fill="currentColor"
                                className="bi bi-chevron-double-right user-select-none"
                                viewBox="0 0 16 16">
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
                            onClick={toggleOverview}
                            className="btn btn-secondary btn-overview d-flex justify-content-center align-items-center ms-auto mt-auto">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-caret-down user-select-none mt-1"
                                viewBox="0 0 16 16">
                                <path d="M3.204 5h9.592L8 10.481zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659" />
                            </svg>
                        </button>
                    </div>
                </div>
                <Suspense fallback=<Loading />>
                    {overviewOpen && (
                        <MatchOverview
                            matchData={props.matchData}
                            puuid={props.puuid}
                            gameDurationMinutes={gameDurationMinutes}
                        />
                    )}
                </Suspense>
            </div>
        );
    }
}

export default Match;
