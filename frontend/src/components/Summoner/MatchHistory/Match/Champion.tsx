type ChampionProps = {
    champId: number;
    champName: string;
    level: number;
    sum1: string;
    sum2: string;
    primaryRune: string;
};

export function Champion({
    champId,
    champName,
    level,
    sum1,
    sum2,
    primaryRune,
}: ChampionProps) {
    return (
        <div className="col-auto d-flex flex-row match-player-champ">
            <div className="match-player-champ-info text-center">
                <div className="match-player-champ-rune-container">
                    <img
                        className="match-player-champ-rune user-select-none"
                        src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/${primaryRune}`}
                        alt="Primary Rune"
                    />
                </div>
                <img
                    className="match-player-champ-icon user-select-none rounded-5"
                    src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${champId}.png`}
                    alt={`Champion ${champName}`}
                />
                <p className="match-player-champ-level">{level}</p>
            </div>
            <div className="ms-1 d-flex flex-column justify-content-between">
                <img
                    className="match-player-champ-sum-spell user-select-none rounded-2"
                    src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/${sum1}.png`}
                    alt="Summoner Spell 1"
                />
                <img
                    className="match-player-champ-sum-spell user-select-none rounded-2"
                    src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/${sum2}.png`}
                    alt="Summoner Spell 2"
                />
            </div>
        </div>
    );
}
