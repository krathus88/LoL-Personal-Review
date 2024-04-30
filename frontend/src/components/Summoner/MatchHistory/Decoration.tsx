type DecorationProps = {
    team?: string;
    win: boolean;
    gameDuration: string;
};

export function Decoration({ team, win, gameDuration }: DecorationProps) {
    const matchResult = gameDuration.match(/\d+m/);
    const gameDurationMinutes = matchResult ? parseInt(matchResult[0]) : 0;

    return (
        <div
            className={`decoration ${team ? `${team} ` : ""} ${
                gameDurationMinutes < 4
                    ? "decoration-remake"
                    : win
                    ? "decoration-win"
                    : "decoration-defeat"
            }`}></div>
    );
}
