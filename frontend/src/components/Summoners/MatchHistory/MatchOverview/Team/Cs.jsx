import { calculateCsPerMinute } from "../../../../../utils/functions";

function Cs({ cs, gameDuration }) {
    const csPerMin = calculateCsPerMinute(cs, gameDuration);

    return (
        <>
            <div>
                <small className="text-nowrap">{cs}</small>
                <small className="text-nowrap">{csPerMin}/m</small>
            </div>
            <div className="label rounded">
                <small>CS: {cs}</small>
                <small>CS per min: {csPerMin}</small>
            </div>
        </>
    );
}

export default Cs;
