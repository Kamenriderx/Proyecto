
const {getClassroomsByCenter,getProfessor} = require('../helpers/repositoryClassroom');


const getClassrooms = async (req,res)=>{
    try {
        const {id} = req.params 
        const professor = await getProfessor(id)
        const classrooms = await getClassroomsByCenter(professor.user.CENTER,professor.CAREER)
        res.status(200).json({classrooms})
        
    } catch (error) {
        console.log({error});
        res.status(500).json({messagge:"ALGO SALIO MAL"})
    }
}



module.exports = {
    getClassrooms
};
