import Team from "./Team";
import MatchInfo from "./MatchInfo";
import "./MatchOverview.css";

function MatchOverview() {
    return (
        <div className="match-overview rounded mt-1">
            <Team team="team-blue" />
            <MatchInfo />
            <Team team="team-red" />
        </div>
    );
}

export default MatchOverview;
