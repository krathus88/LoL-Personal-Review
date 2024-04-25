function Damage({
    damageDealt,
    damageDealtPercentage,
    damageTaken,
    damageTakenPercentage,
}) {
    return (
        <div>
            <div className="dealt col-5 text-center">
                <small className="text-nowrap">
                    {damageDealt.toLocaleString("en-US")}
                </small>
                <div className="progress">
                    <div
                        className="fill"
                        style={{
                            width: `${damageDealtPercentage}%`,
                        }}></div>
                    <span className="w-1200">
                        {damageDealt.toLocaleString("en-US")}
                    </span>
                </div>
            </div>
            <div className="taken col-5 text-center">
                <small className="text-nowrap">
                    {damageTaken.toLocaleString("en-US")}
                </small>
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
    );
}

export default Damage;
