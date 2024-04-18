import Team from "./Team";
import "./MatchOverview.css";

function MatchOverview() {
    return (
        <div className="match-overview rounded mt-1">
            <Team team="team-blue" />
            <div className="separator">Big time match info</div>
            <Team team="team-red" />
        </div>
    );
}

export default MatchOverview;
