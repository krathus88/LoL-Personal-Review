import Champion from "./Champion";
import Cs from "./Cs";
import Damage from "./Damage";
import Items from "./Items";
import Kda from "./Kda";
import Name from "./Name";
import Runes from "./Runes";
import Score from "./Score";
import Spells from "./Spells";
import Wards from "./Wards";
import Decoration from "../../Decoration";

function TeamRow({ team, player, puuid, gameDuration }) {
    return (
        <tr
            className={`overview-player fw-light ${
                player.puuid === puuid ? "player" : ""
            }`}>
            {team === "team-blue" && (
                <td className="decoration">
                    <Decoration win={player.win} gameDuration={gameDuration} />
                </td>
            )}
            <td className="champion ps-2">
                <Champion
                    championId={player.championId}
                    championName={player.championName}
                    level={player.level}
                />
            </td>
            <td className="spells">
                <Spells
                    summoner1Id={player.summoner1Id}
                    summoner2Id={player.summoner2Id}
                />
            </td>
            <td className="runes">
                <Runes
                    primaryRune={player.primaryRune}
                    secondaryRune={player.secondaryRune}
                />
            </td>
            <td className="name truncate">
                <Name
                    summonerName={player.summonerName}
                    summonerTag={player.summonerTag}
                    kills={player.kills}
                    deaths={player.deaths}
                    assists={player.assists}
                    kda={player.kda}
                />
            </td>
            <td className="score pe-1">
                <Score
                    performanceScore={player.performanceScore}
                    performanceRanking={player.performanceRanking}
                />
            </td>
            <td className="kda pe-1">
                <Kda
                    kills={player.kills}
                    deaths={player.deaths}
                    assists={player.assists}
                    killParticipation={player.killParticipation}
                    kda={player.kda}
                />
            </td>
            <td className="damage pe-1">
                <Damage
                    damageDealt={player.damageDealt}
                    damageDealtPercentage={player.damageDealtPercentage}
                    damageTaken={player.damageTaken}
                    damageTakenPercentage={player.damageTakenPercentage}
                />
            </td>
            <td className="wards pe-1">
                <Wards
                    controlWards={player.controlWards}
                    wardsPlaced={player.wardsPlaced}
                    wardsKilled={player.wardsKilled}
                />
            </td>
            <td className="cs pe-1">
                <Cs cs={player.cs} gameDuration={gameDuration} />
            </td>
            <td className="items pe-2">
                <Items
                    items={player.items}
                    damageDealt={player.damageDealt}
                    damageDealtPercentage={player.damageDealtPercentage}
                    damageTaken={player.damageTaken}
                    damageTakenPercentage={player.damageTakenPercentage}
                    cs={player.cs}
                    gameDuration={gameDuration}
                />
            </td>
            {team === "team-red" && (
                <td className="decoration">
                    <Decoration win={player.win} gameDuration={gameDuration} />
                </td>
            )}
        </tr>
    );
}

export default TeamRow;
