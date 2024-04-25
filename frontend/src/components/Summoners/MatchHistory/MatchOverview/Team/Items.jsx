import { calculateCsPerMinute } from "../../../../../utils/functions";

function Items({
    items,
    damageDealt,
    damageDealtPercentage,
    damageTaken,
    damageTakenPercentage,
    cs,
    gameDuration,
}) {
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
                </div>
            </div>
            <div className="cs-container">
                <small className="text-nowrap">
                    {cs} ({calculateCsPerMinute(cs, gameDuration)}
                    /m)
                </small>
            </div>
        </div>
    );
}

export default Items;
