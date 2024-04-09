import { useRouteError } from "react-router-dom";

function Errors() {
    const error = useRouteError();
    return (
        <div className="container col-6 pt-2 pb-3 rounded-4">
            <h1>{error.response.status}</h1>
            <hr />
            <p>{error.response.statusText}</p>
        </div>
    );
}

export default Errors;
