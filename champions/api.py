from ninja import Router

router = Router()


@router.put("/stats")
def gather_champion_stats(request, on: bool):
    # criar / matar a thread crawler

    return
