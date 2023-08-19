const {Student, User, Multimedia, Enrollment, Section, Course, Career, Classroom, Building, PeriodAcademic} = require('../models');
const { getProfessor, getPeriodById} = require('../helpers/repositoryRequest');
const { Op } = require('sequelize');

const getStudents = async (req,res) =>{
    try{
        const students = await Student.findAll({include:{model: User, as:"user", include:[{model:Multimedia, as:"multimedia"}]}});
        res.status(200).json(students)
    }catch(err){
        console.log(err)
        res.status(500).json({messagge:"Error al cargar estudiantes"});
    }
}
const getStudentsEnrollmentPeriod = async (req,res) =>{
    try{
        
        const {idUser, idPeriod} = req.params
        const coordinador = await  getProfessor(idUser);

        const enrrolmentStudents = await  Student.findAll({
            include: 
            [
                {model:User, as:"user", attributes:["CENTER","ACCOUNT_NUMBER"]},
                {model:Enrollment, required: true,where:{STATE:"Matriculada"},include:
                    [
                        {model:Section, as:"seccion",required:true, where:{ID_PERIOD:idPeriod} ,include:
                        [
                            {model:Course, as:"course",required:true,include:
                                [
                                    {model:Career, as:"career", required:true, where:{
                                        NAME: {[Op.like]:  `${coordinador.CAREER}`}
                                    }}
                                ]
                            },
                            {
                                model:Classroom, as:"classroom", required:true,include:
                                [
                                    {model:Building, as:"building", required:true, where:{
                                        CENTER: {[Op.like]: `${coordinador.user.CENTER}`}
                                    }}
                                ]
                            },
                        ]
                    }
                    ]
                }
            ]
            
        })

        res.status(200).json({enrrolmentStudents})
    }catch(err){
        console.log(err)
        res.status(500).json({messagge:"Error al cargar estudiantes"});
    }
}

module.exports = {
    getStudents,
    getStudentsEnrollmentPeriod
};
