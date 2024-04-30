import { ItemsIcon } from "./ItemsIcon";

type ItemsProps = {
    items: (string | null)[];
};

export function Items({ items }: ItemsProps) {
    return (
        <div className="col match-player-items">
            <div className="d-flex flex-row">
                <ItemsIcon itemSlot="1" itemUrl={items[0]} />
                <ItemsIcon itemSlot="2" itemUrl={items[1]} />
                <ItemsIcon itemSlot="3" itemUrl={items[2]} />
                <ItemsIcon itemSlot="7" itemUrl={items[6]} />
            </div>
            <div className="d-flex flex-row">
                <ItemsIcon itemSlot="4" itemUrl={items[3]} />
                <ItemsIcon itemSlot="5" itemUrl={items[4]} />
                <ItemsIcon itemSlot="6" itemUrl={items[5]} />
            </div>
        </div>
    );
}
