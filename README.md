# Time Table - Backend

Creamos el backend para las aplicaciones (https://github.com/francoZuniga32/timetable_v1)[Timetable v1]. Permite gestionar los horarios de forma que pueda cambiar el horario o el estado de cualquier horario ya cargado. 

Puede cambiar la base de datos que se usa ya que como orm uso sequelize, editando los archivos de `src/database/index.js` y `src/database/config/config.js`.
En este caso usamos sqlite para evitar tener que legantar un proyecto de cero.

Puede ejecutar el siguiente comando parado en `src/database` `npx sequelize db:migrate` para correr las migraciones en caso de que se reconstruya la db de squlize o que cambie de base de datos.

## API

Necesitara un usuario para poder crear los horarios y editarlos. Esto es un aspecto que quiero mejorar en un futuro ya que hora se permite la creacion de usuarios por parte de cualquiera.

