
const { Student, Request } = require("../models")

const getStudent= async (id)=>{
    return await Student.findOne({where:{ID_USER:id}})
}
const changeStateRequest= async (body)=>{
    return await Request.update({STATE: body.RESPONSE}, {where:{ID_REQUEST: body.ID_REQUEST}})
}

const changeCareerStudent=async(body)=>{

    return await Student.update({CAREER:body.NEW_CARRER}, {where:{ID_STUDENT:body.ID_STUDENT}})

}

module.exports = {
    getStudent, 
    changeStateRequest,
    changeCareerStudent
};
