const {Student, User, Multimedia} = require('../models');

const getStudents = async (req,res) =>{
    try{
        const students = await Student.findAll({include:{model: User, as:"user", include:[{model:Multimedia, as:"multimedia"}]}});
        res.status(200).json(students)
    }catch(err){
        console.log(err)
        res.status(500).json({messagge:"Error al cargar estudiantes"});
    }
}

module.exports = {
    getStudents
};
