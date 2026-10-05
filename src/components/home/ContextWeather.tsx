import { SITE } from "../../data/site";

interface WeatherData {
    temperature: number;
    description: string;
}

const WMO_WEATHER_CODES: Record<number, string> = {
    0: "Céu limpo",
    1: "Predomínio de sol",
    2: "Parcialmente nublado",
    3: "Nublado",
    45: "Nevoeiro",
    48: "Nevoeiro",
    51: "Garoa leve",
    53: "Garoa moderada",
    55: "Garoa densa",
    61: "Chuva fraca",
    63: "Chuva moderada",
    65: "Chuva forte",
    80: "Pancadas de chuva",
    81: "Pancadas de chuva",
    82: "Chuva torrencial",
    95: "Trovoada",
    96: "Tempestade com granizo",
    99: "Tempestade com granizo",
};

async function getJaguariunaWeather(): Promise<WeatherData | null> {
    try {
        const timezone = encodeURIComponent(SITE.location.timeZone);
        const res = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=-22.70&longitude=-46.99&current=temperature_2m,weather_code&timezone=${timezone}`,
            { next: { revalidate: 900 } },
        );

        if (!res.ok) {
            return null;
        }

        const data = await res.json();
        const temp = Math.round(data?.current?.temperature_2m);
        const code = data?.current?.weather_code;
        const description = WMO_WEATHER_CODES[code] ?? "Tempo estável";

        if (isNaN(temp)) {
            return null;
        }

        return {
            temperature: temp,
            description,
        };
    } catch {
        return null;
    }
}

export async function ContextWeather() {
    const weather = await getJaguariunaWeather();

    return (
        <div className="flex items-center gap-2 text-meta text-ink-3">
            <span className="text-ink-2 font-medium">
                {SITE.location.city}, {SITE.location.region}
            </span>
            <span>·</span>
            {weather ? (
                <>
                    <span className="tabular">{weather.temperature}°C</span>
                    <span>·</span>
                    <span>{weather.description}</span>
                </>
            ) : (
                <span>{SITE.location.timeZoneLabel}</span>
            )}
        </div>
    );
}
