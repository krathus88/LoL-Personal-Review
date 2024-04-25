function Decoration({ team, win, gameDuration }) {
    const gameDurationMinutes = parseInt(gameDuration.match(/\d+m/));

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

export default Decoration;
