function Champion(props) {
    return (
        <div className="col-auto d-flex flex-row match-player-champ">
            <div className="match-player-champ-info text-center">
                <div className="match-player-champ-rune-container">
                    <img
                        className="match-player-champ-rune user-select-none"
                        src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/${props.primaryRune}`}
                        alt="Primary Rune"
                    />
                </div>
                <img
                    className="match-player-champ-icon user-select-none rounded-5"
                    src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${props.champId}.png`}
                    alt={`Champion ${props.champName}`}
                />
                <p className="match-player-champ-level">{props.level}</p>
            </div>
            <div className="ms-1 d-flex flex-column justify-content-between">
                <img
                    className="match-player-champ-sum-spell user-select-none rounded-2"
                    src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/${props.sum1Id}.png`}
                    alt="Summoner Spell 1"
                />
                <img
                    className="match-player-champ-sum-spell user-select-none rounded-2"
                    src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/${props.sum2Id}.png`}
                    alt="Summoner Spell 2"
                />
            </div>
        </div>
    );
}

export default Champion;
