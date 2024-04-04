import React from "react";
import ItemsIcon from "./ItemsIcon";

function Items() {
    return (
        <div className="col match-player-items">
            <div className="d-flex flex-row">
                <ItemsIcon itemId="1" />
                <ItemsIcon itemId="2" />
                <ItemsIcon itemId="3" />
                <ItemsIcon itemId="7" />
            </div>
            <div className="d-flex flex-row">
                <ItemsIcon itemId="4" />
                <ItemsIcon itemId="5" />
                <ItemsIcon itemId="6" />
            </div>
        </div>
    );
}

export default Items;
