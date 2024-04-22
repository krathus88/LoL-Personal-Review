import { calculateCsPerMinute } from "../../../../utils/functions";

function Team(props) {
    console.log(props.players);

    return (
        <table className={`${props.team}`}>
            <colgroup>
                <col width="44" />
                <col width="18" />
                <col width="18" />
                <col className="name" />
                <col className="score" />
                <col className="kda" />
                <col className="damage" />
                <col className="wards" />
                <col className="cs" />
                <col className="items" />
            </colgroup>
            <tbody>
                {props.players.map((player, playerIndex) => (
                    <tr key={playerIndex} className="overview-player fw-light">
                        <td className="champion ps-2">
                            <div className="img-container">
                                <img
                                    className="rounded-4"
                                    src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${player.championId}.png`}
                                    alt={`champion ${player.championName}`}></img>
                                <div className="level">{player.level}</div>
                            </div>
                        </td>
                        <td className="spells">
                            <div>
                                <img
                                    className="rounded"
                                    src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/${player.summoner1Id}.png`}
                                    alt="Summoner Spell 1"></img>
                                <img
                                    className="rounded"
                                    src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/${player.summoner2Id}.png`}
                                    alt="Summoner Spell 2"></img>
                            </div>
                        </td>
                        <td className="runes">
                            <div>
                                <img
                                    className="rounded-5"
                                    src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/${player.primaryRune}`}
                                    alt="Primary Rune"></img>
                                <img
                                    src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/${player.secondaryRune}`}
                                    alt="Secondary Rune"></img>
                            </div>
                        </td>
                        <td className="name">
                            <div className="truncate">
                                <div>
                                    <small>
                                        <span className="tier w-1300 rounded">GM</span>{" "}
                                        {player.summonerName}{" "}
                                        <span className="summoner-tag">
                                            #{player.summonerTag}
                                        </span>
                                    </small>
                                    <small className="tier">Challenger</small>
                                    <small className="w-1300">
                                        {player.kills}/
                                        <span className="font-color-defeat">
                                            {player.deaths}
                                        </span>
                                        /{player.assists}{" "}
                                        <span className="fw-bold">{player.kda}</span>
                                    </small>
                                </div>
                            </div>
                        </td>
                        <td className="score pe-1">
                            <div>
                                <small className="score fw-normal">
                                    {player.performanceScore}
                                </small>
                                <small
                                    className={`rank text-center rounded-4 ${
                                        player.performanceRanking === "ACE" ? "ace" : ""
                                    } ${
                                        player.performanceRanking === "MVP" ? "mvp" : ""
                                    }`}>
                                    {player.performanceRanking}
                                </small>
                            </div>
                        </td>
                        <td className="kda pe-1">
                            <div>
                                <small className="k-d-a text-nowrap">
                                    {player.kills}/
                                    <span className="font-color-defeat">
                                        {player.deaths}
                                    </span>
                                    /{player.assists} ({player.killParticipation}%)
                                </small>
                                <small className="text-nowrap fw-bold">
                                    {player.kda}
                                </small>
                            </div>
                        </td>
                        <td className="damage pe-1">
                            <div>
                                <div className="dealt col-5 text-center">
                                    <small className="text-nowrap">
                                        {player.damageDealt.toLocaleString("en-US")}
                                    </small>
                                    <div className="progress">
                                        <div
                                            className="fill"
                                            style={{ width: "87%" }}></div>
                                        <span className="w-1200">
                                            {player.damageDealt.toLocaleString("en-US")}
                                        </span>
                                    </div>
                                </div>
                                <div className="taken col-5 text-center">
                                    <small className="text-nowrap">
                                        {player.damageTaken.toLocaleString("en-US")}
                                    </small>
                                    <div className="progress">
                                        <div
                                            className="fill"
                                            style={{ width: "37%" }}></div>
                                        <span className="w-1200">
                                            {player.damageTaken.toLocaleString("en-US")}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td className="wards pe-1">
                            <div>
                                <small className="text-nowrap">
                                    {player.controlWards}
                                </small>
                                <small className="text-nowrap">
                                    {player.wardsPlaced} / {player.wardsKilled}
                                </small>
                            </div>
                        </td>
                        <td className="cs pe-1">
                            <div>
                                <small className="text-nowrap">{player.cs}</small>
                                <small className="text-nowrap">
                                    {calculateCsPerMinute(
                                        player.cs,
                                        props.gameDuration
                                    )}
                                    /m
                                </small>
                            </div>
                        </td>
                        <td className="items pe-2">
                            <div>
                                <div className="items-container">
                                    {player.items.map((item, itemIndex) => (
                                        <div key={itemIndex} className="rounded">
                                            {item && (
                                                <img
                                                    className="user-select-none rounded"
                                                    src={item}
                                                    alt={`Item Slot ${itemIndex + 1}`}
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <div className="damage-container">
                                    <div className="dealt col-5 text-center">
                                        <div className="progress">
                                            <div
                                                className="fill"
                                                style={{ width: "87%" }}></div>
                                            <span>{player.damageDealt}</span>
                                        </div>
                                    </div>
                                    <div className="taken col-5 text-center">
                                        <div className="progress">
                                            <div
                                                className="fill"
                                                style={{ width: "37%" }}></div>
                                            <span className="w-1200">
                                                {player.damageTaken}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="cs-container">
                                    <small className="text-nowrap">
                                        {player.cs} (
                                        {calculateCsPerMinute(
                                            player.cs,
                                            props.gameDuration
                                        )}
                                        /m)
                                    </small>
                                </div>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Team;
