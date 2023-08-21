const { Op } = require("sequelize");
const { Enrollment, Section, PeriodAcademic, Course } = require("../models");
const { getStudentById, getStudent } = require("./repositoryRequest");

const saveEnrollment = async (body)=>{
    const student = await getStudentById(body.ID_STUDENT)
    const seccion = await getSection(body.ID_SECTION)
    student.UV_AVAILABLE -=  seccion.course.UV
    await student.save();
    await updateSection(body.ID_SECTION);
    await Enrollment.create(body);
}

const getQuantityEnrollmentsCourse = async (idSection) => {
    const enrollments = await Enrollment.findAndCountAll({
        where:{
            ID_SECTION: idSection,
            STATE: "Matriculada"
        },include:[{model:Section, as:"seccion", include:[{model:PeriodAcademic, as:"period", where:{STATUS:"En curso"}}]}]
    })

    return enrollments.count
}
const getEnrollmentsCourse = async (idStudent) => {
    return await Enrollment.findAll({
        where:{
            ID_STUDENT: idStudent,
            STATE: "Matriculada"
        },include:[{model:Section, as:"seccion", include:
        [
            {model:PeriodAcademic, as:"period", where:{STATUS:"En curso"}},
            {model:Course, as:"course"}
        ]}]
    })

    
}
const getQuantityEnrollmentsWaitCourse = async (idSection) => {
    const enrollments = await Enrollment.findAndCountAll({
        where:{
            ID_SECTION: idSection,
            STATE: "En espera"
        },include:[{model:Section, as:"seccion", include:[{model:PeriodAcademic, as:"period", where:{STATUS:"En curso"}}]}]
    })

    return enrollments.count
}

const updateSection = async (idSection)=>{
    const section = await getSection(idSection)
    if (section.SPACE_AVAILABLE > 0) {
        section.SPACE_AVAILABLE = section.SPACE_AVAILABLE - 1;
    }
    await section.save(); 
    
}

const getSpaceAvailableAndUv = async (idSection)=>{
    const section= await getSection(idSection)
    return {spaceAvailable:section.SPACE_AVAILABLE, uvSection: section.course.UV}

}

const getSection = async (idSection)=>{
    return await await Section.findOne({where:{
        ID_SECTION:idSection
    }, include:[{model:Course, as:"course"}]});
}

const getSectionEnrollmentStudent = async (idStudent) =>{
   
    return await Enrollment.findAll({
        attributes:[
            "ID_ENROLLMENT",
            "STATE",
            "ARRIVAL_NUMBER"
        ],where:{ID_STUDENT : idStudent,STATE:"Matriculada"}, include:[{model:Section,
            attributes:
            [
                "ID_SECTION",
                "DAYS",
                "SECTION_CODE",
                "START_TIME",
                "END_TIME"
            ], as:"seccion", include:
            [
                {model:Course, as:"course" , attributes:["ID_COURSE","CODE_COURSE","NAME","UV"]},
                {model:PeriodAcademic, as:"period", attributes:
                [
                    "ID_PERIOD",
                    "PERIOD_NAME"
                ] },
            ]
        }]
    })
}
const getAllSectionsEnrollmentsStudent = async (idStudent) =>{
   
    return await Enrollment.findAll({
        attributes:[
            "ID_ENROLLMENT",
            "STATE",
            "ARRIVAL_NUMBER"
        ],where:{ID_STUDENT : idStudent,[Op.or]:[{STATE:"Matriculada"}, {STATE:"En Espera"}]}, include:[{model:Section,
            attributes:
            [
                "ID_SECTION",
                "DAYS",
                "SECTION_CODE",
                "START_TIME",
                "END_TIME"
            ], as:"seccion", include:
            [
                {model:Course, as:"course" , attributes:["ID_COURSE","CODE_COURSE","NAME"]},
                {model:PeriodAcademic, as:"period", attributes:
                [
                    "ID_PERIOD",
                    "PERIOD_NAME"
                ] },
            ]
        }]
    })
}
const getSectionWaitingStudent = async (idStudent) =>{
   
    return await Enrollment.findAll({
        attributes:[
            "ID_ENROLLMENT",
            "STATE",
            "ARRIVAL_NUMBER"
        ],where:{ID_STUDENT : idStudent,STATE:"En Espera"}, include:[{model:Section,
            attributes:
            [
                "ID_SECTION",
                "DAYS",
                "SECTION_CODE",
                "START_TIME",
                "END_TIME"
            ], as:"seccion", include:
            [
                {model:Course, as:"course" , attributes:["ID_COURSE","CODE_COURSE","NAME","UV"]},
                {model:PeriodAcademic, as:"period", attributes:
                [
                    "ID_PERIOD",
                    "PERIOD_NAME"
                ] },
            ]
        }]
    })
}

