class RiotAPIException(Exception):
    """Custom exception for Riot API errors."""

    def __init__(self, status_code):
        super().__init__()
        self.status_code = status_code
