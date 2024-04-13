import { useRouteError } from "react-router-dom";

function Errors() {
    const error = useRouteError();
    console.log(error);
    return (
        <div className="container col-6 pt-2 pb-3 rounded-4">
            {error.response ? (
                <>
                    <h1>{error.response.status}</h1>
                    <hr />
                    <p>{error.response.statusText}</p>
                </>
            ) : (
                <p>Oops! Looks like something went wrong...</p>
            )}
        </div>
    );
}

export default Errors;
