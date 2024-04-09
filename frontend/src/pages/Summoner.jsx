import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import axios from "axios";
import SummonerHeader from "../components/Summoners/SummonerHeader";
import PersonalRating from "../components/Summoners/PersonalRating/PersonalRating";
import MatchHistory from "../components/Summoners/MatchHistory/MatchHistory";

export const SummonerLoader = async ({ params }) => {
    const { region, summonerNameTag } = params;

    let [summonerName, summonerTag] = summonerNameTag.split("-");

    try {
        const response = await axios.get("/api/summoners/", {
            params: {
                region: region,
                summoner_name: summonerName,
                summoner_tag: summonerTag,
            },
        });
        return response.data;
    } catch (error) {
        throw error; // Re-throw the error to let React Router handle it
    }
};

function Summoner() {
    const summonerData = useLoaderData();

    useEffect(() => {
        document.title = `${summonerData.summoner_info.name}#${summonerData.summoner_info.tag} - LoL PR`;
    }, [summonerData]);

    return (
        <main className="container-fluid mt-2">
            <SummonerHeader summonerInfo={summonerData.summoner_info} />
            <div className="d-flex flex-lg-row flex-column gap-3">
                <PersonalRating rankedInfo={summonerData.ranked_info} />
                <MatchHistory region={summonerData.region} puuid={summonerData.puuid} />
            </div>
        </main>
    );
}

export default Summoner;
