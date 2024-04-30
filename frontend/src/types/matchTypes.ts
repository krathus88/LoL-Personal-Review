/* MatchDataType */
export type MatchPlayerDataType = {
    puuid: string;
    summonerName: string;
    summonerTag: string | null;
    championId: number;
    championName: string;
    level: number;
    kills: number;
    deaths: number;
    assists: number;
    kda: string;
    killParticipation: number;
    cs: number;
    summoner1: string;
    summoner2: string;
    primaryRune: string;
    secondaryRune: string | null;
    items: (string | null)[];
    largestMultiKill: string;
    damageDealt: number;
    damageDealtPercentage: number;
    damageTaken: number;
    damageTakenPercentage: number;
    controlWards: number;
    wardsPlaced: number;
    wardsKilled: number;
    performanceScore: number;
    performanceRanking: string;
    win: boolean;
};

export type MatchObjectivesType = {
    kills: number;
    gold: number;
    baron: number;
    dragon: number;
    riftHerald: number;
    voidgrubs: number;
    towers: number;
    inhibitors: number;
};

export type MatchDataType = {
    gameMode: string;
    matchId: string;
    gameDuration: string;
    timeSinceGameEnd: string;
    win: "blue" | "red";
    playersData: MatchPlayerDataType[];
    objectives: MatchObjectivesType[];
};
