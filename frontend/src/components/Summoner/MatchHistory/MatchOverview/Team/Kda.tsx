type KdaProps = {
    kills: number;
    deaths: number;
    assists: number;
    killParticipation: number;
    kda: string;
};

export function Kda({ kills, deaths, assists, killParticipation, kda }: KdaProps) {
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
