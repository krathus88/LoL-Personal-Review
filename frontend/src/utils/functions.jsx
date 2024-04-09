import axios from "axios";

export function getSummonerName(summonerNameTag) {
    // Check if summonerNameTag contains more than one "#" character
    if (summonerNameTag.split("#").length > 2) {
        return;
    }

    // Check if summonerNameTag doesn't contain "#" character
    if (summonerNameTag.indexOf("#") === -1) {
        return;
    }

    let [summonerName, summonerTag] = summonerNameTag.split("#");

    summonerName = summonerName.trim();
    summonerTag = summonerTag.trim();

    // Check if summonerTag is empty
    if (summonerTag.length === 0) {
        return;
    }

    // Check if summonerTag is empty
    if (summonerTag.length > 5) {
        return;
    }

    return summonerName + "-" + summonerTag;
}
