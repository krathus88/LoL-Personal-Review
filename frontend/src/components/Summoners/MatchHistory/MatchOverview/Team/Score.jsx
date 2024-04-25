function Score({ performanceScore, performanceRanking }) {
    return (
        <div>
            <small className="score text-center fw-normal">{performanceScore}</small>
            <small
                className={`rank text-center rounded-4 ${
                    performanceRanking === "ACE" ? "ace" : ""
                } ${performanceRanking === "MVP" ? "mvp" : ""}`}>
                {performanceRanking}
            </small>
        </div>
    );
}

export default Score;
