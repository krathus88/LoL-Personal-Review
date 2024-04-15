import axios from "axios";

export const fetchData = async (method, url, params = {}) => {
    try {
        const response = await axios({
            method,
            url,
            params,
        });

        return response.data;
    } catch (error) {
        if (error.response) {
            throw error;
        } else if (error.request) {
            console.error("Network Error:", error.request);
            throw error.response;
        } else {
            console.error("Error:", error.message);
        }

        throw error;
    }
};

export const getSummonerName = (
    summonerNameTagForm,
    regionForm = {},
    summonerNameTag = {},
    region = {}
) => {
    // Check if summonerNameTagForm contains more than one "#" character
    if (summonerNameTagForm.split("#").length > 2) {
        return {
            errorMessage: "Summoner name cannot contain more than one '#' character.",
        };
    }

    // Check if summonerNameTagForm doesn't contain "#" character
    if (summonerNameTagForm.indexOf("#") === -1) {
        return { errorMessage: "Summoner name must contain a '#' character." };
    }

    let [summonerName, summonerTag] = summonerNameTagForm.split("#");

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

    // Check if summoner is already being displayed
    if (regionForm === region) {
        if (summonerName + "-" + summonerTag === summonerNameTag) {
            return { errorMessage: "Summoner already in display." };
        }
    }

    return { summonerNameTagForm: `${summonerName}-${summonerTag}` };
};
