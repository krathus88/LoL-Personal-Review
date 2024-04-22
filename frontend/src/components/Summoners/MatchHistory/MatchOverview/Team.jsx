function Team(props) {
    return (
        <table className={`${props.team}`}>
            <colgroup>
                <col width="44" />
                <col width="18" />
                <col width="18" />
                <col className="name" />
                <col className="score" />
                <col className="kda" />
                <col className="damage" />
                <col className="wards" />
                <col className="cs" />
                <col className="items" />
            </colgroup>
            <tbody>
                <tr className="overview-player fw-light">
                    <td className="champion ps-2">
                        <div className="img-container">
                            <img
                                className="rounded-4"
                                src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/1.png`}
                                alt="champion name"></img>
                            <div className="level">11</div>
                        </div>
                    </td>
                    <td className="spells">
                        <div>
                            <img
                                className="rounded"
                                src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/summoner_smite.png`}
                                alt="Summoner Spell 1"></img>
                            <img
                                className="rounded"
                                src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/summoner_flash.png`}
                                alt="champion name"></img>
                        </div>
                    </td>
                    <td className="runes">
                        <div>
                            <img
                                className="rounded-5"
                                src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1//perk-images/styles/precision/conqueror/conqueror.png`}
                                alt="Primary Rune"></img>
                            <img
                                src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1//perk-images/styles/7203_whimsy.png`}
                                alt="Secondary Rune"></img>
                        </div>
                    </td>
                    <td className="name">
                        <div className="truncate">
                            <div>
                                <small>
                                    <span className="tier w-1300 rounded">GM</span>{" "}
                                    Kräthus <span className="summoner-tag">#EUW</span>
                                </small>
                                <small className="tier">Challenger</small>
                                <small className="w-1300">
                                    16/10/12 <span className="fw-bold">22.00:1</span>
                                </small>
                            </div>
                        </div>
                    </td>
                    <td className="score pe-1">
                        <div>
                            <small className="score fw-normal">8.9</small>
                            <small className="rank rounded-4">MVP</small>
                        </div>
                    </td>
                    <td className="kda pe-1">
                        <div>
                            <small className="k-d-a text-nowrap">16/10/12 (100%)</small>
                            <small className="text-nowrap fw-bold">7.00:1</small>
                        </div>
                    </td>
                    <td className="damage pe-1">
                        <div>
                            <div className="dealt col-5 text-center">
                                <small className="text-nowrap">999,999</small>
                                <div className="progress">
                                    <div
                                        className="fill"
                                        style={{ width: "87%" }}></div>
                                    <span className="w-1200">999,999</span>
                                </div>
                            </div>
                            <div className="taken col-5 text-center">
                                <small className="text-nowrap">999,999</small>
                                <div className="progress">
                                    <div
                                        className="fill"
                                        style={{ width: "37%" }}></div>
                                    <span className="w-1200">999,999</span>
                                </div>
                            </div>
                        </div>
                    </td>
                    <td className="wards pe-1">
                        <div>
                            <small className="text-nowrap">99</small>
                            <small className="text-nowrap">999/999</small>
                        </div>
                    </td>
                    <td className="cs pe-1">
                        <div>
                            <small className="text-nowrap">9999</small>
                            <small className="text-nowrap">12.0/m</small>
                        </div>
                    </td>
                    <td className="items pe-2">
                        <div>
                            <div className="items-container">
                                <div className="rounded">
                                    <img
                                        className="user-select-none rounded"
                                        src="https://raw.communitydragon.org/14.8/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/3006_class_t2_berserkersgreaves.png"
                                        alt="Item Slot 1"
                                    />
                                </div>
                                <div className="rounded">
                                    <img
                                        className="user-select-none rounded"
                                        src="https://raw.communitydragon.org/14.8/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/3006_class_t2_berserkersgreaves.png"
                                        alt="Item Slot 2"
                                    />
                                </div>
                                <div className="rounded">
                                    <img
                                        className="user-select-none rounded"
                                        src="https://raw.communitydragon.org/14.8/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/3006_class_t2_berserkersgreaves.png"
                                        alt="Item Slot 3"
                                    />
                                </div>
                                <div className="rounded">
                                    <img
                                        className="user-select-none rounded"
                                        src="https://raw.communitydragon.org/14.8/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/3006_class_t2_berserkersgreaves.png"
                                        alt="Item Slot 4"
                                    />
                                </div>
                                <div className="rounded">
                                    <img
                                        className="user-select-none rounded"
                                        src="https://raw.communitydragon.org/14.8/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/3006_class_t2_berserkersgreaves.png"
                                        alt="Item Slot 5"
                                    />
                                </div>
                                <div className="rounded">
                                    <img
                                        className="user-select-none rounded"
                                        src="https://raw.communitydragon.org/14.8/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/3006_class_t2_berserkersgreaves.png"
                                        alt="Item Slot 6"
                                    />
                                </div>
                                <div className="rounded">
                                    <img
                                        className="user-select-none rounded"
                                        src="https://raw.communitydragon.org/14.8/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/3006_class_t2_berserkersgreaves.png"
                                        alt="Item Slot 7"
                                    />
                                </div>
                            </div>
                            <div className="damage-container">
                                <div className="dealt col-5 text-center">
                                    <div className="progress">
                                        <div
                                            className="fill"
                                            style={{ width: "87%" }}></div>
                                        <span>999,999</span>
                                    </div>
                                </div>
                                <div className="taken col-5 text-center">
                                    <div className="progress">
                                        <div
                                            className="fill"
                                            style={{ width: "37%" }}></div>
                                        <span className="w-1200">999,999</span>
                                    </div>
                                </div>
                            </div>
                            <div className="cs-container">
                                <small className="text-nowrap">9999 (12.0/m)</small>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    );
}

export default Team;
