from django.urls import path

from . import views

urlpatterns = [
    path('about/', views.about_view, name = "about"),
    path('telegram/', views.telegram_view, name = "telegram"),
]
