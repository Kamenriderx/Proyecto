
const { Op } = require("sequelize")
const { Student, Request, Professor, User, Career, RequestCenter, Multimedia } = require("../models")

const getStudent= async (id)=>{
    return await Student.findOne({where:{ID_USER:id}, include:[{model:User, as:"user", attributes:["NAME","CENTER","ACCOUNT_NUMBER"]}]})
}
const getStudentById= async (id)=>{
    return await Student.findOne({where:{ID_STUDENT:id}, include:[{model:User, as:"user", attributes:["NAME","CENTER"]}]})
}
const getProfessor= async (id)=>{
    return await Professor.findOne({where:{ID_USER:id}, include:[{model:User, as:"user", attributes:["CENTER"]}]})
}

const getPhotos = async (idUser) =>{
    return await Multimedia.findAll({ where:{
        ID_USER: idUser,
        IS_PROFILE: 1
    }})
}

const getCoordinator= async (center, career)=>{
    return await Professor.findOne({where:{CAREER:{[Op.like]:career}}, include:[{model:User, as:"user", attributes:["CENTER", "ID_ROLE"],where:[{ID_ROLE:4,CENTER:{[Op.like]:center}}]}]})
}
const changeStateRequest= async (body)=>{

    return await Request.update({STATE: body.RESPONSE, OBS: body.OBS},{where:{ID_REQUEST: body.ID_REQUEST}})
}
const getCareerChange= async(id)=>{
    return await Career.findOne({where:{ID_CAREER: id}})
}
const changeCareerStudent=async(body)=>{

    return await Student.update({CAREER:body.NEW_CAREER}, {where:{ID_STUDENT:body.ID_STUDENT}})

}
const changeCenterStudent=async(body)=>{
    const student =await Student.findOne({where:{ID_STUDENT:body.ID_STUDENT}, include:[{model:User, as:"user"}]} )
    
    return await User.update({CENTER:body.NEW_CENTER}, {where:{ID_USER:student.ID_USER}})

}

const getRequestCurrent = async (id)=>{
    return await Request.findOne({where:{ID_REQUEST:id}, include:[{model:RequestCenter, as:"requestCenter"}]})
}
const getRequestPaymentReplacement = async(student)=>{
    return await Request.findOne({
        where:{
            ID_STUDENT: student.ID_STUDENT,
            STATE:"Pendiente",
            TYPE:"PAGO_REPO"
        }, include:[{model:Student, as:"student", include:[{model:User, as:"user", attributes:["CENTER", "ACCOUNT_NUMBER"] }]
        },]


    })
}

module.exports = {
    getStudent, 
    changeStateRequest,
    changeCareerStudent, 
    getProfessor,
    getCoordinator, 
    getCareerChange,
    getRequestCurrent, 
    changeCenterStudent,
    getRequestPaymentReplacement,
    getStudentById,
    getPhotos
};
