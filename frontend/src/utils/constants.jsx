export const regions = [
    "EUW",
    "EUNE",
    "NA",
    "KR",
    "JP",
    "OCE",
    "BR",
    "LAS",
    "LAN",
    "RU",
    "TR",
    "SG",
    "PH",
    "TW",
    "VN",
    "TH",
];

export const dict_region = {
    EUW: "europe",
    EUNE: "europe",
    TR: "europe",
    RU: "europe",
    NA: "americas",
    BR: "americas",
    LAN: "americas",
    LAS: "americas",
    KR: "asia",
    JP: "asia",
    OCE: "sea",
    PH2: "sea",
    SG2: "sea",
    TH2: "sea",
    TW2: "sea",
    VN2: "sea",
};

export const dict_server = {
    EUW: "euw1",
    EUNE: "eun1",
    NA: "na1",
    KR: "kr",
    JP: "jp1",
    OCE: "oc1",
    BR: "br1",
    LAS: "la2",
    LAN: "la1",
    RU: "ru",
    TR: "tr1",
    SG: "sg2",
    PH: "ph2",
    TW: "tw2",
    VN: "vn2",
    TH: "th2",
};

export const dict_errors_riot_api = {
    400: "Bad request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Data not found",
    405: "Method not allowed",
    415: "Unsupported media type",
    429: "Rate limit exceeded",
    500: "Internal server error",
    502: "Bad gateway",
    503: "Service unavailable",
    504: "Gateway timeout",
};

export const dict_summoner_spells = {
    1: "summoner_boost", // Cleanse
    3: "summoner_exhaust", // Exhaust
    4: "summoner_flash", // Flash
    6: "summoner_haste", // Ghost
    7: "summoner_heal", // Heal
    11: "summoner_smite", // Smite Raw
    12: "summoner_teleport", // Teleport
    13: "summonermana", // Clarity
    14: "summonerignite", // Ignite
    21: "summonerbarrier", // Barrier
    30: "benevolence_of_king_poro_icon", // Poro Recall
    31: "trailblazer_poro_icon", // Poro Throw
    32: "summoner_mark", // Snowball
    39: "summoner_mark", // Snowball URF
};

export const dict_queue_id = {
    0: "Custom",
    2: "5v5 Blind Pick", // Deprecated | patch 7.19 in favor of queueId 430
    4: "5v5 Ranked Solo", // Deprecated | favor of queueId 420
    6: "5v5 Ranked Premade", // Deprecated
    7: "Co-op vs AI", // Deprecated | favor of queueId 32 and 33
    8: "3v3 Normal", // Deprecated | patch 7.19 in favor of queueId 460
    9: "3v3 Ranked Flex", // Deprecated | patch 7.19 in favor of queueId 470
    14: "5v5 Draft Pick", // Deprecated | favor of queueId 400
    16: "5v5 Dominion Blind Pick", // Deprecated
    17: "5v5 Dominion Draft Pick", // Deprecated
    25: "Dominion Co-op vs AI", // Deprecated
    31: "Co-op vs AI Intro Bot", // Deprecated | patch 7.19 in favor of queueId 830
    32: "Co-op vs AI Beginner Bot", // Deprecated | patch 7.19 in favor of queueId 840
    33: "Co-op vs AI Intermediate Bot", // Deprecated | patch 7.19 in favor of queueId 850
    41: "3v3 Ranked Team", // Deprecated
    42: "5v5 Ranked Team", // Deprecated
    52: "Co-op vs AI", // Deprecated | patch 7.19 in favor of queueId 800
    61: "5v5 Team Builder", // Deprecated
    65: "5v5 ARAM", // Deprecated | patch 7.19 in favor of queueId 450
    67: "ARAM Co-op vs AI", // Deprecated
    70: "One for All", // Deprecated | patch 8.6 in favor of queueId 1020
    72: "1v1 Snowdown Showdown",
    73: "2v2 Snowdown Showdown",
    75: "6v6 Hexakill",
    76: "URF",
    78: "One For All: Mirror",
    83: "Co-op vs AI URF",
    91: "Doom Bots Rank 1", // Deprecated | patch 7.19 in favor of queueId 950
    92: "Doom Bots Rank 2", // Deprecated | patch 7.19 in favor of queueId 950
    93: "Doom Bots Rank 5", // Deprecated | patch 7.19 in favor of queueId 950
    96: "Ascension", // Deprecated | patch 7.19 in favor of queueId 910
    98: "6v6 Hexakill",
    100: "ARAM",
    300: "Legend of the Poro King", // Deprecated | patch 7.19 in favor of queueId 920
    310: "Nemesis",
    313: "Black Market Brawlers",
    315: "Nexus Siege", // Deprecated | patch 7.19 in favor of queueId 940
    317: "Definitely Not Dominion",
    318: "ARURF", // Deprecated | patch 7.19 in favor of queueId 900
    325: "All Random",
    400: "Normal Draft",
    410: "5v5 Ranked Dynamic", // Deprecated | patch 6.22
    420: "Ranked Solo",
    430: "Normal Blind",
    440: "Ranked Flex",
    450: "ARAM",
    460: "3v3 Blind Pick", // Deprecated | patch 9.23
    470: "3v3 Ranked Flex", // Deprecated | patch 9.23
    490: "Quickplay",
    600: "Blood Hunt Assassin",
    610: "Dark Star: Singularity",
    700: "Clash: Summoner's Rift",
    720: "Clash: ARAM",
    800: "Co-op vs. AI Intermediate Bot", // Deprecated | patch 9.23
    810: "Co-op vs. AI Intro Bot", // Deprecated | patch 9.23
    820: "Co-op vs. AI Beginner", // Deprecated ? no info but it's Twisted Treeline
    830: "Co-op vs. AI Intro",
    840: "Co-op vs. AI Beginner",
    850: "Co-op vs. AI Intermediate",
    900: "ARURF",
    910: "Ascension",
    920: "Legend of the Poro King",
    940: "Nexus Siege",
    950: "Doom Bots Voting",
    960: "Doom Bots Standard",
    980: "Star Guardian Invasion: Normal",
    990: "Star Guardian Invasion: Onslaught",
    1000: "PROJECT: Hunters",
    1010: "Snow ARURF",
    1020: "One for All",
    1030: "Odyssey Extraction: Intro",
    1040: "Odyssey Extraction: Cadet",
    1050: "Odyssey Extraction: Crewmember",
    1060: "Odyssey Extraction: Captain",
    1070: "Odyssey Extraction: Onslaught",
    1090: "Teamfight Tactics",
    1100: "Ranked Teamfight Tactics",
    1110: "Teamfight Tactics Tutorial",
    1111: "Teamfight Tactics Test",
    1200: "Nexus Blitz", // Deprecated | patch 9.2
    1300: "Nexus Blitz",
    1400: "Ultimate Spellbook",
    1700: "Arena",
    1900: "Pick URF",
    2000: "Tutorial 1",
    2010: "Tutorial 2",
    2020: "Tutorial 3",
};
