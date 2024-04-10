import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { regions } from "../../utils/constants";
import { getSummonerName } from "../../utils/functions";
import ErrorPopup from "../Common/ErrorPopup";
import "./Home.css";

function SearchForm() {
    const navigate = useNavigate();

    const inputRefMobile = useRef(null);
    const [error, setError] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        // Set up resize event listener
        window.addEventListener("resize", handleResize);

        // Clean up event listener on component unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []); // Add isMobile to the dependency array

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Get form data
        const formData = new FormData(event.target);
        let region = formData.get("region");

        let summonerNameTag;

        if (isMobile) {
            let { summonerNameTag: mobileSummonerNameTag, errorMessage } =
                getSummonerName(formData.get("summoner_name_tag"));

            if (errorMessage) {
                inputRefMobile.current.style.borderColor = "red";
                inputRefMobile.current.style.boxShadow = "0 0 10px #ea868f";
                setError(errorMessage);
                return;
            }

            summonerNameTag = mobileSummonerNameTag;
        } else {
            let summonerName = formData.get("summoner_name");
            let summonerTag = formData.get("summoner_tag");
            summonerNameTag = summonerName + "-" + summonerTag;
        }

        // Redirect to the "/summoner" route
        navigate(`/summoner/${region}/${summonerNameTag}`);
    };

    const handleCloseError = () => {
        setError(null);

        if (isMobile) {
            inputRefMobile.current.style.borderColor = "";
            inputRefMobile.current.style.boxShadow = "";
        }
    };

    return (
        <>
            {error && <ErrorPopup message={error} onClose={handleCloseError} />}
            <form
                className="container form-summoner d-flex flex-lg-row flex-column align-items-center justify-content-center mt-5"
                id="form-summoner"
                role="search"
                onSubmit={handleSubmit}>
                <div className="search-container d-flex flex-row">
                    <div className="form-floating me-1" bis_skin_checked="1">
                        <select
                            className="form-select"
                            id="region"
                            name="region"
                            aria-label="Region"
                            required>
                            {regions.map((region, index) => (
                                <option key={index} value={region}>
                                    {region}
                                </option>
                            ))}
                        </select>
                        <label htmlFor="region">Region</label>
                    </div>
                    {!isMobile && (
                        <div className="d-flex flex-row">
                            <div
                                className="form-floating form-desktop-name"
                                bis_skin_checked="1">
                                <input
                                    type="text"
                                    className="form-control rounded-start"
                                    id="floatingInputName"
                                    name="summoner_name"
                                    placeholder="Name"
                                    aria-label="Search Summoner Name"
                                    maxLength="16"
                                    required
                                />
                                <label htmlFor="floatingInputName">Name</label>
                            </div>
                            <div
                                className="form-floating form-desktop-tag"
                                bis_skin_checked="1">
                                <input
                                    type="text"
                                    className="form-control rounded-end"
                                    id="floatingInputTag"
                                    name="summoner_tag"
                                    placeholder="Tag"
                                    aria-label="Search Summoner Tag"
                                    maxLength="5"
                                    required
                                />
                                <label htmlFor="floatingInputTag">Tag</label>
                            </div>
                        </div>
                    )}
                    {isMobile && (
                        <div className="form-floating form-mobile" bis_skin_checked="1">
                            <input
                                ref={inputRefMobile}
                                type="text"
                                className="form-control rounded"
                                id="floatingInputNameTag"
                                name="summoner_name_tag"
                                placeholder="Name"
                                aria-label="Search Summoner Name"
                                maxLength="22"
                                required
                            />
                            <label htmlFor="floatingInputNameTag">Name + Tag</label>
                        </div>
                    )}
                </div>
                <button type="submit" className="btn fw-bold">
                    Submit
                </button>
            </form>
        </>
    );
}

export default SearchForm;
