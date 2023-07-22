const {Section,Professor, Classroom, Building, Course, User} = require('../models');
const {Op} = require('sequelize');

const getSectionsByCenterAndCareer = async (user) =>{
    const professor = await getProfessorIdUser(user);


    return await Section.findAll({
        include:[
            {model:Professor, as:"Proffessor",include:[{model:User, as:"user"}]},
            {model:Classroom, as:"classroom",where:{CAREER:{
                [Op.like]:`%${professor.CAREER.toUpperCase()}%`
            }},include:[{model:Building, as:"building", where:{CENTER:{
                [Op.like]:`%${user.CENTER.toUpperCase()}%`
            }}}]},
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
