const { Course, Section, Classroom } = require("../models");
const { Op } = require('sequelize');

const getCourse = async(id)=>{
   return await Course.findOne(
    {
        where:{
            ID_COURSE: id
        }
    }
    )
}
const getClassroom = async(body)=>{
   return await Classroom.findOne({
    where:{
        [Op.and]:
        [
            {ID_CLASSROOM:body.ID_CLASSROOM},
            {ID_BUILDING:body.ID_BUILDING},
        ]
    }
})
}





module.exports = {
    getCourse,
    getClassroom
    
}
