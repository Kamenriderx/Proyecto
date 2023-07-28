const { Career, Request, RequestCareer, User, Student, RequestCenter } = require("../models");
const {getStudent, changeStateRequest, changeCareerStudent, getProfessor} = require('../helpers/repositoryRequest');
const { Op } = require("sequelize");

const getCareers = async (req,res)=>{
    try {

        const careers = await Career.findAll({})

        res.status(200).json({careers})

        
    } catch (error) {
        console.log({error})
        res.status(500).json({messagge:"SALIO ALGO MAL"})
    }
}

const requestChangeCareer = async (req,res)=>{
    try {
        const {file, user, body}= req
        const student = await getStudent(user.ID_USER)
        const request = await Request.findOne({
            where:{
                ID_STUDENT: student.ID_STUDENT,
                STATE:"Pendiente",
                TYPE:"CARRERA"
            }, include:[{model:Student, as:"student", include:[{model:User, as:"user", attributes:["CENTER", "ACCOUNT_NUMBER"] }]
            }, {model:RequestCareer, as:"requestCareer",attributes:["URL", "ID_CAREER"], include:[{model:Career, as:"career", attributes:["NAME"]}]}]


        })

        if (request) {
            res.status(400).send({messagge:"Ya tiene una solicitud de cambio de carrera Pendiente"})
            return
        }

        const url = `http://localhost:3000/docs/${file.filename}`
        await Request.create({JUSTIFY:body.JUSTIFY,ID_STUDENT:student.ID_STUDENT,TYPE:"CARRERA",requestCareer:[ {URL:url, ID_CAREER:body.ID_CAREER}]},{include:{model:RequestCareer, as:"requestCareer" }})

    



        res.status(200).send({messagge:"solicitud de cambio de carrera enviada"})


        
    } catch (error) {
        console.log({error})
        res.status(500).json({messagge:"ALGO SALIO MAL"})
    }
}
const requestChangeCenter = async (req,res)=>{
    try {
        const {file, user, body}= req
        const student = await getStudent(user.ID_USER)
        const request = await Request.findOne({
            where:{
                ID_STUDENT: student.ID_STUDENT,
                STATE:"Pendiente",
                TYPE:"CENTRO"
            }, include:[{model:Student, as:"student", include:[{model:User, as:"user", attributes:["CENTER", "ACCOUNT_NUMBER"] }]
            }, {model:RequestCenter, as:"requestCenter",attributes:["URL", "CENTER"]}]


        })

        if (request) {
            res.status(400).send({messagge:"Ya tiene una solicitud de cambio de centro Pendiente"})
            return
        }

        const url = `http://localhost:3000/docs/${file.filename}`
        await Request.create({JUSTIFY:body.JUSTIFY,ID_STUDENT:student.ID_STUDENT,TYPE:"CENTRO",requestCenter:[ {URL:url, CENTER:body.CENTER}]},{include:{model:RequestCenter, as:"requestCenter" }})

    



        res.status(200).send({messagge:"solicitud de cambio de centro enviada"})


        
    } catch (error) {
        console.log({error})
        res.status(500).json({messagge:"ALGO SALIO MAL"})
    }
}

const getRequestChangeCareer = async (req,res)=>{
    try {
        const {user} = req;
        const professor = await getProfessor(user.ID_USER)
        const request = await Request.findAll({
            where:{
                STATE: "Pendiente",
            }, include:[{model:Student, as:"student", include:[{model:User, as:"user", attributes:["CENTER", "ACCOUNT_NUMBER"], where:{
                    CENTER: user.CENTER} }]
            }, {model:RequestCareer, as:"requestCareer", include:[{model:Career, as:"career", where:{NAME:{[Op.like]:`%${professor.CAREER.toUpperCase()}%`}}}]}]


        })
        res.status(200).json({request})
        
    } catch (error) {
        console.log({error});
        res.status(500).json({message:"ALGO SALIO MAL"})
    
    }
}

const getMyRequests = async (req,res)=>{
    try {
        const {user} = req;
        const student = await getStudent(user.ID_USER)
        const request = await Request.findAll({
            where:{
                ID_STUDENT: student.ID_STUDENT,
            }, include:[{model:Student, as:"student", include:[{model:User, as:"user", attributes:["CENTER", "ACCOUNT_NUMBER"] }]
            }, {model:RequestCareer, as:"requestCareer",attributes:["URL", "ID_CAREER"], include:[{model:Career, as:"career", attributes:["NAME"]}]}]


        })
        res.status(200).json({request})
        
    } catch (error) {
        console.log({error});
        res.status(500).json({message:"ALGO SALIO MAL"})
    
    }
}

const responseRequest = async(req,res)=>{
    try {
        const {body, user} = req
        const professor = await getProfessor(user.ID_USER)
        if (body.RESPONSE.toUpperCase() == "ACEPTADA") {
            body.NEW_CAREER = professor.CAREER
            body.OBS = `Felicidades, has sido aceptado en la carrera de ${professor.CAREER}.`
            await changeCareerStudent(body)
            await changeStateRequest(body)
            res.status(200).json({messagge:`La solicitud ha sido ${body.RESPONSE}`})
            return
            
        }
        if (body.RESPONSE.toUpperCase() == "DENEGADA") {
            body.OBS = `Lo sentimos, tu solicitud ha sido rechazada.`
            await changeStateRequest(body)
            res.status(200).json({messagge:`La solicitud ha sido ${body.RESPONSE}`})
            return
            
        }

        
    } catch (error) {
        console.log({error})
        res.status(500).json({messagge:"ALGO SALIO MAL"})
    }
}

const cancelledRequest = async(req,res)=>{
    try {
        const {body} = req

        body.OBS= `solicitud ${body.RESPONSE}`

        await changeStateRequest(body)
        res.status(200).json({messagge:`La solicitud ha sido ${body.RESPONSE} correctamente`})
        
    } catch (error) {
        console.log({error})
        res.status(500).json({messagge:"ALGO SALIO MAL"})
    }
}



module.exports = {
    getCareers,
    requestChangeCareer,
    getRequestChangeCareer, 
    responseRequest, 
    cancelledRequest,
    getMyRequests,
    requestChangeCenter
};
