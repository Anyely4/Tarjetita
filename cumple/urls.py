"""
URL configuration for cumple project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
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
from django.contrib.auth import views as auth_views
from . import views  # Asumiendo que views.py está en el mismo directorio
from django.views.generic import RedirectView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/', auth_views.LoginView.as_view(template_name='login.html'), name='login'),
    path('', RedirectView.as_view(url='login/', permanent=True)),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('inicio/', views.inicio, name='inicio'),
    path('', views.home, name='home'),
    path('galeria/', views.galeria, name='galeria'),
    path('carta/', views.carta, name='carta'),
]

