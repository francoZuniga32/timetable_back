

const { DataTypes } = require("sequelize");
const sequelize = require("../../database/index");
const Usuario = require("../../database/models/usuarios")(sequelize, DataTypes);



module.exports = async (req, res) => {
    if (
      
      req.body.nombre &&
      req.body.contrasenia
    ) {
      try {
        const result = await sequelize.transaction(async (t) => {
          var usuario = await Usuario.findOne(
            {
              attributes: ["id"],
              where: {
                nombreusuario: req.body.nombre,
                contrasenia: req.body.contrasenia,
              },
            },
            { transaction: t }
          );
          if (!usuario) {
            usuario = await Usuario.create(
              {
                nombreusuario: req.body.nombre,
                contrasenia: req.body.contrasenia,
                createdAt: new Date(),
                updatedAt: new Date()
              },
              { transaction: t }
            );
  
            res.send(usuario);
          } else {
            res.status(401).send({ err: "El usuario ya esta registrado" });
          }
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      res.status(401).send({
        err: "el email, la contrasenia, el nombre de usuario, o el valor de producto estan vacios",
      });
    }
  };