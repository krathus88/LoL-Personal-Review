import type { MatchObjectivesType } from "../../../../../types/matchTypes";
import { Baron } from "./Baron";
import { Dragon } from "./Dragon";
import { Inhibitors } from "./Inhibitors";
import { RiftHerald } from "./RiftHerald";
import { Towers } from "./Towers";
import { Voidgrubs } from "./Voidgrubs";

type TeamObjectivesProps = {
    team: string;
    objectives: MatchObjectivesType;
};

export function TeamObjectives({ team, objectives }: TeamObjectivesProps) {
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
