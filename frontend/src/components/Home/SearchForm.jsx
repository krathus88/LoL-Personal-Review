import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { regions } from "../../utils/constants";
import { getSummonerName } from "../../utils/functions";
import "./Home.css";

function SearchForm() {
    const navigate = useNavigate();

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
    }, [isMobile]); // Add isMobile to the dependency array

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Get form data
        const formData = new FormData(event.target);
        let region = formData.get("region");

        let summonerNameTag = "";

        if (isMobile) {
            summonerNameTag = getSummonerName(formData.get("summoner_name_tag"));
        } else {
            let summonerName = formData.get("summoner_name");
            let summonerTag = formData.get("summoner_tag");
            summonerNameTag = summonerName + "-" + summonerTag;
        }

        // Redirect to the "/summoner" route
        navigate(`/summoner/${region}/${summonerNameTag}`);
    };

    return (
        <form
            className="container form-summoner d-flex flex-lg-row flex-column align-items-center justify-content-center mt-5"
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
                        {regions.map((region) => (
                            <option key={region}>{region}</option>
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
    );
}

export default SearchForm;
