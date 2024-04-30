/* SummonerDataType */
export type SummonerInfoType = {
    puuid: string;
    region: string;
    name: string;
    tag: string;
    level: number;
    iconId: number;
};

export type QueueInfoType = Record<string, unknown>;

export type SummonerDataType = {
    summonerInfo: SummonerInfoType;
    rankedInfo: QueueInfoType[];
};

/* RecentlyPlayedType */
export type RecentlyPlayedPlayerType = {
    profileIcon: number;
    gamesPlayed: number;
    wins: number;
    winrate: number;
};

export type RecentlyPlayedType = {
    [playerName: string]: RecentlyPlayedPlayerType;
};
