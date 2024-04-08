function SoloQueue(props) {
    const tier = props.rankSoloQ.tier.toLowerCase();
    const excludeTiers = ["challenger", "grandmaster", "master"];

    return (
        <div className="row" id="summonerRankedSoloQ">
            <div className="col-auto league-rank-img-container">
                <img
                    className="league-rank-img"
                    src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-${props.rankSoloQ.tier.toLowerCase()}.png`}
                    alt={`Solo Queue Tier ${props.rankSoloQ.tier}`}
                />
            </div>
            <div className="col d-flex flex-column">
                <h3>
                    {props.rankSoloQ.tier}{" "}
                    {!excludeTiers.includes(tier) && props.rankSoloQ.rank}
                </h3>
                <small className="fw-light mb-3">Soloqueue</small>
                <small className="fw-light">LP: {props.rankSoloQ.leaguePoints}</small>
                <small className="fw-light mb-1">
                    Wins: <span className="font-color-win">{props.rankSoloQ.wins}</span>{" "}
                    - Defeats:{" "}
                    <span className="font-color-defeat">{props.rankSoloQ.losses}</span>
                </small>
                <small className="fw-light win-rate">
                    WR: {props.rankSoloQ.winRate}%
                </small>
            </div>
        </div>
    );
}

export default SoloQueue;
