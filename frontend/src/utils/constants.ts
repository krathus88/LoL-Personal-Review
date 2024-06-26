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

type RiotErrorDict = {
    [statusCode: number]: string;
};

export const dict_errors_riot_api: RiotErrorDict = {
    400: "Bad request", // Bad request
    401: "Unauthorized", // Unauthorized
    403: "Have you renewed your API key?", // Forbidden
    404: "Summoner doesn't exist.", // Data not found
    405: "Method Not Allowed", // Method not allowed
    415: "Unsupported Media Type", // Unsupported media type
    429: "Rate Limit Exceeded", // Rate limit exceeded
    500: "Did you turn on your backend server?", // Internal server error
    502: "Bad Gateway", // Bad gateway
    503: "Service Unavailable", // Service unavailable
    504: "Gateway Timeout", // Gateway timeout
};
