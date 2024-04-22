import TeamCompIcon from "./TeamCompIcon";

function TeamComp(props) {
    return (
        <div className="col match-team-comp">
            <div className="d-flex flex-row mx-0">
                <TeamCompIcon player={props.player[0]} />
                <TeamCompIcon player={props.player[1]} />
                <TeamCompIcon player={props.player[2]} />
                <TeamCompIcon player={props.player[3]} />
                <TeamCompIcon player={props.player[4]} />
            </div>
            <div className="d-flex flex-row mx-0">
                <TeamCompIcon player={props.player[5]} />
                <TeamCompIcon player={props.player[6]} />
                <TeamCompIcon player={props.player[7]} />
                <TeamCompIcon player={props.player[8]} />
                <TeamCompIcon player={props.player[9]} />
            </div>
        </div>
    );
}

export default TeamComp;
