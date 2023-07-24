const {User, Professor,Classroom,Building,Career} = require('../models');
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
        
        include:[{model:Building, as:"building",where:{
            CENTER:{
                [Op.like]:`%${center.toUpperCase()}%`
            }
        }},{
            model:Career, as:"career", where:{NAME:{
                [Op.like]:`%${career.toUpperCase()}%`
            }}, attributes:["NAME"]
        }]
    })
}

module.exports = {
    getProfessor,
    getClassroomsByCenter
};
