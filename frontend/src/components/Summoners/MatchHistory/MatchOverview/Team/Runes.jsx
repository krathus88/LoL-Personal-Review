export function Runes({ primaryRune, secondaryRune }) {
    return (
        <div>
            <img
                className="rounded-5"
                src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/${primaryRune}`}
                alt="Primary Rune"></img>
            <img
                src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/${secondaryRune}`}
                alt="Secondary Rune"></img>
        </div>
    );
}
export default Runes;
