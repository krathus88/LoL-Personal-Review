import ItemsIcon from "./ItemsIcon";

function Items(props) {
    return (
        <div className="col match-player-items">
            <div className="d-flex flex-row">
                <ItemsIcon itemSlot="1" itemUrl={props.items[0]} />
                <ItemsIcon itemSlot="2" itemUrl={props.items[1]} />
                <ItemsIcon itemSlot="3" itemUrl={props.items[2]} />
                <ItemsIcon itemSlot="7" itemUrl={props.items[6]} />
            </div>
            <div className="d-flex flex-row">
                <ItemsIcon itemSlot="4" itemUrl={props.items[3]} />
                <ItemsIcon itemSlot="5" itemUrl={props.items[4]} />
                <ItemsIcon itemSlot="6" itemUrl={props.items[5]} />
            </div>
        </div>
    );
}

export default Items;
