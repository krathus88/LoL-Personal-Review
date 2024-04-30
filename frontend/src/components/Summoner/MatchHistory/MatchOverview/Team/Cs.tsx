import { calculateCsPerMinute } from "../../../../../utils/functions";

type CsProps = {
    cs: number;
    gameDuration: string;
};

export function Cs({ cs, gameDuration }: CsProps) {
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
