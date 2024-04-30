type ChampionProps = {
    championId: number;
    championName: string;
    level: number;
};

export function Champion({ championId, championName, level }: ChampionProps) {
    return (
        <div className="img-container">
            <img
                className="rounded-4"
                src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${championId}.png`}
                alt={`champion ${championName}`}></img>
            <div className="level">{level}</div>
        </div>
    );
}
