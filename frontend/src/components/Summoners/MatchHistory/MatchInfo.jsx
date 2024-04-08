function MatchInfo(props) {
    return (
        <div className="d-flex flex-column match-info ps-0">
            <p className="truncate">{props.gameMode}</p>
            <small className="truncate fw-light">{props.gameEnd} ago</small>
            <hr />
            <small className="truncate fw-light">{props.gameDuration}</small>
        </div>
    );
}

export default MatchInfo;
