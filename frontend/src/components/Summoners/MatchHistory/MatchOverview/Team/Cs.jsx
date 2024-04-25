import { calculateCsPerMinute } from "../../../../../utils/functions";

function Cs({ cs, gameDuration }) {
    return (
        <div>
            <small className="text-nowrap">{cs}</small>
            <small className="text-nowrap">
                {calculateCsPerMinute(cs, gameDuration)}
                /m
            </small>
        </div>
    );
}

export default Cs;
