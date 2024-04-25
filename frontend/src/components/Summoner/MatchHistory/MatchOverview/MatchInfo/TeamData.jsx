import Baron from "./Baron";
import Dragon from "./Dragon";
import RiftHerald from "./RiftHerald";
import Voidgrubs from "./Voidgrubs";
import Towers from "./Towers";
import Inhibitors from "./Inhibitors";

function Teamobjectives({ team, objectives }) {
    return (
        <div className={`team-data ${team}`}>
            <ul>
                <li className="baron">
                    <Baron baron={objectives.baron} />
                    <div className="label rounded">
                        <small>Baron</small>
                    </div>
                </li>
                <li className="dragon">
                    <Dragon dragon={objectives.dragon} />
                    <div className="label rounded">
                        <small>Dragon</small>
                    </div>
                </li>
                <li className="rift-herald">
                    <RiftHerald riftHerald={objectives.riftHerald} />
                    <div className="label rounded">
                        <small>Rift Herald</small>
                    </div>
                </li>
                <li className="voidgrubs">
                    <Voidgrubs voidgrubs={objectives.voidgrubs} />
                    <div className="label rounded">
                        <small>Voidgrubs</small>
                    </div>
                </li>
                <li className="towers">
                    <Towers towers={objectives.towers} />
                    <div className="label rounded">
                        <small>Towers</small>
                    </div>
                </li>
                <li className="inhibitors">
                    <Inhibitors inhibitors={objectives.inhibitors} />
                    <div className="label rounded">
                        <small>Inhibitors</small>
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default Teamobjectives;
