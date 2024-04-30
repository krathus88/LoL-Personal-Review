import type { QueueInfoType } from "../../../types/playerTypes";
import "./PersonalRating.css";
import { Queue } from "./Queue";

type PersonalRatingProps = {
    rankedInfo: QueueInfoType[];
};

export function PersonalRating({ rankedInfo }: PersonalRatingProps) {
    return (
        <div className="col-auto" id="personalRating">
            <div className="container-fluid container-lg rounded-4">
                <p className="border-bottom pt-1 ps-2 fw-light">Personal Ratings</p>
                <div className="d-flex flex-lg-column flex-md-row flex-column justify-content-around">
                    {rankedInfo[0].tier === "unranked" ? (
                        <p className="fw-light unranked-soloq ps-3">
                            Ranked Solo: <small>Unranked</small>
                        </p>
                    ) : (
                        <Queue
                            id="summonerRankedSoloQ"
                            queueName="Soloqueue"
                            queue={rankedInfo[0]}
                        />
                    )}
                    <div className="vertical-separator"></div>
                    <hr />
                    {rankedInfo[1].tier === "unranked" ? (
                        <p className="fw-light unranked-flex ps-3 pt-2 pb-2">
                            Ranked Flex: <small>Unranked</small>
                        </p>
                    ) : (
                        <Queue
                            id="summonerRankedFlex"
                            queueName="Ranked Flex"
                            queue={rankedInfo[1]}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
