import Team from "./Team";
import MatchInfo from "./MatchInfo";
import "./MatchOverview.css";

function MatchOverview(props) {
    const teamBlue = props.matchData.players_data.slice(0, 5);
    const teamRed = props.matchData.players_data.slice(5);

    console.log(props.matchData);
    return (
        <div className="match-overview rounded mt-1">
            <Team
                team="team-blue"
                players={teamBlue}
                gameDuration={props.matchData.gameDuration}
            />
            <MatchInfo />
            <Team
                team="team-red"
                players={teamRed}
                gameDuration={props.matchData.gameDuration}
            />
        </div>
    );
}

export default MatchOverview;
