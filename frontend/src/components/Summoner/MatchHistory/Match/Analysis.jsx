function Analysis(props) {
    return (
        <div className="col match-player-analysis pe-0">
            <div className="match-player-analysis-text-container d-flex flex-column gap-1">
                <small
                    className={`rounded-4 rank px-2 ${
                        props.perfRank === "ACE" ? "ace" : ""
                    } ${props.perfRank === "MVP" ? "mvp" : ""}`}>
                    {props.perfRank}
                </small>
                {props.multiKill && (
                    <small className="multikill rounded-4 px-2">
                        {props.multiKill}
                    </small>
                )}
            </div>
        </div>
    );
}

export default Analysis;
