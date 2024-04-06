import React from "react";
import ItemsIcon from "./ItemsIcon";

function Items(props) {
    return (
        <div className="col match-player-items">
            <div className="d-flex flex-row">
                <ItemsIcon itemSlot="1" itemUrl={props.items.item1} />
                <ItemsIcon itemSlot="2" itemUrl={props.items.item2} />
                <ItemsIcon itemSlot="3" itemUrl={props.items.item3} />
                <ItemsIcon itemSlot="7" itemUrl={props.items.item7} />
            </div>
            <div className="d-flex flex-row">
                <ItemsIcon itemSlot="4" itemUrl={props.items.item4} />
                <ItemsIcon itemSlot="5" itemUrl={props.items.item5} />
                <ItemsIcon itemSlot="6" itemUrl={props.items.item6} />
            </div>
        </div>
    );
}

export default Items;
