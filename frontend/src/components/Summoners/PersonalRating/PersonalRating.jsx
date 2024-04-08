import SoloQueue from "./SoloQueue";
import FlexQueue from "./FlexQueue";
import "./PersonalRating.css";

function PersonalRating(props) {
    return (
        <div className="col-auto" id="personalRating">
            <div className="container-fluid container-lg rounded-4">
                <p className="border-bottom pt-1 ps-2 fw-light">Personal Ratings</p>
                <div className="d-flex flex-lg-column flex-md-row flex-column justify-content-around">
                    {props.rankedInfo[0].tier === "unranked" ? (
                        <p className="fw-light unranked-soloq ps-3">
                            Ranked Solo: <small>Unranked</small>
                        </p>
                    ) : (
                        <SoloQueue rankSoloQ={props.rankedInfo[0]} />
                    )}
                    <div className="vertical-separator"></div>
                    <hr />
                    {props.rankedInfo[1].tier === "unranked" ? (
                        <p className="fw-light unranked-flex ps-3 pt-2 pb-2">
                            Ranked Flex: <small>Unranked</small>
                        </p>
                    ) : (
                        <FlexQueue rankFlex={props.rankedInfo[1]} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default PersonalRating;
