const {Section,Professor, Classroom, Building, Course, User, Career} = require('../models');
const {Op} = require('sequelize');

const getSectionsByCenterAndCareer = async (user) =>{
    const professor = await getProfessorIdUser(user);


    return await Section.findAll({
        include:[
            {model:Professor, as:"Proffessor",include:[{model:User, as:"user", attributes:[ "ID_USER",
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


module.exports = {
    getSectionsByCenterAndCareer,
    getProfessorIdUser
};
