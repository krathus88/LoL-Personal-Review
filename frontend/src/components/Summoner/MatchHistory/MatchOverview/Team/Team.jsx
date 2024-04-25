import TeamRow from "./TeamRow";
import "./Team.css";

function Team({ team, players, puuid, gameDuration }) {
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

export default Team;
