import "./Error.css";
import { ErrorDetailed } from "./ErrorDetailed";

export function Error() {
    return (
        <div className="container col-6 rounded-4" id="errorContainer">
            <ErrorDetailed />
        </div>
    );
}
