function PlayerNameLabel(props) {
    return (
        <div className="name-label rounded">
            <small>
                {props.playerName}{" "}
                <span className="summoner-tag">#{props.playerTag}</span>
            </small>
        </div>
    );
}

export default PlayerNameLabel;
