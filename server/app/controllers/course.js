const { Course } = require("../models");
const {getProfessor,getCourses} = require('../handlers/handleGetCourses');

const listCourses = async (req,res)=>{
    try {
        const {id} = req.params
        const professor = await getProfessor(id)
        const courses = await getCourses(professor.CAREER)

        res.status(200).json({courses})
        
    } catch (error) {
        console.log({error})
        res.status(500).json({messagge:"ALGO SALIO MAL"})
    }
}

module.exports = {
    listCourses
};
