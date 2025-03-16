const sequelize = require("../database/index");
const { DataTypes } = require("sequelize");
const jwt = require("jsonwebtoken");
const Usuario = require("../database/models/usuarios")(sequelize, DataTypes);

const auth = async(req, res, next) => {
    if (req.headers["access-token"]) {
        try {
            var row = await Usuario.findOne({
                where: {
                    id: jwt.verify(req.headers["access-token"], process.env.CLAVE).usuario.id,
                },
            });
            if (row) {
                next();
            } else {
                res.status(203).json({ mensaje: "el usuario no esta registrado" });
            }
        } catch (error) {
            res.status(401).send({ err: error });
        }
    } else {
        res.status(401).send({ mensaje: "no esta provisto el token" });
    }
};

module.exports = auth;