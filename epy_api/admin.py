from django.contrib import admin

from .models import Pregunta, Estudiante, Profesor, Sesion, User

# Register your models here.
@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'first_name', 'last_name')

@admin.register(Pregunta)
class PreguntaAdmin(admin.ModelAdmin):
    ordering = ['fecha']
    list_display_links = ('titulo','autor')
    list_display = ('titulo','autor')

    list_filter = ('titulo', 'fecha', 'autor')
    search_fields = ['titulo', 'autor']

@admin.register(Estudiante)
class EstudianteAdmin(admin.ModelAdmin):
    list_display = ('usuario',)

@admin.register(Profesor)
class ProfesorAdmin(admin.ModelAdmin):
    list_display = ('usuario',)

@admin.register(Sesion)
class SesionAdmin(admin.ModelAdmin):
    pass
