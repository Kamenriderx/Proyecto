const {User, Professor,Classroom,Building} = require('../models');
const {Op} = require('sequelize');


const getProfessor = async (id)=>{
    return await Professor.findOne({
        where:{
            ID_USER: id
        },include:{
            model:User,
            as:"user"

        }
    })
}

const getClassroomsByCenter = async(center,career)=>{
    return await Classroom.findAll({
        where:{
            CAREER:{
                [Op.like]:`%${career.toUpperCase()}%`
            }
        },
        include:[{model:Building, as:"building",where:{
            CENTER:{
                [Op.like]:`%${center.toUpperCase()}%`
            }
        }}]
    })
}

module.exports = {
    getProfessor,
    getClassroomsByCenter
};