const verifySections = async (sections,idSection)=>{
    const seccion = await getSection(idSection);
    
    let data = sections.filter((section)=>{

        const result= (
            (section.seccion.START_TIME  == seccion.START_TIME && (section.seccion.DAYS.includes(seccion.DAYS) ||seccion.DAYS.includes(section.seccion.DAYS))) || (section.seccion.START_TIME  < seccion.START_TIME && section.seccion.DAYS.includes(seccion.DAYS) && ( section.seccion.END_TIME  > seccion.END_TIME   )    ) || section.seccion.ID_SECTION  == seccion.ID_SECTION )
    
        return result
    })

    return data

}

const getCurrentPeriod = async ()=>{
    return await PeriodAcademic.findOne({where:{
        STATUS:"En curso"
    }})
}

const cancelInscription=async (idEnrollment, idUser)=>{
    const student = await getStudent(idUser)
    const enrollment = await Enrollment.findOne({where:{ID_ENROLLMENT: idEnrollment}, include:[{model:Section, as:"seccion", include:[{model:Course, as:"course"}]}]});
    const section = await getSectionById(enrollment.seccion.ID_SECTION);
    
    if (enrollment.STATE !="Cancelada" ) {
        if (enrollment.STATE != "En Espera") {
            section.SPACE_AVAILABLE +=1
            await section.save();    
            
        }
        student.UV_AVAILABLE += enrollment.seccion.course.UV;
        enrollment.STATE = 'Cancelada'
        await enrollment.save();  
        await student.save();  

    }
}

const specialCancelInscription= async(idEnrollment, idUser)=>{
    const student = await getStudentById(idUser)
    const enrollment = await Enrollment.findOne({where:{ID_ENROLLMENT: idEnrollment}, include:[{model:Section, as:"seccion", include:[{model:Course, as:"course"}]}]});
    
    if (enrollment.STATE !="Cancelada" ) {
        
        student.UV_AVAILABLE += enrollment.seccion.course.UV;
        enrollment.STATE = 'Cancelada'
        await enrollment.save();  
        await student.save();  

    }
    

}
const getSectionById= async (idSection)=> await Section.findOne({where:{ID_SECTION:idSection}, include:[{model:Course, as:"course"}]})

const getEnrollmentByName = async (idStudent, name) => await Enrollment.findOne({
    attributes:[
        "ID_ENROLLMENT",
        "STATE",
        "ARRIVAL_NUMBER"
    ],where:{ID_STUDENT : idStudent,[Op.or]:[{STATE:"Matriculada"}, {STATE:"En Espera"}]}, include:[{model:Section,
        attributes:
        [
            "ID_SECTION",
            "DAYS",
            "SECTION_CODE",
            "START_TIME",
            "END_TIME"
        ], as:"seccion",required:true ,include:
        [
            {model:Course, as:"course" , required:true,attributes:["ID_COURSE","CODE_COURSE","NAME"], where:{NAME:name}},
            {model:PeriodAcademic, as:"period", attributes:
            [
                "ID_PERIOD",
                "PERIOD_NAME"
            ] },
        ]
    }]
})



// START_TIME  
// END_TIME
module.exports = {
    saveEnrollment,
    getQuantityEnrollmentsCourse,
    getQuantityEnrollmentsWaitCourse,
    getSpaceAvailableAndUv,
    verifySections,
    getCurrentPeriod,
    getEnrollmentsCourse,
    getSectionEnrollmentStudent,
    getSectionWaitingStudent,
    cancelInscription,
    getAllSectionsEnrollmentsStudent,
    getSectionById,
    getEnrollmentByName,
    specialCancelInscription
};
