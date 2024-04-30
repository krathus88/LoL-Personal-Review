import { calculateCsPerMinute } from "../../../../utils/functions";

type StatsProps = {
    gameDuration: string;
    cs: number;
    kp: number;
    kills: number;
    deaths: number;
    assists: number;
    kda: string;
};

export function Stats({
    gameDuration,
    cs,
    kp,
    kills,
    deaths,
    assists,
    kda,
}: StatsProps) {
    const csPerMinute = calculateCsPerMinute(cs, gameDuration);

    return (
        <div className="col-auto match-player-stats">
            <small className="truncate">
                CS {cs} ({csPerMinute}){" "}
                <span className="kp font-color-defeat">KP {kp}%</span>
            </small>
            <p className="truncate fw-bolder m-0">
                {kills} /<span className="font-color-defeat"> {deaths}</span> /{" "}
                {assists}
            </p>
            <small className="truncate">{kda} KDA</small>
        </div>
    );
}
