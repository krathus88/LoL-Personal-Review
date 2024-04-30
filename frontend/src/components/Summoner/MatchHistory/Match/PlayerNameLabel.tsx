type PlayerNameLabelProps = {
    summonerName: string;
    summonerTag: string | null;
};

export function PlayerNameLabel({ summonerName, summonerTag }: PlayerNameLabelProps) {
    return (
        <div className="name-label rounded">
            <small>
                {summonerName} <span className="summoner-tag">#{summonerTag}</span>
            </small>
        </div>
    );
}
