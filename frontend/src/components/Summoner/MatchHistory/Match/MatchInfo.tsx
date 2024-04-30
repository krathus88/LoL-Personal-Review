type MatchInfoProps = {
    gameMode: string;
    gameEnd: string;
    gameDuration: string;
};

export function MatchInfo({ gameMode, gameEnd, gameDuration }: MatchInfoProps) {
    return (
        <div className="d-flex flex-column match-info ps-0">
            <p className="truncate">{gameMode}</p>
            <small className="truncate fw-light">{gameEnd} ago</small>
            <hr />
            <small className="truncate fw-light">{gameDuration}</small>
        </div>
    );
}
