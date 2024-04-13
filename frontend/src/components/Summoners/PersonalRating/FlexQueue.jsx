function FlexQueue(props) {
    const tier = props.rankFlex.tier.toLowerCase();
    const excludeTiers = ["challenger", "grandmaster", "master"];

    return (
        <div className="row pb-2" id="summonerRankedFlex">
            <div className="col-auto league-rank-img-container">
                <img
                    className="league-rank-img user-select-none"
                    src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-${props.rankFlex.tier.toLowerCase()}.png`}
                    alt={`Flex Queue Tier ${props.rankFlex.tier}`}
                />
            </div>
            <div className="col d-flex flex-lg-row flex-column">
                <div className="col-auto d-flex flex-column me-3">
                    <h3>
                        {props.rankFlex.tier}{" "}
                        {!excludeTiers.includes(tier) && props.rankFlex.rank}
                    </h3>
                    <small className="fw-light mb-2">Ranked Flex</small>
                    <small className="fw-light">
                        LP: {props.rankFlex.leaguePoints}
                    </small>
                </div>
                <div className="col d-flex flex-column">
                    <small className="fw-light">
                        Wins:{" "}
                        <span className="font-color-win">{props.rankFlex.wins}</span>
                    </small>
                    <small className="fw-light mb-2">
                        Defeats:{" "}
                        <span className="font-color-defeat">
                            {props.rankFlex.losses}
                        </span>
                    </small>
                    <small className="fw-light">WR: {props.rankFlex.winRate}%</small>
                </div>
            </div>
        </div>
    );
}

export default FlexQueue;
