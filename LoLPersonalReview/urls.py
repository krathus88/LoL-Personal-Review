"""
URL configuration for LoLPersonalReview project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from home import views as home_views
from summoner import views as summoner_views

urlpatterns = [
    path('', home_views.home_page, name='home_page'),
    path('submit_summoner_header/', home_views.submit_summoner_header, name='submit_summoner_header'),
    path('submit_summoner/', home_views.submit_summoner, name='submit_summoner'),
    path('summoner/<region>/<summoner_name>-<summoner_tag>', summoner_views.summoner_detail, name='summoner_detail'),
    path('admin/', admin.site.urls),
]
