export const regions = [
    "EUW",
    "EUNE",
    "NA",
    "KR",
    "JP",
    "OCE",
    "BR",
    "LAS",
    "LAN",
    "RU",
    "TR",
    "SG",
    "PH",
    "TW",
    "VN",
    "TH",
];

export const dict_errors_riot_api = {
    400: "Bad request", // Bad request
    401: "Unauthorized", // Unauthorized
    403: "Have you renewed your API key?", // Forbidden
    404: "Summoner doesn't exist.", // Data not found
    405: "Method not allowed", // Method not allowed
    415: "Unsupported media type", // Unsupported media type
    429: "Rate limit exceeded", // Rate limit exceeded
    500: "Internal server error", // Internal server error
    502: "Bad gateway", // Bad gateway
    503: "Service unavailable", // Service unavailable
    504: "Gateway timeout", // Gateway timeout
};
