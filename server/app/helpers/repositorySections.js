const {Section,Professor, Classroom, Building, Course, User, Career} = require('../models');
const {Op} = require('sequelize');

const getSectionsByCenterAndCareer = async (user) =>{
    const professor = await getProfessorIdUser(user);

    return await Section.findAll({
        where:{
            DELETED:0
        },include:[
            {model:Professor, as:"Proffessor",where:{CAREER:{
                [Op.like]:`%${professor.CAREER.toUpperCase()}%`
            }},include:[{model:User, as:"user", attributes:[ "ID_USER",
            "ID_ROLE","ACCOUNT_NUMBER","NAME",
            "DNI","CENTER",
            "EMAIL"]}]},
            {model:Classroom, as:"classroom",include:[
                {model:Building, as:"building", where:{CENTER:{
                [Op.like]:`%${user.CENTER.toUpperCase()}%`
            }}},{
                model:Career, as:"career", where:{NAME:{
                    [Op.like]:`%${professor.CAREER.toUpperCase()}%`
                }}
            }]},
            {model:Course, as:"course"}
        ]
    })
}

const getProfessorIdUser = async (user)=>{
    return await Professor.findOne({
        where:{
            ID_USER: user.ID_USER
        }
    })
}

const sectionExistsHourClassroom = async (body)=>{
    return await Section.findOne({
        where:{
            ID_SECTION:{
                [Op.ne]: body.ID_SECTION
            },
            ID_CLASSROOM: body.ID_CLASSROOM,
            START_TIME: body.START_TIME,
            END_TIME: body.END_TIME
        }
    })
}

const sectionbyProffessor = async (body)=>{
    return await Section.findOne({
        where:{
            ID_PROFFERSSOR: body.ID_PROFFERSSOR,
            START_TIME: body.START_TIME,
            END_TIME: body.END_TIME
        }
    })
}

const getSection = async (body)=>{
    return await Section.findOne({
        where:{
            ID_SECTION: body.ID_SECTION}
    })
}

module.exports = {
    getSectionsByCenterAndCareer,
    getProfessorIdUser,
    getSection,
    sectionExistsHourClassroom,
    sectionbyProffessor
};
