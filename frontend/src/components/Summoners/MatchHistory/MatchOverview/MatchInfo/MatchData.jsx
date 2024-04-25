function MatchData({ win, overallInfo }) {
    return (
        <div className="match-data">
            <small className="fw-bold">
                <span
                    className={win === "blue" ? "font-color-win" : "font-color-defeat"}>
                    {overallInfo[0].kills}
                </span>
                <span className="fw-normal">&nbsp;vs&nbsp;</span>
                <span
                    className={win === "red" ? "font-color-win" : "font-color-defeat"}>
                    {overallInfo[1].kills}
                </span>
            </small>
            <div className="progress">
                <div>
                    <small>{overallInfo[0].gold.toLocaleString("en-US")}</small>
                    <small>Total Gold</small>
                    <small>{overallInfo[1].gold.toLocaleString("en-US")}</small>
                </div>
                <span style={{ width: "35%" }}></span>
            </div>
        </div>
    );
}

export default MatchData;
