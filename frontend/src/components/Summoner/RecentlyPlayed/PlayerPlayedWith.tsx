import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setProgress } from "../../../app/Slices/ProgressSlice";
import { selectRegion } from "../../../app/Slices/RegionSlice";
import type { RecentlyPlayedPlayerType } from "../../../types/playerTypes";

type PlayerPlayedWithProps = {
    summonerName: string;
    playedWith: RecentlyPlayedPlayerType;
};

export function PlayerPlayedWith({ summonerName, playedWith }: PlayerPlayedWithProps) {
    const dispatch = useDispatch();

    const region = useSelector(selectRegion);

    const summonerNameFiltered = summonerName.replace("#", "-");

    const winClass = playedWith.winrate >= 50 ? "font-color-win" : "font-color-defeat";

    const handleLinkClick = () => {
        dispatch(setProgress(60));
    };

    return (
        <div className="played-with-container d-flex flex-row align-items-center justify-content-between rounded-4 pe-3 truncate">
            <div className="played-with-name-container truncate">
                <Link
                    to={`/summoner/${region}/${summonerNameFiltered}`}
                    onClick={handleLinkClick}
                    className="d-flex gap-1 align-items-center">
                    <img
                        className="played-with-icon user-select-none rounded-4"
                        src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${playedWith.profileIcon}.jpg`}
                        alt="Summoner Icon"
                    />
                    <small>{summonerName}</small>
                </Link>
            </div>

            <small>{playedWith.gamesPlayed}</small>
            <div className="col-2 text-center">
                <small className={winClass}>{playedWith.winrate}%</small>
            </div>
        </div>
    );
}
