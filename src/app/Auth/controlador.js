const controlador = {};
const jwt = require("jsonwebtoken");

const { DataTypes } = require("sequelize");
const sequelize = require("../../database/index");
const Usuario = require("../../database/models/usuarios")(sequelize, DataTypes);
const Vendedor = require("../../database/models/vendedores")(
  sequelize,
  DataTypes
);

var Email = require("../Cookingbeats/mail");
var Validacion = require("../Cookingbeats/verificacion");

controlador.auth = async (req, res) => {
  if (req.body.email && req.body.contrasenia) {
    try {
      const result = await sequelize.transaction(async (t) => {
        var usuario = await Usuario.findOne(
          {
            attributes: ["id", "nombreusuario", "email", "foto"],
            where: {
              email: req.body.email,
              contrasenia: req.body.contrasenia,
              //validado: true,
            },
          },
          { transaction: t }
        );
        if (usuario) {
          var vendedor = await Vendedor.findOne(
            {
              attributes: ["idusuario"],
              where: {
                idusuario: usuario.getDataValue("id"),
              },
            },
            { transaction: t }
          );

          usuario.setDataValue("vendedor", vendedor != null ? true : false);
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

controlador.validate = async (req, res) => {
  if (req.body.codigo) {
    try {
      const result = await sequelize.transaction(async (t) => {
        var idUsuario = jwt.verify(
          req.headers["access-token"],
          process.env.CLAVE
        ).usuario.id;
        var bloquedo = await Usuario.findOne(
          {
            attributes: ["validado"],
            where: {
              id: idUsuario,
            },
          },
          { transaction: t }
        );

        if (!bloquedo.getDataValue("validado")) {
          if (req.body.codigo == bloquedo.getDataValue("codigo")) {
            await Usuario.update(
              {
                validado: true,
              },
              {
                id: idUsuario,
              },
              { transaction: t }
            );

            res.status(200).send();
          } else {
            res.status(401).send({ err: "El codigo no es correcto." });
          }
        } else {
          res.status(401).send({ err: "El usuario ya esta validado." });
        }
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    res
      .status(401)
      .send({ err: "El codigo de validacion no fue proporcionado." });
  }
};

controlador.register = async (req, res) => {
  if (
    req.body.productor != null &&
    req.body.nombre &&
    req.body.email &&
    req.body.contrasenia
  ) {
    try {
      const result = await sequelize.transaction(async (t) => {
        var usuario = await Usuario.findOne(
          {
            attributes: ["id"],
            where: {
              email: req.body.email,
              contrasenia: req.body.contrasenia,
            },
          },
          { transaction: t }
        );
        if (!usuario) {
          usuario = await Usuario.create(
            {
              nombreusuario: req.body.nombre,
              email: req.body.email,
              contrasenia: req.body.contrasenia,
              codigo: await codigo(),
              validado: false,
              createdAt: new Date(),
              updatedAt: new Date()
            },
            { transaction: t }
          );

          if (req.body.productor) {
            var vendedor = await Vendedor.create({
              idusuario: usuario.getDataValue("id"),
            },{transaction: t});
          }

          //Email(`Codigo de validacion de cuanta de Cookin Beats: ${usuario.getDataValue('codigo')}`, "Validacion de email de Cooking Beats.", req.body.email);
          await t.commit();

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

const codigo = async () => {
  return Math.round(Math.random() * 999999);
};

module.exports = controlador;
