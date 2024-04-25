import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectRegion } from "../../../../../app/Slices/RegionSlice";

function Name({ summonerName, summonerTag, kills, deaths, assists, kda }) {
    const dispatch = useDispatch();

    const region = useSelector(selectRegion);

    const handleLinkClick = () => {
        dispatch(setProgress(60));
    };

    return (
        <div>
            <Link
                to={`/summoner/${region}/${summonerName}-${summonerTag}`}
                onClick={handleLinkClick}>
                {/* tier <small className="tier w-1300 "><span className="rounded">tier</span></small> */}
                <small className="name-container">
                    {summonerName} <span className="summoner-tag">#{summonerTag}</span>
                </small>
            </Link>
            {/*<small className="tier"> tier </small>*/}
            <small className="w-1300">
                {kills}/<span className="font-color-defeat">{deaths}</span>/{assists}{" "}
                <span className="fw-bold">{kda}</span>
            </small>
        </div>
    );
}

export default Name;
