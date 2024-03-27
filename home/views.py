from django.shortcuts import render, redirect


def home_page(request):
    return render(request, "landingPage.html")


def submit_summoner(request):
    if request.method == "GET":
        region = request.GET["region"]
        summoner_name = request.GET["summoner_name"]
        summoner_tag = request.GET["summoner_tag"]
        return redirect(
            "summoner_detail",
            region=region,
            summoner_name=summoner_name,
            summoner_tag=summoner_tag,
        )


def submit_summoner_header(request):
    if request.method == "GET":
        region = request.GET["region"]
        summoner_name_tag = request.GET["summoner_name"]

        # there is more than one # in summoner name
        if summoner_name_tag.count("#") > 1:
            return redirect("home_page")

        # there is no # in summoner name
        if summoner_name_tag.find("#") == -1:
            return redirect("home_page")
        summoner_name, summoner_tag = summoner_name_tag.split("#")

        # there is no summoner tag
        if len(summoner_tag) == 0:
            return redirect("home_page")

        return redirect(
            "summoner_detail",
            region=region,
            summoner_name=summoner_name,
            summoner_tag=summoner_tag,
        )
