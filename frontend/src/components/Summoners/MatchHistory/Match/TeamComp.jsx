import TeamCompIcon from "./TeamCompIcon";

function TeamComp(props) {
    return (
        <div className="col match-team-comp">
            <div className="d-flex flex-row mx-0">
                <TeamCompIcon champ={props.playerChamps[0]} />
                <TeamCompIcon champ={props.playerChamps[1]} />
                <TeamCompIcon champ={props.playerChamps[2]} />
                <TeamCompIcon champ={props.playerChamps[3]} />
                <TeamCompIcon champ={props.playerChamps[4]} />
            </div>
            <div className="d-flex flex-row mx-0">
                <TeamCompIcon champ={props.playerChamps[5]} />
                <TeamCompIcon champ={props.playerChamps[6]} />
                <TeamCompIcon champ={props.playerChamps[7]} />
                <TeamCompIcon champ={props.playerChamps[8]} />
                <TeamCompIcon champ={props.playerChamps[9]} />
            </div>
        </div>
    );
}

export default TeamComp;
