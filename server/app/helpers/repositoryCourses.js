const { Op } = require("sequelize");
const { Course, Department, Career, RequerimentsCourse, ServiceCourse } = require("../models")

const getServiceCourses = async(idCareer)=>{
    
    return await Course.findAll({where:{
        ID_CAREER:idCareer,
        IS_SERVICE: 1
    },include:[{model:RequerimentsCourse, attributes:["REQUIREMENT_ID_COURSE",
    "ID_CAREER",],as:"requirement"}]})
}

const getMyCoursesArea = async(idCareer)=>{
    return await Course.findAll({where:{
        ID_CAREER:idCareer,
    },include:[{model:RequerimentsCourse, attributes:["REQUIREMENT_ID_COURSE",
    "ID_CAREER",],as:"requirement"}]})
}

const getDepartmentStudent = async(NAME)=>{
    return await Department.findOne({include:[{model:Career, required:true, where:{
        NAME:{[Op.like]:`${NAME}` }
    }}]})
}

const getCareer = async (idCareer)=> await Career.findOne({where:{ID_CAREER:idCareer}})

const getServicesAreas = async (myCareer)=>{
    return await Career.findAll({attributes:["ID_CAREER","NAME"],
    include:[{model:Course,include:[{model:ServiceCourse, 
        where:{
            [Op.or]:[
                {
                    ID_CAREER: myCareer.ID_CAREER,
                },{
                    ID_CAREER: 0,
                }
            ]
        }
    }] ,
    where:{
       IS_SERVICE: 1,
       

    }}]
})



}


module.exports = {
    getServiceCourses,
    getDepartmentStudent,
    getCareer,
    getMyCoursesArea, 
    getServicesAreas
};
