import Analysis from "./Analysis";
import Champion from "./Champion";
import Items from "./Items";
import MatchInfo from "./MatchInfo";
import Overview from "./Overview";
import Stats from "./Stats";
import TeamComp from "./TeamComp";

function Match(props) {
    return (
        <>
            <div
                className={`match overflow-hidden position-relative d-flex flex-column justify-content-center pe-0 rounded-1 ${
                    props.playerData.win ? "background-win" : "background-defeat"
                }`}>
                <small className="truncate border-bottom">
                    {props.playerData.gameMode} - {props.playerData.timeSinceGameEnd}{" "}
                    ago
                </small>
                <div className="d-flex flex-row align-items-center flex-nowrap mx-0">
                    <div
                        className={`decoration ${
                            props.playerData.win
                                ? "decoration-win"
                                : "decoration-defeat"
                        }`}></div>
                    <MatchInfo
                        gameMode={props.playerData.gameMode}
                        gameEnd={props.playerData.timeSinceGameEnd}
                        gameDuration={props.playerData.gameDuration}
                    />
                    <Champion
                        champId={props.playerData.championId}
                        sum1Id={props.playerData.summoner1Id}
                        sum2Id={props.playerData.summoner2Id}
                        primaryRune={props.playerData.primaryRune}
                    />
                    <Stats
                        cs={props.playerData.cs}
                        kp={props.playerData.killParticipation}
                        kills={props.playerData.kills}
                        deaths={props.playerData.deaths}
                        assists={props.playerData.assists}
                        kda={props.playerData.kda}
                    />
                    <Items items={props.playerData.items} />
                    <TeamComp playerChamps={props.matchData.info.participants} />
                    <Analysis multiKill={props.playerData.largestMultiKill} />
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
            <Overview matchData={props.matchData} />
        </>
    );
}

export default Match;
