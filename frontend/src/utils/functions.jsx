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
