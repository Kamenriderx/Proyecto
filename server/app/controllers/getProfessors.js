const {Rol, User, Professor} = require('../models');
const getProfessorsCtrl = async(req,res)=>{

    try {
        const professors = await Professor.findAll({include:{
        model:User ,as:"user" ,include:[{model:Rol,as:"rol"}]}})
        res.status(200).json({professors})
    } catch (error) {
        console.log(error)
        res.status(403).json({error})
    }
}


module.exports = {
    getProfessorsCtrl
};
