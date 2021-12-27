from rest_framework import serializers

from .models import (
    Pregunta,
    User,
    Estudiante,
    Profesor,
    Sesion,
    Mensaje,
    MensajeMultimedia,
    Reporte,
)


class UsuarioSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "first_name",
            "last_name",
            "is_estudiante",
            "is_profesor",
            "is_admin",
            "url_foto",
        ]


class UsuarioMiniSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "first_name", "last_name", "url_foto"]


class TipoUsuarioSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField()

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "first_name",
            "last_name",
            "valoracion",
            "tarifa",
            "url_foto",
        ]


class UsuarioCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "first_name",
            "last_name",
            "username",
            "password",
            "is_estudiante",
            "is_profesor",
            "is_admin",
        ]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = User(**validated_data)
        user.set_password(password)
        user.save()

        if validated_data.pop("is_estudiante"):
            estudiante = Estudiante.objects.create(usuario=user)
            estudiante.save()
        elif validated_data.pop("is_profesor"):
            profesor = Profesor.objects.create(usuario=user)
            profesor.save()

        return user


class EstudianteSerializer(serializers.ModelSerializer):
    usuario = TipoUsuarioSerializer()

    class Meta:
        model = Estudiante
        fields = "__all__"


class ProfesorSerializer(serializers.ModelSerializer):
    usuario = TipoUsuarioSerializer()

    class Meta:
        model = Profesor
        fields = "__all__"


class PreguntaSerializer(serializers.ModelSerializer):
    autor = UsuarioSerializer(read_only=True)

    class Meta:
        model = Pregunta
        fields = "__all__"


class SesionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sesion
        fields = "__all__"

    def create(self, validated_data):
        participantes = validated_data.pop("participantes")

        instance = Sesion.objects.create(**validated_data)
        for participante in participantes:
            instance.participantes.add(participante)

        return instance

    def to_representation(self, instance):
        representation = super(SesionSerializer, self).to_representation(instance)
        representation["participantes"] = TipoUsuarioSerializer(
            instance.participantes.all(), many=True
        ).data
        return representation


class SesionMiniSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sesion
        fields = ["id", "id_key", "asunto"]


class MensajeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mensaje
        fields = "__all__"

    def to_representation(self, instance):
        representation = super(MensajeSerializer, self).to_representation(instance)
        representation["autor"] = UsuarioMiniSerializer(instance.autor).data
        representation["sesion"] = SesionMiniSerializer(instance.sesion).data
        return representation


class MensajeMultimediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = MensajeMultimedia
        fields = "__all__"

    def to_representation(self, instance):
        representation = super(MensajeMultimediaSerializer, self).to_representation(
            instance
        )
        representation["autor"] = UsuarioMiniSerializer(instance.autor).data
        representation["sesion"] = SesionMiniSerializer(instance.sesion).data
        return representation


class ReporteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reporte
        fields = "__all__"

    def to_representation(self, instance):
        representation = super(ReporteSerializer, self).to_representation(instance)
        representation["han_aprobado"] = UsuarioMiniSerializer(
            instance.han_aprobado.all(), many=True
        ).data
        representation["han_rechazado"] = UsuarioMiniSerializer(
            instance.han_rechazado.all(), many=True
        ).data
        return representation
