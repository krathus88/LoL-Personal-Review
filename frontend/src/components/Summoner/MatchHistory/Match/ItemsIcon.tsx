type ItemsIconProps = {
    itemSlot: string;
    itemUrl: string | null;
};

export function ItemsIcon({ itemSlot, itemUrl }: ItemsIconProps) {
    return (
        <div className="match-player-item-container rounded">
            {itemUrl && (
                <img
                    className="match-player-item user-select-none rounded"
                    src={itemUrl}
                    alt={`Item Slot ${itemSlot}`}
                />
            )}
        </div>
    );
}
