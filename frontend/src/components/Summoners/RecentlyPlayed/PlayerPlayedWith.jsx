import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setProgress } from "../../../app/Slices/progressSlice";
import { selectRegion } from "../../../app/Slices/regionSlice";

function PlayerPlayedWith(props) {
    const dispatch = useDispatch();

    const region = useSelector(selectRegion);

    const summonerName = props.summonerName.replace("#", "-");

    const winClass =
        props.playedWith.winrate >= 50 ? "font-color-win" : "font-color-defeat";

    const handleLinkClick = () => {
        dispatch(setProgress(60));
    };

    return (
        <div className="played-with-container d-flex flex-row align-items-center justify-content-between rounded-4 pe-3 truncate">
            <div className="played-with-name-container truncate">
                <Link
                    to={`/summoner/${region}/${summonerName}`}
                    onClick={handleLinkClick}
                    className="d-flex gap-1 align-items-center">
                    <img
                        className="played-with-icon user-select-none rounded-4"
                        src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${props.playedWith.profileIcon}.jpg`}
                        alt="Summoner Icon"
                    />
                    <small>{props.summonerName}</small>
                </Link>
            </div>

            <small>{props.playedWith.games_played}</small>
            <div className="col-2 text-center">
                <small className={winClass}>{props.playedWith.winrate}%</small>
            </div>
        </div>
    );
}

export default PlayerPlayedWith;
