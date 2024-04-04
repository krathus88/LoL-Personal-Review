import React from "react";
import { dict_queue_id } from "../../../utils/constants";

function MatchInfo(props) {
    const gameMode = dict_queue_id[props.gameModeId];

    return (
        <div className="d-flex flex-column match-info ps-0">
            <p className="truncate">{gameMode}</p>
            <small className="truncate fw-light">{props.gameEnd} ago</small>
            <hr />
            <small className="truncate fw-light">{props.gameDuration}</small>
        </div>
    );
}

export default MatchInfo;
