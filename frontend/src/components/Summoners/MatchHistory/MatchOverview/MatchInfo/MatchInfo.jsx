import TeamData from "./TeamData";
import MatchData from "./MatchData";
import Decoration from "../../Decoration";

function MatchInfo({ win, gameDuration, overallInfo }) {
    return (
        <div className="separator truncate">
            <Decoration team="blue" win={win === "blue"} gameDuration={gameDuration} />

            <TeamData key="blue" team="blue" data={overallInfo[0]} />
            <MatchData win={win} overallInfo={overallInfo} />
            <TeamData key="red" team="red" data={overallInfo[1]} />

            <Decoration team="red" win={win === "red"} gameDuration={gameDuration} />
        </div>
    );
}

export default MatchInfo;
