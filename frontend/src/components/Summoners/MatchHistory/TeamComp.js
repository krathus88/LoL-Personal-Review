import React from "react";
import TeamCompIcon from "./TeamCompIcon";

function TeamComp() {
    return (
        <div className="col match-team-comp">
            <div className="d-flex flex-row mx-0">
                <TeamCompIcon champId="1" />
                <TeamCompIcon champId="2" />
                <TeamCompIcon champId="3" />
                <TeamCompIcon champId="4" />
                <TeamCompIcon champId="5" />
            </div>
            <div className="d-flex flex-row mx-0">
                <TeamCompIcon champId="6" />
                <TeamCompIcon champId="7" />
                <TeamCompIcon champId="8" />
                <TeamCompIcon champId="9" />
                <TeamCompIcon champId="10" />
            </div>
        </div>
    );
}

export default TeamComp;
