import { useRouteError } from "react-router-dom";
import { dict_errors_riot_api } from "../../utils/constants";

function ErrorDetailed() {
    const error = useRouteError();

    return (
        <>
            {error.response ? (
                <>
                    <h1>{error.response.status}</h1>
                    <hr />
                    <p>{dict_errors_riot_api[error.response.status]}</p>
                </>
            ) : (
                <p>Oops! Looks like something went wrong...</p>
            )}
        </>
    );
}

export default ErrorDetailed;
