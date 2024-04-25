function Spells({ summoner1Id, summoner2Id }) {
    return (
        <div>
            <img
                className="rounded"
                src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/${summoner1Id}.png`}
                alt="Summoner Spell 1"></img>
            <img
                className="rounded"
                src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/${summoner2Id}.png`}
                alt="Summoner Spell 2"></img>
        </div>
    );
}

export default Spells;
