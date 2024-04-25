function Wards({ controlWards, wardsPlaced, wardsKilled }) {
    return (
        <div>
            <small className="text-nowrap">{controlWards}</small>
            <small className="text-nowrap">
                {wardsPlaced} / {wardsKilled}
            </small>
        </div>
    );
}

export default Wards;
