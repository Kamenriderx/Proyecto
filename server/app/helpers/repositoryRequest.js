
const { Student, Request, Professor, User } = require("../models")

const getStudent= async (id)=>{
    return await Student.findOne({where:{ID_USER:id}, include:[{model:User, as:"user", attributes:["CENTER"]}]})
}
const getProfessor= async (id)=>{
    return await Professor.findOne({where:{ID_USER:id}, include:[{model:User, as:"user", attributes:["CENTER"]}]})
}

const getCoordinator= async (center, career)=>{
    return await Professor.findOne({where:{CAREER:career}, include:[{model:User, as:"user", attributes:["CENTER", "ID_ROLE"],where:[{ID_ROLE:4,CENTER:center}]}]})
}
const changeStateRequest= async (body)=>{

    return await Request.update({STATE: body.RESPONSE, OBS: body.OBS},{where:{ID_REQUEST: body.ID_REQUEST}})
}

const changeCareerStudent=async(body)=>{

    return await Student.update({CAREER:body.NEW_CAREER}, {where:{ID_STUDENT:body.ID_STUDENT}})

}

module.exports = {
    getStudent, 
    changeStateRequest,
    changeCareerStudent, 
    getProfessor,
    getCoordinator
};
