const { Career, Request, RequestCareer, User, Student, RequestCenter, Professor } = require("../models");
const {getStudent, changeStateRequest, changeCareerStudent, getProfessor, getCoordinator, getCareerChange, getRequestCurrent, changeCenterStudent} = require('../helpers/repositoryRequest');
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
        const career = await getCareerChange(body.ID_CAREER)
        const coordinator = await getCoordinator(student.user.CENTER, career.NAME)

        if (career.NAME.toUpperCase() == student.CAREER.toUpperCase()) {
            res.status(400).json({messagge:"TU CARRERA ACTUAL Y A LA QUE TE QUIERES CAMBIAR ES LAL MISMA"})
            return 
            
        }
        
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
        await Request.create({JUSTIFY:body.JUSTIFY,ID_STUDENT:student.ID_STUDENT,TYPE:"CARRERA",ID_COORDINATOR:coordinator.ID_PROFFERSSOR,CENTER:student.user.CENTER,requestCareer:[ {URL:url, ID_CAREER:body.ID_CAREER}]},{include:{model:RequestCareer, as:"requestCareer" }})

    



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
        const coordinator = await getCoordinator(body.CENTER, student.CAREER)
        if (body.CENTER.toUpperCase() == student.user.CENTER.toUpperCase()) {
            res.status(400).json({messagge:"TU CENTRO ACTUAL Y EL QUE TE QUIERES CAMBIAR ES EL MISMO"})
            return
            
        }
        
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
        await Request.create({JUSTIFY:body.JUSTIFY,ID_STUDENT:student.ID_STUDENT,TYPE:"CENTRO",ID_COORDINATOR:coordinator.ID_PROFFERSSOR,CENTER:body.CENTER,requestCenter:[ {URL:url, CENTER:body.CENTER}]},{include:{model:RequestCenter, as:"requestCenter" }})

    



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
                ID_COORDINATOR:professor.ID_PROFFERSSOR,
                STATE: "Pendiente",
                TYPE:"CARRERA",
                CENTER:{[Op.like]:professor.user.CENTER}
            }, include:[{model:Student, as:"student", include:[{model:User, as:"user", attributes:["CENTER","NAME", "ACCOUNT_NUMBER"], where:{
                    CENTER: user.CENTER} }]
            }, {model:RequestCareer, as:"requestCareer", include:[{model:Career, as:"career"}]},
        {model:Professor, as:"coordinator", include:[{model:User, as:"user",  attributes:["CENTER","NAME", "ACCOUNT_NUMBER"] }]}]


        })
        res.status(200).json({request})
        
    } catch (error) {
        console.log({error});
        res.status(500).json({message:"ALGO SALIO MAL"})
    
    }
}
const getRequestChangeCenter = async (req,res)=>{
    try {
        const {user} = req;
        const professor = await getProfessor(user.ID_USER)
        console.log({centroDocente: professor.user.CENTER, ID: professor.ID_PROFFERSSOR})
        const request = await Request.findAll({
            where:{
                ID_COORDINATOR:professor.ID_PROFFERSSOR,
                STATE: "Pendiente",
                TYPE:"CENTRO",
                CENTER:{[Op.like]:professor.user.CENTER}
            }, include:[{model:Student, as:"student",required: true, where:{CAREER:{[Op.like]:professor.CAREER}} , include:[{model:User, as:"user", attributes:["CENTER","NAME", "ACCOUNT_NUMBER"] }]
            }, {model:RequestCenter, as:"requestCenter"},
        {model:Professor, as:"coordinator", include:[{model:User, as:"user",  attributes:["CENTER","NAME", "ACCOUNT_NUMBER"] }]}]


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
                STATE:"Pendiente"
            }, include:[{model:Student, as:"student", include:[{model:User, as:"user", attributes:["CENTER", "ACCOUNT_NUMBER"] }]
            }, {model:RequestCareer, as:"requestCareer",attributes:["URL", "ID_CAREER"], include:[{model:Career, as:"career", attributes:["NAME"]}]}]


        })
        res.status(200).json({request})
        
    } catch (error) {
        console.log({error});
        res.status(500).json({message:"ALGO SALIO MAL"})
    
    }
}
const getMyRequestsAcceptDenyCenter = async (req,res)=>{
    try {
        const {user} = req;
        const student = await getStudent(user.ID_USER)
        const request = await Request.findAll({
            where:{
                ID_STUDENT: student.ID_STUDENT,
                STATE:{
                    [Op.or]:['Aceptada', 'Denegada']
                }, TYPE:"CENTRO"
            }, include:[ {model:RequestCenter, as:"requestCenter",attributes:["URL", "CENTER"]},{model:Student, as:"student", include:[{model:User, as:"user", attributes:["CENTER", "ACCOUNT_NUMBER"] }]
            },  {model:RequestCareer, as:"requestCareer",attributes:["URL", "ID_CAREER"], include:[{model:Career, as:"career", attributes:["NAME"]}]}]


        })
        res.status(200).json({request})
        
    } catch (error) {
        console.log({error});
        res.status(500).json({message:"ALGO SALIO MAL"})
    
    }
}
const getMyRequestsAcceptDenyCareer = async (req,res)=>{
    try {
        const {user} = req;
        const student = await getStudent(user.ID_USER)
        const request = await Request.findAll({
            where:{
                ID_STUDENT: student.ID_STUDENT,
                STATE:{
                    [Op.or]:['Aceptada', 'Denegada']
                }, TYPE:"CARRERA"
            }, include:[  {model:RequestCareer, as:"requestCareer",attributes:["URL", "ID_CAREER"], include:[{model:Career, as:"career", attributes:["NAME"]}]},{model:Student, as:"student", include:[{model:User, as:"user", attributes:["CENTER", "ACCOUNT_NUMBER"] }]
            }]


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
        const request = await getRequestCurrent(body.ID_REQUEST)
        const professor = await getProfessor(user.ID_USER)
        if (body.RESPONSE.toUpperCase() == "ACEPTADA" && request.TYPE == "CARRERA") {
            body.NEW_CAREER = professor.CAREER
            body.OBS = `Felicidades, has sido aceptado en la carrera de ${professor.CAREER}.`
            await changeCareerStudent(body)
            await changeStateRequest(body)
            res.status(200).json({messagge:`La solicitud ha sido ${body.RESPONSE}`})
            return
            
        }
        if (body.RESPONSE.toUpperCase() == "ACEPTADA" && request.TYPE == "CENTRO") {
            
            body.NEW_CENTER = request.requestCenter[0].dataValues.CENTER
            body.OBS = `Felicidades, has sido aceptado en el nuevo centro de ${body.NEW_CENTER}.`
            await changeCenterStudent(body)
            await changeStateRequest(body)
            res.status(200).json({messagge:`La solicitud ha sido ${body.RESPONSE}`})
            return
            
        }
        if (body.RESPONSE.toUpperCase() == "DENEGADA" && request.TYPE =="CARRERA") {
            body.OBS = `Lo sentimos, tu solicitud ha sido rechazada.`
            await changeStateRequest(body)
            res.status(200).json({messagge:`La solicitud ha sido ${body.RESPONSE}`})
            return
            
        }
        if (body.RESPONSE.toUpperCase() == "DENEGADA" && request.TYPE =="CENTRO") {
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
    getRequestChangeCenter, 
    responseRequest, 
    cancelledRequest,
    getMyRequests,
    requestChangeCenter,
    getMyRequestsAcceptDenyCenter,
    getMyRequestsAcceptDenyCareer
};
