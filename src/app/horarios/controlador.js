const { DataTypes } = require("sequelize");
const sequelize = require("../../database/index");
const Horarios = require("../../database/models/horarios")(sequelize, DataTypes);


let controlador = {};

controlador.all = async(req, res)=>{
    res.send(await Horarios.findAll());
}

controlador.create = async(req, res)=>{
    let { descripcion, dia, horainicio, horafin, estado} = req.body;

    let horario = await Horarios.findOne({
        where:{
            dia : dia,
            descripcion: descripcion    
        }
    });

    if(!horario){
        horario = await Horarios.create({
            descripcion: descripcion,
            dia: dia,
            horainicio: horainicio,
            horafin: horafin,
            estado: estado
        });

        res.send(horario);
    }else{
        res.status(400).send({"err:":"el horario ya existe"});
    }

}

controlador.remove = async(req, res)=>{
    let id = req.params.id;

    let horario =await Horarios.findOne({
        where:{
            id: id
        }
    });
    if(horario){
        await Horarios.destroy({
            where:{
                id: id
            }
        });
        res.send();
    }else{
        res.status(400).send({"err:":"el horario no existe"});

    }
}

controlador.update = async(req, res)=>{
    let id = req.params.id;
    let { descripcion, dia, horainicio, horafin, estado} = req.body;

    let horario = await Horarios.findOne({
        where:{
            id: id
        }
    });

    if(horario){

        horario = await Horarios.update({
            descripcion: descripcion,
            dia: dia,
            horainicio: horainicio,
            horafin: horafin,
            estado: estado
        },{
            where:{
                id: id
            }
        })

        res.send();
    }else{
        res.status(400).send({"err:":"el horario no existe"});
    }

}

module.exports = controlador;