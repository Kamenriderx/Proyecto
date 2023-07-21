const { Classroom, Building } = require("../models");

const getClassrooms = async (req,res)=>{
    try {

        const classrooms = await Classroom.findAll({
            include:{model:Building, as:"building"}
        })
        res.status(200).json({classrooms})
        
    } catch (error) {
        console.log({error});
        res.status(500).json({messagge:"ALGO SALIO MAL"})
    }
}



module.exports = {
    getClassrooms
};
