import React from "react";

function ItemsIcon(props) {
    return (
        <div className="match-player-item-container rounded">
            {props.itemUrl && (
                <img
                    className="match-player-item rounded"
                    src={props.itemUrl}
                    alt={`Item Slot ${props.itemSlot}`}
                />
            )}
        </div>
    );
}

export default ItemsIcon;
