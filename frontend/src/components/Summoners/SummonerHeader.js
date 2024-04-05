import React from "react";
import "./Header.css";

function SummonerHeader(props) {
    return (
        <div
            className="container-fluid row align-items-center flex-nowrap mb-3 py-2 rounded-3"
            id="summonerHeader"
        >
            <div className="col-auto">
                <img
                    className="profile-icon rounded-3"
                    src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${props.summonerInfo.iconId}.jpg`}
                    alt="Summoner Icon"
                />
            </div>
            <div className="col truncate">
                <h4 className="truncate">
                    {props.summonerInfo.name}#{props.summonerInfo.tag} (
                    {props.summonerInfo.region})
                </h4>
                <small className="truncate">
                    Level: {props.summonerInfo.level}
                </small>
            </div>
            <div className="col-auto">
                <button type="button" className="btn btn-warning">
                    Update
                    <span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="currentColor"
                            className="bi bi-arrow-repeat"
                            viewBox="0 0 16 16"
                        >
                            <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41m-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9" />
                            <path
                                fillRule="evenodd"
                                d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5 5 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z"
                            />
                        </svg>
                    </span>
                </button>
            </div>
        </div>
    );
}

export default SummonerHeader;
