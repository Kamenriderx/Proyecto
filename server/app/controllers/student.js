const {Student, User, Multimedia, Enrollment, Section, Course, Career, Classroom, Building, PeriodAcademic} = require('../models');
const { getProfessor} = require('../helpers/repositoryRequest');
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
            where:{
                CAREER: {[Op.like]:  `${coordinador.CAREER}`}
            },
            include: 
            [
                {model:User, as:"user", attributes:["CENTER","ACCOUNT_NUMBER"],where:{
                    CENTER: {[Op.like]: `${coordinador.user.CENTER}`}
                }},
                {model:Enrollment, required: true, attributes:[],where:{STATE:"Matriculada"},include:
                    [
                        {model:Section, as:"seccion",required:true, where:{ID_PERIOD:idPeriod}
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
const getEnrollmentsStudent = async (req,res) =>{
    try{
        
        const {idStudent, idUser} = req.params
        const coordinador = await  getProfessor(idUser);
        
        const coursesEnrollments = await Enrollment.findAll({attributes:["ID_ENROLLMENT", "STATE","ID_STUDENT"],where:{
            ID_STUDENT: idStudent,
            STATE:"Matriculada"
        }, include:
        [
            {model:Section, as:"seccion", attributes:["ID_SECTION","DAYS",
            "SECTION_CODE",
            "START_TIME",
            "END_TIME"],required:true , include:
            [
                {model:Course, as:"course",required:true,attributes:
                [
                    "ID_COURSE",
                    "CODE_COURSE",
                    "NAME",
                    "UV",
                ], 
                include:
                [
                    {
                        model:Career,as:"career",attributes:[], required:true
                    }
                ]
            }
            ]
            },

        ]})


    
        res.status(200).json({coursesEnrollments})
    }catch(err){
        console.log(err)
        res.status(500).json({messagge:"Error al cargar estudiantes"});
    }
}

module.exports = {
    getStudents,
    getStudentsEnrollmentPeriod,
    getEnrollmentsStudent
};
