from ninja import Schema
from typing import List, Dict


# region Summoner Detail
class SummonerInfo(Schema):
    puuid: str
    region: str
    name: str
    tag: str
    level: int
    iconId: int


class RankedInfo(Schema):
    leagueId: str
    queueType: str
    tier: str
    rank: str
    summonerId: str
    leaguePoints: int
    wins: int
    losses: int
    veteran: bool
    inactive: bool
    freshBlood: bool
    hotStreak: bool
    winRate: int


class RankedInfoUnranked(Schema):
    tier: str


class SummonerDetailResponse(Schema):
    summonerInfo: SummonerInfo
    rankedInfo: List[RankedInfo] | List[RankedInfoUnranked]


# endregion


# region Match History
class MatchesInfo(Schema):
    gameMode: str
    matchId: str
    gameDuration: str
    timeSinceGameEnd: str
    win: str
    playersData: List["PlayersDataInfo"]


class PlayersDataInfo(Schema):
    puuid: str
    summonerName: str
    summonerTag: str
    championId: int
    championName: str
    level: int
    kills: int
    deaths: int
    assists: int
    kda: str
    killParticipation: int
    cs: int
    summoner1: str
    summoner2: str
    primaryRune: str | None
    secondaryRune: str | None
    items: List[str | None]
    largestMultiKill: str | None
    damageDealt: int
    damageDealtPercentage: float
    damageTaken: int
    damageTakenPercentage: float
    controlWards: int
    wardsPlaced: int
    wardsKilled: int
    performanceScore: float
    performanceRanking: str
    win: bool


class RecentlyPlayedInfo(Schema):
    profileIcon: int
    gamesPlayed: int
    wins: int
    winrate: int


class MatchHistoryResponse(Schema):
    matches: List[MatchesInfo]
    recentlyPlayed: Dict[str, RecentlyPlayedInfo] | None


# endregion


# region Update Button
class UpdateButtonResponse(Schema):
    summonerData: SummonerDetailResponse
    matches: List[MatchesInfo]
    recentlyPlayed: Dict[str, RecentlyPlayedInfo] | None


# endregion
