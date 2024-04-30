import type { MatchObjectivesType } from "../../../../../types/matchTypes";

type MatchDataProps = {
    win: string;
    objectives: MatchObjectivesType[];
};

export function MatchData({ win, objectives }: MatchDataProps) {
    const blueGoldPercentage =
        (objectives[0].gold * 100) / (objectives[0].gold + objectives[1].gold);

    return (
        <div className="match-data">
            <small className="fw-bold">
                <span
                    className={win === "blue" ? "font-color-win" : "font-color-defeat"}>
                    {objectives[0].kills}
                </span>
                <span className="fw-normal">&nbsp;vs&nbsp;</span>
                <span
                    className={win === "red" ? "font-color-win" : "font-color-defeat"}>
                    {objectives[1].kills}
                </span>
            </small>
            <div className="progress">
                <div>
                    <small>{objectives[0].gold.toLocaleString("en-US")}</small>
                    <small>Total Gold</small>
                    <small>{objectives[1].gold.toLocaleString("en-US")}</small>
                </div>
                <span style={{ width: `${blueGoldPercentage}%` }}></span>
            </div>
        </div>
    );
}
