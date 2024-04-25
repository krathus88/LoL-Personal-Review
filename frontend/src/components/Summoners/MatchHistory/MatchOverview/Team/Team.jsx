import TeamRow from "./TeamRow";

function Team(props) {
    return (
        <table className={`${props.team}`}>
            <colgroup>
                {props.team === "team-blue" && <col width="3" />}
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
                {props.team === "team-red" && <col width="3" />}
            </colgroup>
            <tbody>
                {props.players.map((player, index) => (
                    <TeamRow
                        key={index}
                        team={props.team}
                        player={player}
                        puuid={props.puuid}
                        gameDuration={props.gameDuration}
                    />
                ))}
            </tbody>
        </table>
    );
}

export default Team;
