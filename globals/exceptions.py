class RiotAPI(Exception):
    """Custom exception for Riot API errors."""

    def __init__(self, status_code):
        message = f"Riot API error: Status Code {status_code}"
        super().__init__(message)
        self.status_code = status_code
