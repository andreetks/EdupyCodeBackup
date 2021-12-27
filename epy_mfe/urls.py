from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('registro', views.index),
    path('perfil', views.index),
    path('inicio', views.index),
    path('sobre-nosotros', views.index),
    path('ayuda', views.index),
    path('editar-perfil', views.index),
    path('chats', views.index),
    path('chat/<str:id_key>', views.index),
    path('busqueda', views.index),
    path('reporte', views.index),

    path('administracion', views.administracion),
    path('administracion/reportes', views.administracion),
    path('administracion/preguntas', views.administracion),
    path('administracion/usuarios', views.administracion),
    path('administracion/sesiones', views.administracion),
]