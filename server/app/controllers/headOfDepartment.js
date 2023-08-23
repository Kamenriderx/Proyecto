const {Professor, User, Section} = require("../models")
const {getProfessor}=require('../helpers/repositoryRequest');

const { Op} = require("sequelize");

const getProffesorsByCarrer = async (req,res)=>{
    try {

        const {idUser} = req.params
        const headOfDepartment = await getProfessor(idUser)

        const professors = await  Professor.findAll({
            where:{
                CAREER:{[Op.like]: `${headOfDepartment.CAREER}`}
            }, include:[{model:User,required:true, as:"user", attributes:
            [
                "ACCOUNT_NUMBER",
                "NAME",
                "DNI",
                "CENTER",
                "EMAIL"
            ] ,where:{
                CENTER:{[Op.like]: `${headOfDepartment.user.CENTER}`}
            }}]
        })
        res.status(200).json({professors})
    
        
    } catch (error) {
        console.log({error})
        res.status(500).json({messagge:"ALGO SALIO MAL"})
    }
}
const getSectionsByProfessor = async (req,res)=>{
    try {

        const {idUser} = req.params
        const headOfDepartment = await getProfessor(idUser)

        const sections = await  Section.findAll({
            where:{
                ID_PROFFERSSOR: headOfDepartment.ID_PROFFERSSOR
            }
        })
        res.status(200).json({sections})
    
        
    } catch (error) {
        console.log({error})
        res.status(500).json({messagge:"ALGO SALIO MAL"})
    }
}

module.exports = {
    getProffesorsByCarrer,
    getSectionsByProfessor
};
