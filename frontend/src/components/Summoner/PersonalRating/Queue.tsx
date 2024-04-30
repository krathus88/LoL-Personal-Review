import type { QueueInfoType } from "../../../types/playerTypes";

type QueueProps = {
    id: string;
    queueName: string;
    queue: QueueInfoType;
};

export function Queue({ id, queueName, queue }: QueueProps) {
    const tier = (queue.tier as string).toLowerCase();
    const excludeTiers = ["challenger", "grandmaster", "master"];

    return (
        <div className="d-flex flex-row pb-2" id={id}>
            <div className="col-auto league-rank-img-container">
                <img
                    className="league-rank-img user-select-none"
                    src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-${(
                        queue.tier as string
                    ).toLowerCase()}.png`}
                    alt={`${queueName} Tier ${queue.tier}`}
                />
            </div>
            <div className="col league-rank-container truncate">
                <div className="col-auto d-flex flex-column me-2 truncate">
                    <h3>
                        {queue.tier as string}{" "}
                        {!excludeTiers.includes(tier as string) &&
                            (queue.rank as string)}
                    </h3>
                    <small className="fw-light mb-2">{queueName}</small>
                    <small className="fw-light">
                        LP: {queue.leaguePoints as number}
                    </small>
                </div>
                <div className="col d-flex flex-column fw-light">
                    <small className="d-flex flex-row">
                        Wins:&nbsp;
                        <span className="font-color-win">{queue.wins as number}</span>
                    </small>
                    <small className="d-flex flex-row">
                        Defeats:&nbsp;
                        <span className="font-color-defeat">
                            {queue.losses as number}
                        </span>
                    </small>
                    <small className="win-rate mb-1">
                        WR: {queue.winRate as number}%
                    </small>
                </div>
            </div>
        </div>
    );
}
