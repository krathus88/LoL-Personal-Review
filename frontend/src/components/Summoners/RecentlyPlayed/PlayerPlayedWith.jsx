import { useContext } from "react";
import { Link } from "react-router-dom";
import { RegionContext } from "../../../pages/Summoner";

function PlayerPlayedWith(props) {
    const region = useContext(RegionContext);
    const summonerName = props.summonerName.replace("#", "-");

    const winClass =
        props.playedWith.winrate >= 50 ? "font-color-win" : "font-color-defeat";

    return (
        <div className="played-with-container d-flex flex-row align-items-center justify-content-between rounded-4 pe-3 truncate">
            <Link
                to={`/summoner/${region}/${summonerName}`}
                className="played-with-name-container d-flex gap-1 align-items-center">
                <img
                    className="played-with-icon rounded-4"
                    src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${props.playedWith.profileIcon}.jpg`}
                    alt="Summoner Icon"
                />
                <small className="truncate">{props.summonerName}</small>
            </Link>
            <small>{props.playedWith.games_played}</small>
            <div className="col-2 text-center">
                <small className={winClass}>{props.playedWith.winrate}%</small>
            </div>
        </div>
    );
}

export default PlayerPlayedWith;
