import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { selectIsMobile } from "../../../app/Slices/IsMobileSlice";
import { setProgress } from "../../../app/Slices/ProgressSlice";
import { regions } from "../../../utils/constants";
import { getSummonerName } from "../../../utils/functions";
import { ErrorPopup } from "../ErrorPopup";
import "./Header.css";
import { ThemeSwitch } from "./ThemeSwitch";

export function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { region = "", summonerNameTag = "" } = useParams();

    const isMobile = useSelector(selectIsMobile);

    const inputRefHeader = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Get form data
        const formData = new FormData(event.target);
        const regionForm = formData.get("region") as string;
        const summonerNameTagForm = formData.get("summoner_name_tag") as string;

        const { summonerNameTagFiltered, errorMessage } = getSummonerName(
            summonerNameTagForm,
            regionForm,
            summonerNameTag,
            region
        );

        if (inputRefHeader.current && errorMessage) {
            inputRefHeader.current.style.borderColor = "red";
            inputRefHeader.current.style.boxShadow = "0 0 10px #ea868f";
            setError(errorMessage);
            return;
        }

        handleCloseError();

        dispatch(setProgress(60));

        // Redirect to the "/summoner" route
        navigate(`/summoner/${regionForm}/${summonerNameTagFiltered}`);
    };

    const handleCloseError = () => {
        if (inputRefHeader.current) {
            inputRefHeader.current.style.borderColor = "";
            inputRefHeader.current.style.boxShadow = "";
            setError(null);
        }
    };

    const LinkClick = () => {
        dispatch(setProgress(60));
    };

    return (
        <header>
            {error && <ErrorPopup message={error} onClose={handleCloseError} />}
            <nav className="navbar navbar-expand-md border-bottom">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/" onClick={LinkClick}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="50"
                            height="50"
                            fill="currentColor"
                            className="bi bi-person-square user-select-none"
                            viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
                        </svg>
                    </Link>
                    {isMobile && <ThemeSwitch />}
                    <button
                        className="navbar-toggler collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarCollapse"
                        aria-controls="navbarCollapse"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="navbar-collapse collapse" id="navbarCollapse">
                        <ul className="navbar-nav mb-2 mb-md-0">
                            <li className="nav-item">
                                <Link
                                    className="nav-link active"
                                    aria-current="page"
                                    to="/"
                                    onClick={LinkClick}>
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/" onClick={LinkClick}>
                                    Link
                                </Link>
                            </li>
                        </ul>
                        {!isMobile && <ThemeSwitch />}
                        <form
                            className="d-flex col-12 col-md-6 col-lg-5 col-xxl-4"
                            id="summonerSearchForm"
                            role="search"
                            onSubmit={handleSubmit}>
                            <select
                                className="form-select rounded-start"
                                id="region"
                                name="region"
                                aria-label="Region Header"
                                required>
                                {regions.map((region, index) => (
                                    <option key={index} value={region}>
                                        {region}
                                    </option>
                                ))}
                            </select>
                            <input
                                ref={inputRefHeader}
                                id="summonerSearch"
                                type="text"
                                name="summoner_name_tag"
                                className="form-control rounded-end flex-grow-1"
                                maxLength={22}
                                placeholder="ex: Summ#EUW"
                                autoComplete="off"
                                aria-label="Search Summoner Header"
                                required
                            />
                        </form>
                    </div>
                </div>
            </nav>
        </header>
    );
}
