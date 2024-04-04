import React from "react";

function TeamCompIcon(props) {
    return (
        <img
            className="match-team-comp-icon rounded-5"
            src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${props.champId}.png`}
            alt={`Champion icon for ${props.champId}`}
        />
    );
}

export default TeamCompIcon;
