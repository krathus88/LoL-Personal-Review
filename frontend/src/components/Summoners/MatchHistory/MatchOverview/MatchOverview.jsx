import MatchInfo from "./MatchInfo/MatchInfo";
import "./MatchOverview.css";
import Team from "./Team/Team";

function MatchOverview(props) {
    const teamBlue = props.matchData.players_data.slice(0, 5);
    const teamRed = props.matchData.players_data.slice(5);

    return (
        <div className="match-overview rounded mt-1">
            <Team
                team="team-blue"
                players={teamBlue}
                puuid={props.puuid}
                gameDuration={props.matchData.gameDuration}
            />
            <MatchInfo
                overallInfo={props.matchData.objectives}
                win={props.matchData.win}
                gameDuration={props.matchData.gameDuration}
            />
            <Team
                team="team-red"
                players={teamRed}
                puuid={props.puuid}
                gameDuration={props.matchData.gameDuration}
            />
        </div>
    );
}

export default MatchOverview;
