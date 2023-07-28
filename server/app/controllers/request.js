const { Career, Request, RequestCareer, User, Student } = require("../models");
const {getStudent, changeStateRequest, changeCareerStudent} = require('../helpers/repositoryRequest');

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
        console.log({body});

        const student = await getStudent(user.ID_USER)

        const url = `http://localhost:3000/docs/${file.filename}`
        await Request.create({JUSTIFY:body.JUSTIFY,ID_STUDENT:student.ID_STUDENT,requestCareer:[ {URL:url, ID_CAREER:body.ID_CAREER}]},{include:{model:RequestCareer, as:"requestCareer" }})

    



        res.status(200).send({messagge:"solicitud enviada"})


        
    } catch (error) {
        console.log({error})
        res.status(500).json({messagge:"ALGO SALIO MAL"})
    }
}

const getRequestChangeCareer = async (req,res)=>{
    try {
        const {user} = req;
        const student = await getStudent(user.ID_USER)
        const request = await Request.findAll({
            where:{
                STATE: "Pendiente"
            }, include:[{
                model:Student, as:"student", where:{CAREER:student.CAREER}, include:[{model:User, as:"user", attributes:["CENTER", "ACCOUNT_NUMBER"], where:{
                    CENTER: user.CENTER
                }}]
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
        const {body} = req
        await changeStateRequest(body)

        res.status(200).json({messagge:`La solicitud ha sido ${body.RESPONSE}`})
        
    } catch (error) {
        console.log({error})
        res.status(500).json({messagge:"ALGO SALIO MAL"})
    }
}

const cancelledRequest = async(req,res)=>{
    try {
        const {body} = req
        await changeStateRequest(body)

        
        res.status(200).json({messagge:`La solicitud ha sido ${body.RESPONSE}`})
        
    } catch (error) {
        console.log({error})
        res.status(500).json({messagge:"ALGO SALIO MAL"})
    }
}


const changeCareer = async(req,res)=>{
    try {
        const {body} = req
        await changeCareerStudent(body)

        res.status(200).json({messagge:"CAMBIO DE CARRERA"})
        
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
    cancelledRequest
};
