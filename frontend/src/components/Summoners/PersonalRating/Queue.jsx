function Queue(props) {
    const tier = props.queue.tier.toLowerCase();
    const excludeTiers = ["challenger", "grandmaster", "master"];

    return (
        <div className="d-flex flex-row pb-2" id={props.id}>
            <div className="col-auto league-rank-img-container">
                <img
                    className="league-rank-img user-select-none"
                    src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-${props.queue.tier.toLowerCase()}.png`}
                    alt={`Flex Queue Tier ${props.queue.tier}`}
                />
            </div>
            <div className="col league-rank-container truncate">
                <div className="col-auto d-flex flex-column me-2 truncate">
                    <h3>
                        {props.queue.tier}{" "}
                        {!excludeTiers.includes(tier) && props.queue.rank}
                    </h3>
                    <small className="fw-light mb-2">Ranked Flex</small>
                    <small className="fw-light">LP: {props.queue.leaguePoints}</small>
                </div>
                <div className="col">
                    <div className="fw-light">
                        <small className="d-flex flex-row">
                            Wins:&nbsp;
                            <span className="font-color-win">{props.queue.wins}</span>
                        </small>
                        <small className="wd-separator">&nbsp;-&nbsp;</small>
                        <small className="d-flex flex-row">
                            Defeats:&nbsp;
                            <span className="font-color-defeat">
                                {props.queue.losses}
                            </span>
                        </small>
                    </div>
                    <small className="fw-light win-rate mb-1">
                        WR: {props.queue.winRate}%
                    </small>
                </div>
            </div>
        </div>
    );
}

export default Queue;
