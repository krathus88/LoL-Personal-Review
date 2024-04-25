function Wards({ controlWards, wardsPlaced, wardsKilled }) {
    return (
        <>
            <div>
                <small className="text-nowrap">{controlWards}</small>
                <small className="text-nowrap">
                    {wardsPlaced} / {wardsKilled}
                </small>
            </div>
            <div className="label rounded">
                <small>Control Wards: {controlWards}</small>
                <small>Wards Placed: {wardsPlaced}</small>
                <small>Wards Killed: {wardsKilled}</small>
            </div>
        </>
    );
}

export default Wards;
