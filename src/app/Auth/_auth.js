const jwt = require("jsonwebtoken");

const { DataTypes } = require("sequelize");
const sequelize = require("../../database/index");
const Usuario = require("../../database/models/usuarios")(sequelize, DataTypes);

module.exports = async (req, res) => {
  if (req.body.nombre && req.body.contrasenia) {
    try {
      const result = await sequelize.transaction(async (t) => {
        var usuario = await Usuario.findOne(
          {
            attributes: ["id", "nombreusuario", "contrasenia"],
            where: {
              nombreusuario: req.body.nombre,
              contrasenia: req.body.contrasenia,
             
            },
          },
          { transaction: t }
        );
        if (usuario) {
          usuario.setDataValue(
            "token",
            jwt.sign({ usuario: usuario }, process.env.CLAVE, {
              expiresIn: "3h",
            })
          );

          res.send(usuario);
        } else {
          res.status(401).send({
            err: "el usuario es invalido o la contrasenia es incorrecta",
          });
        }
      });
    } catch (err) {
      console.log(err);
      res.status(401).send({ err: err });
    }
  } else {
    res.status(204).send({ err: "No proporciono el email o la contraeña." });
  }
};
