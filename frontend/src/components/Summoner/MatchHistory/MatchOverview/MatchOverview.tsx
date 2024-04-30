import type { MatchDataType } from "../../../../types/matchTypes";
import { MatchInfo } from "./MatchInfo/MatchInfo";
import "./MatchOverview.css";
import { Team } from "./Team/Team";

type MatchOverviewProps = {
    puuid: string;
    matchData: MatchDataType;
};

export function MatchOverview({ puuid, matchData }: MatchOverviewProps) {
    const teamBlue = matchData.playersData.slice(0, 5);
    const teamRed = matchData.playersData.slice(5);

    return (
        <div className="match-overview rounded mt-1">
            <Team
                team="team-blue"
                players={teamBlue}
                puuid={puuid}
                gameDuration={matchData.gameDuration}
            />
            <MatchInfo
                objectives={matchData.objectives}
                win={matchData.win}
                gameDuration={matchData.gameDuration}
            />
            <Team
                team="team-red"
                players={teamRed}
                puuid={puuid}
                gameDuration={matchData.gameDuration}
            />
        </div>
    );
}
