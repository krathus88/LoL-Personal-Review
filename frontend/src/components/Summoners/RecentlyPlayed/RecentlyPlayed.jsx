import Loading from "../../Common/Loading";
import PlayerPlayedWith from "./PlayerPlayedWith";
import "./RecentlyPlayed.css";

function RecentlyPlayed(props) {
    return (
        <div className="col-auto" id="recentlyPlayed">
            <div className="container-fluid container-lg rounded-4 pb-2">
                <p className="border-bottom pt-1 ps-2 mb-2 fw-light">
                    Recently Played With
                </p>
                <div className="d-flex flex-lg-column flex-row flex-wrap justify-content-around gap-2">
                    {props.loading ? (
                        <Loading />
                    ) : (
                        Object.entries(props.playedWith).map(
                            ([summonerName, player], index) => (
                                <PlayerPlayedWith
                                    key={index}
                                    summonerName={summonerName}
                                    playedWith={player}
                                />
                            )
                        )
                    )}
                </div>
            </div>
        </div>
    );
}

export default RecentlyPlayed;
