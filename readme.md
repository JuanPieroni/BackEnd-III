# Proyecto Final - AdoptMe

Backend para sistema de adopciones de mascotas. Hecho con Node.js y MongoDB.

## Como ejecutar

### Con Docker  

**Imagen en DockerHub:** https://hub.docker.com/r/juanpieroni/adoptme-app

```bash
docker pull juanpieroni/adoptme-app
docker run -p 8080:8080 juanpieroni/adoptme-app
```

### Ejecutar local

1. Clonar el repositorio
2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
   - Copiar `.env.sample` a `.env`
   - Completar con tu URL de MongoDB

4. Ejecutar:
```bash
npm start
```

## Variables de entorno

Crear archivo `.env` con:
```
MONGO_URI=
PORT=8080
ENVIRONMENT=

```
ENVIROMENT puede ser: 
- development: losg en consola con colores
- production : logs en archivo y consola ( warnings y errores  )
## Documentacion API

la documentacion Swagger del modulo user esta disponible en:
```
http://localhost:8080/api/docs
```


## Tests

Ejecutar tests:
```bash
npm test
```
La app debe estar corriendo para los tests de integracion ( por defcto en el puerto 8080)