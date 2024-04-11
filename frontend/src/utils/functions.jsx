export function getSummonerName(summonerNameTag) {
    // Check if summonerNameTag contains more than one "#" character
    if (summonerNameTag.split("#").length > 2) {
        return {
            errorMessage: "Summoner name cannot contain more than one '#' character.",
        };
    }

    // Check if summonerNameTag doesn't contain "#" character
    if (summonerNameTag.indexOf("#") === -1) {
        return { errorMessage: "Summoner name must contain a '#' character." };
    }

    let [summonerName, summonerTag] = summonerNameTag.split("#");

    summonerName = summonerName.trim();
    summonerTag = summonerTag.trim();

    // Check if summonerTag is empty
    if (summonerTag.length === 0) {
        return { errorMessage: "Summoner tag cannot be empty." };
    }

    // Check if summonerTag is empty
    if (summonerTag.length > 5) {
        return { errorMessage: "Summoner tag cannot be longer than 5 characters." };
    }

    return { summonerNameTag: `${summonerName}-${summonerTag}` };
}

export function getMultiKill(multiKill) {
    switch (multiKill) {
        case 0:
            return null;
        case 1:
            return null;
        case 2:
            return "Double Kill";
        case 3:
            return "Triple Kill";
        case 4:
            return "Quadra Kill";
        case 5:
            return "PENTAKILL";
        case 6:
            return "HEXAKILL";
        default:
            return "MULTIKILL";
    }
}
