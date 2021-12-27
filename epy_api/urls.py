from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register('preguntas', views.PreguntaViewSet)
router.register('usuarios', views.UsuarioViewSet)
router.register('estudiantes', views.EstudianteViewSet)
router.register('profesores', views.ProfesorViewSet)
router.register('crear-sesion', views.SesionViewSet)
router.register('mensajes', views.MensajeViewSet)
router.register('mensajes-multimedia', views.MensajeMultimediaViewSet)
# router.register('archivos', views.ArchivoViewSet)
router.register('reportes', views.ReporteViewSet)

usuario_data_detail = views.UsuarioDataUpdateViewSet.as_view({
    'get': 'retrieve',
    'patch': 'partial_update'
})




urlpatterns = [
    path('', include(router.urls)),

    path('registro/', views.UsuarioCreate.as_view()),
    path('obtener-usuario/', views.UsuarioActual.as_view()),
    path('editar-usuario/<int:pk>', usuario_data_detail),

    # path('subir-archivo/', views.ArchivoListView.as_view())

    # path('crear-sesion/', views.SesionViewSet.as_view({
    #     'get': 'list',
    #     'post': 'create'
    # })),
    # path('crear-mensaje/', views.MensajeViewSet.as_view({
    #     'get': 'list',
    #     'post': 'create',
    # }))
]
