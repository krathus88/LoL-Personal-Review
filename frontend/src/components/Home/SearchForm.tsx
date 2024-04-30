import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectIsMobile } from "../../app/Slices/IsMobileSlice";
import { setProgress } from "../../app/Slices/ProgressSlice";
import { regions } from "../../utils/constants";
import { getSummonerName } from "../../utils/functions";
import { ErrorPopup } from "../Common/ErrorPopup";

export function SearchForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isMobile: boolean = useSelector(selectIsMobile);

    const inputRefMobile = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string | null>(null);

    // Closes error prompt if component unrenders
    useEffect(() => {
        return () => {
            handleCloseError();
        };
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        dispatch(setProgress(25));

        // Get form data
        const formData = new FormData(event.currentTarget);
        const region = formData.get("region") as string;

        let summonerNameTag: string;

        if (isMobile) {
            const { summonerNameTagFiltered, errorMessage } = getSummonerName(
                formData.get("summoner_name_tag") as string
            );

            console.log(summonerNameTagFiltered);

            if (errorMessage) {
                if (inputRefMobile.current) {
                    inputRefMobile.current.style.borderColor = "red";
                    inputRefMobile.current.style.boxShadow = "0 0 10px #ea868f";
                }
                setError(errorMessage);
                return;
            }

            summonerNameTag = summonerNameTagFiltered as string;
        } else {
            const summonerName = formData.get("summoner_name") as string;
            const summonerTag = formData.get("summoner_tag") as string;

            summonerNameTag = summonerName + "-" + summonerTag;
        }
        console.log(summonerNameTag);

        dispatch(setProgress(60));

        // Redirect to the "/summoner" route
        navigate(`/summoner/${region}/${summonerNameTag}`);
    };

    const handleCloseError = () => {
        setError(null);
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
                    <div className="form-floating me-1">
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
                            <div className="form-floating form-desktop-name">
                                <input
                                    type="text"
                                    className="form-control rounded-start"
                                    id="floatingInputName"
                                    name="summoner_name"
                                    placeholder="Name"
                                    aria-label="Search Summoner Name"
                                    maxLength={16}
                                    required
                                />
                                <label htmlFor="floatingInputName">Name</label>
                            </div>
                            <div className="form-floating form-desktop-tag">
                                <input
                                    type="text"
                                    className="form-control rounded-end"
                                    id="floatingInputTag"
                                    name="summoner_tag"
                                    placeholder="Tag"
                                    aria-label="Search Summoner Tag"
                                    maxLength={5}
                                    required
                                />
                                <label htmlFor="floatingInputTag">Tag</label>
                            </div>
                        </div>
                    )}
                    {isMobile && (
                        <div className="form-floating form-mobile">
                            <input
                                ref={inputRefMobile}
                                type="text"
                                className="form-control rounded"
                                id="floatingInputNameTag"
                                name="summoner_name_tag"
                                placeholder="Name"
                                aria-label="Search Summoner Name"
                                maxLength={22}
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
