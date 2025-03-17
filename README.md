# Time Table - Backend  

Este es el backend para la aplicación [Timetable v1](https://github.com/francoZuniga32/timetable_v1).  
Permite gestionar los horarios, permitiendo modificar el horario o su estado una vez cargado.  

## Configuración de la base de datos  

El backend utiliza Sequelize como ORM, lo que permite cambiar la base de datos editando los archivos:  
- `src/database/index.js`  
- `src/database/config/config.js`  

Por defecto, se utiliza SQLite para facilitar el desarrollo sin necesidad de configurar una base de datos externa.  

Si necesitas aplicar las migraciones y poblar la base de datos, ejecuta los siguientes comandos dentro de `src/database`:  

```bash
npx sequelize db:migrate
npx sequelize-cli db:seed:all
```

## API

|ruta|metodo|descripcion|header|
|---|---|---|---|
|/horarios|GET|Lista todos los horarios cargados. Timetable v1 se encargará de filtrar los datos.||
|/auth|POST|Valida un usuario registrado. Enviar { "nombre": "admin", "contrasenia": "admin" }. Retorna un token.||
|/auth/register|POST| Registra un nuevo usuario con { "nombre": "admin", "contrasenia": "admin" }.|access-token: token|
|/horarios|POST|Registra un horario con { "descripcion": "Algebra2", "dia": "Lunes", "horainicio": "09:00:00", "horafin": "12:00:00", "estado": "normal" }.|access-token: token|
|/horarios/:id|DELETE| Elimina el horario con el ID proporcionado.|access-token: token|
|/horarios/:id|PUT| Actualiza un horario con { "descripcion": "Algebra2", "dia": "Lunes", "horainicio": "09:00:00", "horafin": "12:00:00", "estado": "normal" }.|access-token: token|

## Docker compose
Para evitar configuraciones manuales, puedes usar Docker Compose. Ejecuta:

```bash
npm install
docker-compose up -d
```

