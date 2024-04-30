import type { MatchPlayerDataType } from "../../../../../types/matchTypes";
import "./Team.css";
import { TeamRow } from "./TeamRow";

type TeamProps = {
    team: string;
    players: MatchPlayerDataType[];
    puuid: string;
    gameDuration: string;
};

export function Team({ team, players, puuid, gameDuration }: TeamProps) {
    return (
        <table className={`${team}`}>
            <colgroup>
                {team === "team-blue" && <col width="4" />}
                <col className="champion" />
                <col className="spells" />
                <col className="runes" />
                <col className="name" />
                <col className="score" />
                <col className="kda" />
                <col className="damage" />
                <col className="wards" />
                <col className="cs" />
                <col className="items" />
                {team === "team-red" && <col width="3" />}
            </colgroup>
            <tbody>
                {players.map((player, index) => (
                    <TeamRow
                        key={index}
                        team={team}
                        player={player}
                        puuid={puuid}
                        gameDuration={gameDuration}
                    />
                ))}
            </tbody>
        </table>
    );
}
