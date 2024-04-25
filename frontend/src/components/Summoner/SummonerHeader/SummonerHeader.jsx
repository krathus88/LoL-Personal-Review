import "./SummonerHeader.css";
import { useEffect, useState } from "react";

function SummonerHeader(props) {
    const [timeElapsed, setTimeElapsed] = useState(
        localStorage.getItem("lastButtonDisabledTime")
    );

    const updateButtonClick = async () => {
        const button = document.getElementById("updateButton");
        const span = button.querySelector("span");
        const svg = button.querySelector("svg");

        // Disable the button to prevent multiple clicks
        button.disabled = true;

        svg.classList.add("spin-update-animation");

        try {
            span.remove();
            await props.onUpdate();

            button.classList.add("success");
            svg.classList.remove("spin-update-animation");
        } catch (error) {
            button.classList.add("fail");
            svg.classList.remove("spin-update-animation");
        } finally {
            setTimeout(() => {
                button.classList.remove("success");
                button.classList.remove("fail");
                button.insertAdjacentHTML("afterbegin", "<span>Update</span>");
            }, 1000);

            localStorage.setItem("lastButtonDisabledTime", Date.now());
            setTimeElapsed(localStorage.getItem("lastButtonDisabledTime"));
        }
    };

    // Check if the button needs to be re-enabled on component mount
    useEffect(() => {
        const lastDisabledTime = localStorage.getItem("lastButtonDisabledTime");
        if (lastDisabledTime) {
            const elapsedTime = Date.now() - parseInt(lastDisabledTime);

            const button = document.getElementById("updateButton");
            button.disabled = true;

            // If the elapsed time is less than 2 minutes, set a timeout to re-enable the button
            setTimeout(() => {
                button.disabled = false;
                localStorage.removeItem("lastButtonDisabledTime");
            }, 120000 - elapsedTime);
        }
    }, [timeElapsed]);
    return (
        <div
            className="container-fluid row align-items-center flex-nowrap mb-3 py-2 rounded-3"
            id="summonerHeader">
            <div className="col-auto">
                <img
                    className="profile-icon user-select-none rounded-3"
                    src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${props.summonerInfo.iconId}.jpg`}
                    alt="Summoner Icon"
                />
            </div>
            <div className="col truncate">
                <h4 className="truncate">
                    {props.summonerInfo.name}{" "}
                    <span className="summoner-tag">#{props.summonerInfo.tag}</span> (
                    {props.summonerInfo.region})
                </h4>
                <small className="truncate">Level: {props.summonerInfo.level}</small>
            </div>
            <div className="col-auto">
                <button
                    type="button"
                    id="updateButton"
                    className="btn btn-primary text-center"
                    onClick={updateButtonClick}
                    disabled={props.loading && timeElapsed === null}>
                    <span>Update</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        className="bi bi-arrow-repeat user-select-none ms-1"
                        viewBox="0 0 16 16">
                        <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41m-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9" />
                        <path
                            fillRule="evenodd"
                            d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5 5 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default SummonerHeader;
