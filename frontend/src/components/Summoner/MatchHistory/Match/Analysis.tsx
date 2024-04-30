type AnalysisProps = {
    multiKill: string;
    perfRank: string;
};

export function Analysis({ multiKill, perfRank }: AnalysisProps) {
    return (
        <div className="col match-player-analysis pe-0">
            <div className="match-player-analysis-text-container d-flex flex-column gap-1">
                <small
                    className={`rounded-4 rank px-2 ${
                        perfRank === "ACE" ? "ace" : ""
                    } ${perfRank === "MVP" ? "mvp" : ""}`}>
                    {perfRank}
                </small>
                {multiKill && (
                    <small className="multikill rounded-4 px-2">{multiKill}</small>
                )}
            </div>
        </div>
    );
}
