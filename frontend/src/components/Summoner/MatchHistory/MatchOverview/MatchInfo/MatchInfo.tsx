import type { MatchObjectivesType } from "../../../../../types/matchTypes";
import { Decoration } from "../../Decoration";
import { MatchData } from "./MatchData";
import "./MatchInfo.css";
import { TeamObjectives } from "./TeamObjectives";

type MatchInfoProps = {
    win: string;
    gameDuration: string;
    objectives: MatchObjectivesType[];
};

export function MatchInfo({ win, gameDuration, objectives }: MatchInfoProps) {
    return (
        <div className="separator">
            <Decoration team="blue" win={win === "blue"} gameDuration={gameDuration} />

            <TeamObjectives key="blue" team="blue" objectives={objectives[0]} />
            <MatchData win={win} objectives={objectives} />
            <TeamObjectives key="red" team="red" objectives={objectives[1]} />

            <Decoration team="red" win={win === "red"} gameDuration={gameDuration} />
        </div>
    );
}
