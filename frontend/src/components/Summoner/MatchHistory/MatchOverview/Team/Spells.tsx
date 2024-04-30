type SpellsProps = {
    summoner1: string;
    summoner2: string | null;
};

export function Spells({ summoner1, summoner2 }: SpellsProps) {
    return (
        <div>
            <img
                className="rounded"
                src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/${summoner1}.png`}
                alt="Summoner Spell 1"></img>
            <img
                className="rounded"
                src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/${summoner2}.png`}
                alt="Summoner Spell 2"></img>
        </div>
    );
}
