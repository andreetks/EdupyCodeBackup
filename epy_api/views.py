from rest_framework import permissions, viewsets, generics, views
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.parsers import MultiPartParser, FileUploadParser, FormParser

from .models import Pregunta, User, Estudiante, Profesor, Sesion, Mensaje, Reporte
from .serializers import *
from .permissions import (
    IsAuthorOrReadOnly,
    IsOwnerProfileOrReadOnly as IsOwnerUserOrReadOnly,
    IsSameUserOrReadOnly,
)


@api_view(["GET"])
def api_root(request, format=None):
    return Response(
        {
            "usuarios": reverse("lista-usuarios", request=request, format=format),
            "preguntas": reverse("lista-preguntas", request=request, format=format),
        }
    )


# Create your views here.
class PreguntaViewSet(viewsets.ModelViewSet):
    """
    El ViewSet provee vista de lista y detalle, operaciones CUD.
    """

    queryset = Pregunta.objects.all()
    serializer_class = PreguntaSerializer
    # parser_classes = [MultiPartParser]
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def perform_create(self, serializer):
        serializer.save(autor=self.request.user)


class UsuarioViewSet(viewsets.ReadOnlyModelViewSet):
    """
    El ViewSet provee vista de lista y de detalle.
    """

    queryset = User.objects.all()
    serializer_class = UsuarioSerializer
    permission_classes = [permissions.AllowAny]


class UsuarioCreate(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UsuarioCreateSerializer
    permission_classes = [permissions.AllowAny]


class UsuarioActual(views.APIView):
    def get(self, req):
        serializer = UsuarioSerializer(req.user)
        return Response(serializer.data)


class EstudianteViewSet(viewsets.ModelViewSet):
    queryset = Estudiante.objects.all()
    serializer_class = EstudianteSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerUserOrReadOnly]


class ProfesorViewSet(viewsets.ModelViewSet):
    queryset = Profesor.objects.all()
    serializer_class = ProfesorSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerUserOrReadOnly]


class UsuarioDataUpdateViewSet(viewsets.ModelViewSet):
    """
    Provides update methods to user data.
    """

    queryset = User.objects.all()
    serializer_class = TipoUsuarioSerializer
    permission_classes = [
        permissions.IsAuthenticated,
        # IsSameUserOrReadOnly
    ]


class SesionViewSet(viewsets.ModelViewSet):
    queryset = Sesion.objects.all()
    serializer_class = SesionSerializer
    permission_classes = [
        permissions.IsAuthenticated,
    ]


class MensajeViewSet(viewsets.ModelViewSet):
    queryset = Mensaje.objects.all()
    serializer_class = MensajeSerializer
    # parser_classes = [MultiPartParser, FormParser]
    permission_classes = [
        permissions.IsAuthenticated,
    ]


class MensajeMultimediaViewSet(viewsets.ModelViewSet):
    queryset = MensajeMultimedia.objects.all()
    serializer_class = MensajeMultimediaSerializer
    permission_classes = [
        permissions.IsAuthenticated,
    ]


class ReporteViewSet(viewsets.ModelViewSet):
    queryset = Reporte.objects.all()
    serializer_class = ReporteSerializer
