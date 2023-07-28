
const { Student, Request, Professor } = require("../models")

const getStudent= async (id)=>{
    return await Student.findOne({where:{ID_USER:id}})
}
const getProfessor= async (id)=>{
    return await Professor.findOne({where:{ID_USER:id}})
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
    getProfessor
};
