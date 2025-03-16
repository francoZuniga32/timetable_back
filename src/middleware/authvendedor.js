const jwt = require("jsonwebtoken");
const sequelize = require('../database/index');
const { DataTypes } = require('sequelize');
const Vendedores = require("../database/models/vendedores")(sequelize, DataTypes);

const auth = async(req, res, next) => {
    console.log(req.headers["access-token"]);
    if (req.headers["access-token"]) {
        try {
            var vendedor = await Vendedores.findOne({
                attributes: ["idusuario"],
                where: {
                    idusuario: jwt.verify(req.headers["access-token"], process.env.CLAVE).usuario.id,
                },
            });
            if (vendedor != null) {
                next();
            } else {
                res.status(203).json({ mensaje: "el usuario no es un vendedor" });
            }
        } catch (error) {
            res.status(401).send({err: error});
        }
    } else {
        res.status(203).send({ mensaje: "no esta provisto el token" });
    }
};

module.exports = auth;