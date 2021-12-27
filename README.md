# EPY

El sistema Edupy (EPY) está constituido por un backend en Django Framework y frontend en React.

## Requiere

-   Intérprete Python 3.9+
-   NodeJS

## Instrucciones

1. En su entorno Python3, instale las dependencias vía pip (o conda) desde el archivo **requirements** en el directorio raíz.

```
python -m pip install -r requirements.txt
```

2. Para correr el servidor necesita realizar las migraciones de la base de datos, para ello ejecute:

```
python manage.py makemigrations
python manage.py migrate
```

3. Adicionalmente, puede crear un super usuario para acceder a la interfaz de _Django admin_, esta le permitirá crear objetos y usuarios en la base de datos de forma manual.

```
python manage.py createsuperuser
```

4. Para correr el servidor (por defecto en el puerto 8000) ejecute:

```
python manage.py runserver
```

> Ejecutar `python manage.py runserver` dejará su terminal ocupada.

5. Para compilar el frontend de forma dinámica, dirígase al directorio **epy_mfe** y ejecute:

```
npm i               # instalacion de paquetes

npm run maindev		# modo de desarrollo (main)
npm run mainprod	# modo de producción (main)

npm run admindev    # modo de desarrollo (administracion)
npm run adminprod   # modo de produccion (administracion)
```

(Puede prescindir de este comando si no desea compilar dinámicamente el frontend).

> Ejecutar `npm run maindev` o `npm run admindev` dejará su terminal ocupada.

6. Para acceder, dirígase a su navegador web a la dirección:

```
localhost:8000/
```
