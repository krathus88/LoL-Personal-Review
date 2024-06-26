import { AxiosError } from "axios";
import { useRouteError } from "react-router-dom";
import { dict_errors_riot_api } from "../../utils/constants";

export function ErrorDetailed() {
    const error = useRouteError() as AxiosError;

    return (
        <>
            {error.response ? (
                <>
                    <h1>{error.response.status}</h1>
                    <hr />
                    <p>{error.response.statusText}</p>
                    <p>{dict_errors_riot_api[error.response.status]}</p>
                </>
            ) : (
                <p>Oops! Looks like something went wrong...</p>
            )}
        </>
    );
}
