import TeamData from "./TeamData";

function MatchInfo(props) {
    return (
        <div className="separator">
            <TeamData team="blue" data={props.overallInfo[0]} />
            <div className="match-data">
                <small className="fw-bold">
                    <span
                        className={
                            props.win === "blue"
                                ? "font-color-win"
                                : "font-color-defeat"
                        }>
                        {props.overallInfo[0].kills}
                    </span>
                    <span className="fw-normal">&nbsp;vs&nbsp;</span>
                    <span
                        className={
                            props.win === "red" ? "font-color-win" : "font-color-defeat"
                        }>
                        {props.overallInfo[1].kills}
                    </span>
                </small>
                <div className="progress">
                    <div>
                        <small>
                            {props.overallInfo[0].gold.toLocaleString("en-US")}
                        </small>
                        <small>Total Gold</small>
                        <small>
                            {props.overallInfo[1].gold.toLocaleString("en-US")}
                        </small>
                    </div>
                    <span style={{ width: "35%" }}></span>
                </div>
            </div>
            <TeamData team="red" data={props.overallInfo[1]} />
        </div>
    );
}

export default MatchInfo;
