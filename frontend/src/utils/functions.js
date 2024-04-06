export function getSummonerName(summonerNameTag) {
    // Check if summonerNameTag contains more than one "#" character
    if (summonerNameTag.split("#").length > 2) {
        return;
    }

    // Check if summonerNameTag doesn't contain "#" character
    if (summonerNameTag.indexOf("#") === -1) {
        return;
    }

    // Split summonerNameTag into summonerName and summonerTag
    let [summonerName, summonerTag] = summonerNameTag.split("#");

    // Clear whitespaces before and after summonerName and summonerTag
    summonerName = summonerName.trim();
    summonerTag = summonerTag.trim();

    // Check if summonerTag is empty
    if (summonerTag.length === 0) {
        // Redirect to home page
        return;
    }

    return summonerName + "-" + summonerTag;
}
