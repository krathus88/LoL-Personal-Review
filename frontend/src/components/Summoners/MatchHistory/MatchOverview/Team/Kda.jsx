function Kda({ kills, deaths, assists, killParticipation, kda }) {
    return (
        <div>
            <small className="k-d-a text-nowrap">
                {kills}/<span className="font-color-defeat">{deaths}</span>/{assists} (
                {killParticipation}%)
            </small>
            <small className="text-nowrap fw-bold">{kda}</small>
        </div>
    );
}

export default Kda;
