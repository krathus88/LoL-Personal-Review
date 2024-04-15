import { useRouteError } from "react-router-dom";
import { dict_errors_riot_api } from "../../utils/constants";

function ErrorDetailed() {
    const error = useRouteError();

    // Set custom statusText if written
    const statusText =
        dict_errors_riot_api[error.response.status] !== error.response.statusText
            ? dict_errors_riot_api[error.response.status]
            : null;

    return (
        <>
            {error.response ? (
                <>
                    <h1>{error.response.status}</h1>
                    <hr />
                    <p>{error.response.statusText}</p>
                    <p>{statusText}</p>
                </>
            ) : (
                <p>Oops! Looks like something went wrong...</p>
            )}
        </>
    );
}

export default ErrorDetailed;
