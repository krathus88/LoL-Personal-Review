import { calculateCsPerMinute } from "../../../../../utils/functions";

type ItemsProps = {
    items: (string | null)[];
    damageDealt: number;
    damageDealtPercentage: number;
    damageTaken: number;
    damageTakenPercentage: number;
    cs: number;
    gameDuration: string;
};

export function Items({
    items,
    damageDealt,
    damageDealtPercentage,
    damageTaken,
    damageTakenPercentage,
    cs,
    gameDuration,
}: ItemsProps) {
    const csPerMin = calculateCsPerMinute(cs, gameDuration);

    return (
        <div>
            <div className="items-container">
                {items.map((item, itemIndex) => (
                    <div key={itemIndex} className="rounded">
                        {item && (
                            <img
                                className="user-select-none rounded"
                                src={item}
                                alt={`Item Slot ${itemIndex + 1}`}
                            />
                        )}
                    </div>
                ))}
            </div>
            <div className="damage-container">
                <div className="dealt col-5 text-center">
                    <div className="progress">
                        <div
                            className="fill"
                            style={{
                                width: `${damageDealtPercentage}%`,
                            }}></div>
                        <span>{damageDealt.toLocaleString("en-US")}</span>
                    </div>
                    <div className="label rounded">
                        <small>
                            Damage Dealt: {damageDealt.toLocaleString("en-US")}
                        </small>
                        <small>
                            Percentage (game): {damageDealtPercentage.toFixed(1)}%
                        </small>
                    </div>
                </div>
                <div className="taken col-5 text-center">
                    <div className="progress">
                        <div
                            className="fill"
                            style={{
                                width: `${damageTakenPercentage}%`,
                            }}></div>
                        <span className="w-1200">
                            {damageTaken.toLocaleString("en-US")}
                        </span>
                    </div>
                    <div className="label rounded">
                        <small>
                            Damage Taken: {damageTaken.toLocaleString("en-US")}
                        </small>
                        <small>
                            Percentage (game): {damageTakenPercentage.toFixed(1)}%
                        </small>
                    </div>
                </div>
            </div>
            <div className="cs-container">
                <small className="text-nowrap">
                    {cs} ({csPerMin}/m)
                </small>
                <div className="label rounded">
                    <small>CS: {cs}</small>
                    <small>CS per min: {csPerMin}</small>
                </div>
            </div>
        </div>
    );
}
