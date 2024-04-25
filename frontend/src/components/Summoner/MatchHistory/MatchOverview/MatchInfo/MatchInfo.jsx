import TeamData from "./TeamData";
import MatchData from "./MatchData";
import Decoration from "../../Decoration";
import "./MatchInfo.css";

function MatchInfo({ win, gameDuration, objectives }) {
    return (
        <div className="separator">
            <Decoration team="blue" win={win === "blue"} gameDuration={gameDuration} />

            <TeamData key="blue" team="blue" objectives={objectives[0]} />
            <MatchData win={win} objectives={objectives} />
            <TeamData key="red" team="red" objectives={objectives[1]} />

            <Decoration team="red" win={win === "red"} gameDuration={gameDuration} />
        </div>
    );
}

export default MatchInfo;
