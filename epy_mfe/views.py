from django.shortcuts import render
from django.views.decorators.csrf import ensure_csrf_cookie

# Create your views here.
@ensure_csrf_cookie
def index(req, **kwargs):
    return render(req, 'epy_mfe/index.html')

@ensure_csrf_cookie
def administracion(req, **kwargs):
    return render(req, 'epy_mfe/admin.html')