function ItemsIcon(props) {
    return (
        <div className="match-player-item-container rounded">
            {props.itemUrl && (
                <img
                    className="match-player-item user-select-none rounded"
                    src={props.itemUrl}
                    alt={`Item Slot ${props.itemSlot}`}
                />
            )}
        </div>
    );
}

export default ItemsIcon;
