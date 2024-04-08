import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Match from "./Match";
import "./MatchHistory.css";
import Loading from "../../Common/Loading";

function MatchHistory(props) {
    const navigate = useNavigate();

    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);

    const count = useRef(0); // DELETE FOR PRODUCTION

    useEffect(() => {
        if (count.current !== 0) {
            // Function to fetch data from the API
            const fetchData = () => {
                axios
                    .get("/api/summoners/match-history/", {
                        params: {
                            region: props.region,
                            start: "0",
                            end: "10",
                            puuid: props.puuid,
                        },
                    })
                    .then((response) => {
                        setMatches(response.data);
                        setLoading(false);
                    })
                    .catch((error) => {
                        if (error.response) {
                            console.error("Server Error:", error.response.status);
                            navigate("/error");
                        } else if (error.request) {
                            console.error("Network Error:", error.request);
                            navigate("/error");
                        } else {
                            console.error("Error:", error.message);
                            navigate("/error");
                        }
                    });
            };

            fetchData(); // Call the fetchData function when the component mounts
        }
        count.current++;
    }, [props.region, props.puuid, navigate]); // Empty dependency array to run the effect only once when the component mounts

    return (
        <div className="col" id="matchHistoryContainer">
            <div className="container-fluid rounded-4 pt-1 pb-2">
                <p className="border-bottom ps-2 fw-light">Recent Games</p>
                <div className="rounded-1 d-flex flex-column gap-2">
                    {loading ? (
                        <Loading />
                    ) : (
                        // Render the Match components once data is fetched
                        matches.map((combinedMatch, index) => (
                            <div
                                key={index}
                                className="match-container d-flex flex-column">
                                <Match
                                    playerData={combinedMatch.player_match}
                                    matchData={combinedMatch.match}
                                />
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default MatchHistory;
