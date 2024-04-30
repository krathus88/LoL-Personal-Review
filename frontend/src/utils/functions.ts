import axios from "axios";

export const fetchData = async (
    method: string,
    url: string,
    params?: {
        puuid?: string;
        region?: string;
        summoner_name?: string;
        summoner_tag?: string;
        start?: string;
        num_games?: string;
        lastMatch?: string;
    }
) => {
    try {
        const response = await axios({
            method,
            url,
            params,
        });

        return response.data;
    } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
            if (error.response) {
                throw error;
            } else if (error.request) {
                console.error("Network Error:", error.request);
                throw error.response;
            } else {
                console.error("Error:", error.message);
            }
        }
        console.log("why here");

        throw error;
    }
};

type getSummonerNameResult = {
    errorMessage?: string;
    summonerNameTagFiltered?: string;
};

export const getSummonerName = (
    summonerNameTagForm: string,
    regionForm: string = "",
    summonerNameTag: string = "",
    region: string = ""
): getSummonerNameResult => {
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

    return { summonerNameTagFiltered: `${summonerName}-${summonerTag}` };
};

type calculateCsPerMinuteParams = {
    cs: string;
    gameDuration: string;
};

export const calculateCsPerMinute = ({
    cs,
    gameDuration,
}: calculateCsPerMinuteParams) => {
    // Extract minutes and seconds from the game duration string
    const [minutesString, secondsString] = gameDuration.split("m ");
    const minutes = parseInt(minutesString, 10);
    const seconds = parseInt(secondsString, 10);

    // Calculate total game duration in minutes (including partial minutes)
    const totalMinutes = minutes + seconds / 60;

    // Calculate CS per minute with proper rounding
    const csPerMinute = Math.round(((parseInt(cs, 10) | 0) / totalMinutes) * 10) / 10; // Round to one decimal place

    return csPerMinute;
};
