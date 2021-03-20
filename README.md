# TODO

Esté proyecto fue creado para generar una **API** para la prueba de **Addika**.

## Prerequisitos

Para correr el servidor es necesario tener instalado:

- **NodeJS** en la versión **13.14.x**.
- **NPM** en la versión **6.14.x**.
- **PostgreSQL** en la versión **13**.

A su vez, si se cuenta con **NVM** existe un archivo que indica la versión de **NodeJS**
basta con tener instalada la versión y ejecutar dentro del proyecto:

```
nvm use
```

## Configuraciones ⚙
### Base de datos

Puedes configurar el archivo **config.json** que se encuentra en la carpeta **config** para manejar
las variables de conexión del **ORM SEQUELIZE** con tu base de datos. 
Por defecto tu necesitas tener una base de datos llamada **todo**, con permisos de un usuario
llamado **postgres** con una contraseña **root**.

### Variables de entorno

Esté proyecto usa dotenv para manejar variables de entorno.
En la parte principal del proyecto, hay un archivo llamado **.env** donde podremos configurar
nuestras variables de entorno.
Por defecto, el puerto es manejado en 8000.

## Correr el servidor

Una vez instalado y configurado, los siguientes comandos nos servirán para correr el servidor:

```
npm install
```

```
npm run migrate
```
El proyecto usa **nodemon** para facilitar el desarrollo, por ello para correr el servidor con
esta herramienta ejecutamos:

```
npm run start:dev
```

Si no es necesario correr el servidor con **nodemon**, puedes correrlo de la siguiente manera:

```
npm run start
```

## Pruebas

Esté proyecto implemente pruebas unitarias realizadas con [Jest](https://jestjs.io/docs/en/getting-started).
Para correr las pruebas es necesario:

```
npm install
```

```
npm run test
```

## Documentación
### Endpoints
La documentación de los endpoints fue realizada en [Postman](https://documenter.getpostman.com/view/4955309/Tz5wVZFC)

### Código
La documentación del código fue realizado con [jsDoc](https://www.npmjs.com/package/jsdoc) y con el template [docdash](https://github.com/clenemt/docdash).
Para poder [visualizar](./docs/DOC_FUNC.png) dicha documentación debes ir a la carpeta [**./docs**](./docs) y abrir el [**index.html**](./docs/index.html) con el explorador.

Para volver a crear documentación nueva (una vez documentado el código nuevo) debes de ejecutar:

````
npm run doc
````

## Licencia

El proyecto usa una licencia de tipo [ISC](https://opensource.org/licenses/ISC)

## Autor

[Sandro Estrada](https://www.linkedin.com/in/sandro-estrada-elizondo-1b5411171/)
