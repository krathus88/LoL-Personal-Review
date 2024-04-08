function Stats(props) {
    return (
        <div className="col-auto match-player-stats">
            <small className="truncate">
                {props.cs} CS <span className="separator">- </span>
                <span className="font-color-defeat">KP {props.kp}%</span>
            </small>
            <p className="truncate fw-bolder m-0">
                {props.kills} /
                <span className="font-color-defeat"> {props.deaths}</span> /{" "}
                {props.assists}
            </p>
            <small className="truncate">{props.kda} KDA</small>
        </div>
    );
}

export default Stats;
