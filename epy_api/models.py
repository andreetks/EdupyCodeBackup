import os
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.dispatch import receiver

# Create your models here.
class User(AbstractUser):
    is_estudiante = models.BooleanField(default=False)
    is_profesor = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    valoracion = models.FloatField(default=10)
    tarifa = models.DecimalField(max_digits=8, decimal_places=2, default=0.01)
    url_foto = models.URLField(default="https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg")

class Pregunta(models.Model):
    fecha = models.DateTimeField(auto_now_add=True)
    titulo = models.CharField(max_length=64)
    descripcion = models.TextField()
    editada = models.BooleanField(default=False)
    autor = models.ForeignKey(
        User, related_name="preguntas_publicadas", on_delete=models.CASCADE
    )

    class Meta:
        ordering = ["-fecha"]


class Estudiante(models.Model):
    usuario = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)


class Profesor(models.Model):
    usuario = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)


class Sesion(models.Model):
    id_key = models.CharField(max_length=16, unique=True)
    participantes = models.ManyToManyField(
        User, related_name="participantes", blank=True
    )
    asunto = models.CharField(max_length=64, default="(Sin título)")
    nuevo = models.BooleanField(default=True)
    terminada = models.BooleanField(default=False)

    def __str__(self):
        return f"ID: {self.id_key} - {self.asunto}"


class Mensaje(models.Model):
    autor = models.ForeignKey(
        User, related_name="mensaje_enviado", on_delete=models.CASCADE
    )
    sesion = models.ForeignKey(Sesion, related_name="mensaje", on_delete=models.CASCADE)
    contenido = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["timestamp"]


class MensajeMultimedia(models.Model):
    autor = models.ForeignKey(
        User, related_name="mensaje_multimedia_enviado", on_delete=models.CASCADE
    )
    sesion = models.ForeignKey(
        Sesion, related_name="mensaje_multimedia", on_delete=models.CASCADE
    )
    multimedia = models.URLField()
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["timestamp"]


class Reporte(models.Model):
    CATEGORIA_REPORTE = [
        ("BUG", "Mal funcionamiento de la plataforma"),
        ("ABUSE", "Comportamiento indebido de uno de los usuarios"),
        ("QUALITY", "Satisfacción con el servicio"),
        ("OTHER", "Otros"),
    ]

    ESTADO_REPORTE = [
        ("EN_OBSERVACION", "Reporte en observación por el equipo de administradores"),
        ("APROBADO", "Reporte aprobado por el equipo de administradores"),
        ("RECHAZADO", "Reporte rechazado por el equipo de administradores"),
    ]

    autor = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="autor_reporte"
    )
    categoria = models.TextField(choices=CATEGORIA_REPORTE)
    estado = models.TextField(choices=ESTADO_REPORTE, default="EN_OBSERVACION")
    descripcion = models.TextField()
    fecha_envio = models.DateTimeField(auto_now_add=True)

    han_aprobado = models.ManyToManyField(
        User, related_name="reportes_aprobados", blank=True
    )
    han_rechazado = models.ManyToManyField(
        User, related_name="reportes_rechazados", blank=True
    )

    class Meta:
        ordering = ["fecha_envio"]
