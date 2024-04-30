import { Suspense, lazy } from "react";
import type { MatchDataType } from "../../../types/matchTypes";
import type { RecentlyPlayedType } from "../../../types/playerTypes";
import { Loading } from "../../Common/Loading";
import "./RecentlyPlayed.css";

const PlayerPlayedWith = lazy(() =>
    import("./PlayerPlayedWith").then((module) => ({
        default: module.PlayerPlayedWith,
    }))
);

type RecentlyPlayedProps = {
    loading: boolean;
    playedWith: RecentlyPlayedType;
    matches: MatchDataType[];
};

export function RecentlyPlayed({ loading, playedWith, matches }: RecentlyPlayedProps) {
    return (
        <div className="col-auto" id="recentlyPlayed">
            <div className="container-fluid container-lg rounded-4 pb-2">
                <p className="border-bottom pt-1 ps-2 mb-2 fw-light">
                    Recently Played With
                </p>
                <div className="d-flex flex-lg-column flex-row flex-wrap justify-content-around gap-2">
                    {loading && matches.length === 0 ? (
                        <Loading />
                    ) : (
                        <Suspense fallback={<Loading />}>
                            {Object.entries(playedWith).map(
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
