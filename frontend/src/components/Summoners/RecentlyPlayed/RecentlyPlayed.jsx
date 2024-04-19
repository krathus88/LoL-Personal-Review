import Loading from "../../Common/Loading";
import "./RecentlyPlayed.css";
import { Suspense, lazy } from "react";

const PlayerPlayedWith = lazy(() => import("./PlayerPlayedWith"));

function RecentlyPlayed(props) {
    return (
        <div className="col-auto" id="recentlyPlayed">
            <div className="container-fluid container-lg rounded-4 pb-2">
                <p className="border-bottom pt-1 ps-2 mb-2 fw-light">
                    Recently Played With
                </p>
                <div className="d-flex flex-lg-column flex-row flex-wrap justify-content-around gap-2">
                    {props.loading && props.matches.length === 0 ? (
                        <Loading />
                    ) : (
                        <Suspense fallback=<Loading />>
                            {Object.entries(props.playedWith).map(
                                ([summonerName, player], index) => (
                                    <PlayerPlayedWith
                                        key={index}
                                        summonerName={summonerName}
                                        playedWith={player}
                                    />
                                )
                            )}
                        </Suspense>
                    )}
                </div>
            </div>
        </div>
    );
}

export default RecentlyPlayed;
