
# views.py
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required

def home(request):
    # Redirige a inicio si ya está autenticado
    if request.user.is_authenticated:
        return redirect('inicio')
    return redirect('login')

@login_required
def inicio(request):
    return render(request, 'inicio.html')

@login_required
def galeria(request):
    return render(request, 'galeria.html')

@login_required
def carta(request):
    return render(request, 'carta.html')
