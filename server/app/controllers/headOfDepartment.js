const {Professor, User, Section, Classroom, Building, Course, PeriodAcademic, Enrollment, Student} = require("../models")
const {getProfessor}=require('../helpers/repositoryRequest');

const { Op, fn, col} = require("sequelize");

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
        res.status(500).json({messagge:"Algo salio mal"})
    }
}

const getSectionsByProfessor = async (req,res)=>{
    try {

        const {idUser, idPeriod} = req.params
        const professor = await getProfessor(idUser)

        const sections = await  Section.findAll({
            attributes:[
                "ID_SECTION",
                "DAYS",
                "SECTION_CODE",
                "START_TIME",
                "END_TIME",
                "SPACE_AVAILABLE"
            ],
            where:{
                ID_PROFFERSSOR: professor.ID_PROFFERSSOR
            }, include:[
                {model:Classroom, as:"classroom",attributes:["NUMBER"], include:[
                    {
                        model:Building, as:"building", attributes:["NAME"]
                    }
                ] 
                },
                {
                    model:Course, as:"course",attributes:["CODE_COURSE", "NAME"]
                },
                {
                    model:PeriodAcademic,as:"period", required:true,attributes:[[fn("YEAR", col("START_DATE")), "YEAR"], "PERIOD_NAME"], where:{ID_PERIOD:idPeriod}
                },
            ]
        })
        res.status(200).json({sections})
    
        
    } catch (error) {
        console.log({error})
        res.status(500).json({messagge:"Algo salio mal"})
    }
}

const getNotesByProfessor = async (req,res)=>{
    try {

        const { idPeriod, idSection} = req.params
  

        const section = await  Enrollment.findAll({ attributes:[
            "ID_ENROLLMENT",
            "OBS",
            "CALIFICATION",
            "STATE",
        ],
            
            where:{
                ID_SECTION:idSection,
                STATE:"Finalizada"
            }, include:[
                {model:Student, as:"student", attributes:[
                    "INSTITUTIONAL_EMAIL",
                    "CAREER",
                    "UV_AVAILABLE",
                    "TYPE",
                ] ,include:[{model:User, as:"user", attributes:["ACCOUNT_NUMBER","ID_USER","CENTER"]}]},
                { model:Section, as:"seccion", attributes:[
                "ID_SECTION",
                "DAYS",
                "SECTION_CODE",
                "START_TIME",
                "END_TIME",
                "SPACE_AVAILABLE"
            ],include:[
                {model:Classroom, as:"classroom",attributes:["NUMBER"], include:[
                    {
                        model:Building, as:"building", attributes:["NAME"]
                    }
                ] 
                },
                {
                    model:Course, as:"course",attributes:["CODE_COURSE", "NAME"]
                },
                {
                    model:PeriodAcademic,as:"period",attributes:[[fn("YEAR", col("START_DATE")), "YEAR"], "PERIOD_NAME"], where:{ID_PERIOD:idPeriod}
                },
            ]
        }]})
        res.status(200).json({section})
    
        
    } catch (error) {
        console.log({error})
        res.status(500).json({messagge:"Algo salio mal"})
    }
}

module.exports = {
    getProffesorsByCarrer,
    getSectionsByProfessor,
    getNotesByProfessor
};
