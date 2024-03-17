from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.views.decorators.http import require_POST


def home_page(request):
    message = request.session.pop('message', None)  # Retrieve and remove message from session
    return render(request, "landingPage.html", {'message': message})


@require_POST
def submit_summoner_name(request):
    summoner_name = request.POST.get('summoner_name')
    print("summoner_name:" + summoner_name)
    if summoner_name:
        message = f"Summoner name = {summoner_name}"
    else:
        message = 'Invalid request method'
    request.session['message'] = message
    return redirect('home_page')