import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import Match from "./Match";
import "./MatchHistory.css";

function MatchHistory(props) {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);

    const count = useRef(0); // DELETE FOR PRODUCTION

    useEffect(() => {
        if (count.current !== 0) {
            // Function to fetch data from the API
            const fetchData = async () => {
                try {
                    const response = await axios.get(
                        "/api/summoners/match-history/",
                        {
                            params: {
                                region: props.region,
                                start: "0",
                                end: "10",
                                puuid: props.puuid,
                            },
                        }
                    );
                    console.log(response.data);
                    setMatches(response.data); // Assuming response.data is an array of match data
                    setLoading(false); // Set loading to false once data is fetched
                } catch (error) {
                    console.error("Error fetching data: ", error);
                    setLoading(false); // Set loading to false in case of error
                }
            };

            fetchData(); // Call the fetchData function when the component mounts
        }
        count.current++;
    }, [props.region, props.puuid]); // Empty dependency array to run the effect only once when the component mounts

    return (
        <div className="col" id="matchHistoryContainer">
            <div className="container-fluid rounded-4 pt-1 pb-2">
                <p className="border-bottom ps-2 fw-light">Recent Games</p>
                <div className="rounded-1 d-flex flex-column gap-2">
                    {loading ? (
                        // Render a loading indicator while data is being fetched
                        <p>Loading...</p>
                    ) : (
                        // Render the Match components once data is fetched
                        matches.map((combinedMatch, index) => (
                            <div
                                key={index}
                                className="match-container d-flex flex-column"
                            >
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
