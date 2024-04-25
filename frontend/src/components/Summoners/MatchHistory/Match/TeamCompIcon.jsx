import { useState } from "react";
import PlayerNameLabel from "./PlayerNameLabel";

function TeamCompIcon(props) {
    return (
        <div className="team-comp-icon-container">
            <img
                className="match-team-comp-icon user-select-none rounded-5"
                src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${props.player.championId}.png`}
                alt={`Champion icon for ${props.player.championName}`}
            />
            <PlayerNameLabel
                playerName={props.player.summonerName}
                playerTag={props.player.summonerTag}
            />
        </div>
    );
}

export default TeamCompIcon;
