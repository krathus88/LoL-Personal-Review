import React from "react";

function ItemsIcon(props) {
    return (
        <div className="match-player-item-container rounded">
            <img
                className="match-player-item rounded"
                src="https://raw.communitydragon.org/14.6/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/1001_class_t1_bootsofspeed.png"
                alt={`Item Slot ${props.itemId}`}
            />
        </div>
    );
}

export default ItemsIcon;
