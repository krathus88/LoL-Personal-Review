import { useLoaderData } from "react-router-dom";
import SummonerHeader from "../components/Summoners/SummonerHeader";
import PersonalRating from "../components/Summoners/PersonalRating/PersonalRating";
import MatchHistory from "../components/Summoners/MatchHistory/MatchHistory";
import axios from "axios";
import Header from "../components/Common/Header";
import Footer from "../components/Common/Footer";
import Error from "./Error";

export const summonerLoader = async ({ params }) => {
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
        return <Error />;
    }
};

function Summoner() {
    const summonerData = useLoaderData();

    return (
        <>
            <Header />
            <main className="container-fluid mt-2">
                <SummonerHeader summonerInfo={summonerData.summoner_info} />
                <div className="d-flex flex-lg-row flex-column gap-3">
                    <PersonalRating rankedInfo={summonerData.ranked_info} />
                    <MatchHistory
                        region={summonerData.region}
                        puuid={summonerData.puuid}
                    />
                </div>
            </main>
            <Footer />
        </>
    );
}

export default Summoner;
