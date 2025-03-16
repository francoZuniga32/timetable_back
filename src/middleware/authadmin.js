const jwt = require("jsonwebtoken");
const sequelize = require('../database/index');
const { DataTypes } = require('sequelize');
const Administracion = require("../database/models/administracion")(sequelize, DataTypes);

const auth = async(req, res, next) => {
    console.log(req.headers["access-token"]);
    if (req.headers["access-token"]) {
        try {
            var data = jwt.verify(req.headers["access-token"], process.env.CLAVE).usuario;
            var admin = await Administracion.findOne({
                where: {
                    email: data.email,
                    contrasenia: data.contrasenia
                },
            });
            if (admin != null) {
                next();
            } else {
                res.status(203).json({ mensaje: "el usuario no es administrador" });
            }
        } catch (error) {
            res.status(401).send({err: error});
        }
    } else {
        res.status(203).send({ mensaje: "no esta provisto el token" });
    }
};

module.exports = auth;