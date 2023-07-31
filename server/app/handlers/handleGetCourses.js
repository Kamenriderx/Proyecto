const { Op } = require("sequelize");
const { Professor, Course, Career } = require("../models");

const getProfessor = async (id)=>{
    return await Professor.findOne({
        where:{
            ID_USER: id
        }
    })
}

const getCourses = async (career)=>{
    return await Course.findAll({
        include:[{
            model:Career, as:"career", where:{NAME:{
                [Op.like]:`%${career.toUpperCase()}%`
            },},attributes:["NAME"]
        }]
    })

}

function getCodeCourse(career){
    
    let arrayCarrer = career.split(" ")
    let size = arrayCarrer.length
    let code = ""


    if (size == 3) {
        code = arrayCarrer[0][0] + arrayCarrer[2][0]
        code = code.toUpperCase()
    }
    if (size == 2) {
        code = arrayCarrer[0][0] + arrayCarrer[1][0]
        code = code.toUpperCase()
    }
    if (size == 1) {
        code = arrayCarrer[0][0] + arrayCarrer[0][4]
        code = code.toUpperCase()
    }

    return code


}


module.exports = {
    getProfessor,
    getCourses
};
