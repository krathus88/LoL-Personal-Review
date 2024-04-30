import { PlayerNameLabel } from "./PlayerNameLabel";

type TeamCompIconProps = {
    championId: number;
    championName: string;
    summonerName: string;
    summonerTag: string | null;
};

export function TeamCompIcon({
    championId,
    championName,
    summonerName,
    summonerTag,
}: TeamCompIconProps) {
    return (
        <div className="team-comp-icon-container">
            <img
                className="match-team-comp-icon user-select-none rounded-5"
                src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${championId}.png`}
                alt={`Champion icon for ${championName}`}
            />
            <PlayerNameLabel summonerName={summonerName} summonerTag={summonerTag} />
        </div>
    );
}
