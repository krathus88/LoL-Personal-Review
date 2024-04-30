import type { MatchPlayerDataType } from "../../../../types/matchTypes";
import { TeamCompIcon } from "./TeamCompIcon";

type TeamCompProps = {
    player: MatchPlayerDataType[];
};

export function TeamComp({ player }: TeamCompProps) {
    return (
        <div className="col match-team-comp">
            <div className="d-flex flex-row mx-0">
                {player.slice(0, 5).map((player, index) => (
                    <TeamCompIcon
                        key={index}
                        championId={player.championId}
                        championName={player.championName}
                        summonerName={player.summonerName}
                        summonerTag={player.summonerTag}
                    />
                ))}
            </div>
            <div className="d-flex flex-row mx-0">
                {player.slice(5, 10).map((player, index) => (
                    <TeamCompIcon
                        key={index}
                        championId={player.championId}
                        championName={player.championName}
                        summonerName={player.summonerName}
                        summonerTag={player.summonerTag}
                    />
                ))}
            </div>
        </div>
    );
}
