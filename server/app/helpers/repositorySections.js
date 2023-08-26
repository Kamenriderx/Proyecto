const {Section,Professor, Classroom, Building, Course, User, Career, PeriodAcademic, Enrollment} = require('../models');
const {Op, fn, col} = require('sequelize');

const getSectionsByCenterAndCareer = async (user) =>{
    const professor = await getProfessorIdUser(user);

    return await Section.findAll({
        where:{
            DELETED:0
        },include:[
            {model:Professor, as:"Proffessor",where:{CAREER:{
                [Op.like]:`${professor.CAREER.toUpperCase()}`
            }},include:[{model:User, as:"user", attributes:[ "ID_USER",
            "ID_ROLE","ACCOUNT_NUMBER","NAME",
            "DNI","CENTER",
            "EMAIL"]}]},
            {model:Classroom, as:"classroom",attributes:["NUMBER","AMOUNT_PEOPLE"],include:[
                {model:Building, as:"building",attributes:["NAME","CENTER"], where:{CENTER:{
                [Op.like]:`${user.CENTER.toUpperCase()}`
            }}},{
                model:Career, as:"career", where:{NAME:{
                    [Op.like]:`${professor.CAREER.toUpperCase()}`
                }}
            }]},
            {model:Course, as:"course",  required:true, attributes:["ID_COURSE","CODE_COURSE","NAME","UV"], include :
            [{
                model:Career, as:"career", attributes:["NAME","ID_DEPARTMENT"], where:{NAME:{
                    [Op.like]:`${professor.CAREER.toUpperCase()}`
                }}
            }]},
            {model:PeriodAcademic, as:"period", attributes:["ID_PERIOD","PERIOD_NAME", [fn("YEAR", col("START_DATE")), "YEAR"]]}
        ]
    })
}

const getSectionsByCenterAndCareerPeriod = async (user,currentPeriodId) =>{
    const professor = await getProfessorIdUser(user);

    return await Section.findAll({
        where:{
            ID_PERIOD:currentPeriodId, 
            DELETED:0
        },attributes:["SECTION_CODE","START_TIME","END_TIME","DAYS","SPACE_AVAILABLE","ID_SECTION"],include:[
            {model:Professor, as:"Proffessor",attributes:["INSTITUTIONAL_EMAIL","CAREER"],where:{CAREER:{
                [Op.like]:`${professor.CAREER.toUpperCase()}`
            }},include:[{model:User, as:"user", attributes:["NAME"]}]},
            {model:Classroom, as:"classroom",attributes:["NUMBER","AMOUNT_PEOPLE"],include:[
                {model:Building, as:"building",attributes:["NAME","CENTER"], where:{CENTER:{
                [Op.like]:`${user.CENTER.toUpperCase()}`
            }}},{
                model:Career, as:"career", where:{NAME:{
                    [Op.like]:`${professor.CAREER.toUpperCase()}`
                }}
            }]},
            {model:Course, as:"course",  required:true, attributes:["ID_COURSE","CODE_COURSE","NAME","UV"], include :
            [{
                model:Career, as:"career", attributes:["NAME","ID_DEPARTMENT"], where:{NAME:{
                    [Op.like]:`${professor.CAREER.toUpperCase()}`
                }}
            }]},
            {model:PeriodAcademic, as:"period", attributes:["PERIOD_NAME", [fn("YEAR", col("START_DATE")), "YEAR"]]}
        ]
    })
}

const getSectionsByCenterAndCareerPeriods = async (user,currentPeriodId,nextPeriodId) =>{
    const professor = await getProfessorIdUser(user);

    return await Section.findAll({
        where:{
            [Op.or]:[{
                ID_PERIOD:currentPeriodId, 
            }, { ID_PERIOD: nextPeriodId}],
            DELETED:0
        },attributes:["SECTION_CODE","START_TIME","END_TIME","DAYS","SPACE_AVAILABLE","ID_SECTION"],include:[
            {model:Professor, as:"Proffessor",attributes:["ID_PROFFERSSOR","INSTITUTIONAL_EMAIL","CAREER"],where:{CAREER:{
                [Op.like]:`${professor.CAREER.toUpperCase()}`
            }},include:[{model:User, as:"user", attributes:["NAME"]}]},
            {model:Classroom, as:"classroom",attributes:["ID_CLASSROOM", "ID_BUILDING","NUMBER","AMOUNT_PEOPLE"],include:[
                {model:Building, as:"building",attributes:["NAME","CENTER"], where:{CENTER:{
                [Op.like]:`${user.CENTER.toUpperCase()}`
            }}},{
                model:Career, as:"career", where:{NAME:{
                    [Op.like]:`${professor.CAREER.toUpperCase()}`
                }}
            }]},
            {model:Course, as:"course",  required:true, attributes:["ID_COURSE","CODE_COURSE","NAME","UV"], include :
            [{
                model:Career, as:"career", attributes:["NAME","ID_DEPARTMENT"], where:{NAME:{
                    [Op.like]:`${professor.CAREER.toUpperCase()}`
                }}
            }]},
            {model:PeriodAcademic, as:"period", attributes:["ID_PERIOD","PERIOD_NAME", [fn("YEAR", col("START_DATE")), "YEAR"]]}
        ]
    })
}
const getProfessorIdUser = async (user)=>{
    return await Professor.findOne({
        where:{
            ID_USER: user.ID_USER
        }
    })
}

const sectionExistsHourClassroom = async (body)=>{
    return await Section.findOne({
        where:{
            ID_SECTION:{
                [Op.ne]: body.ID_SECTION
            },
            ID_CLASSROOM: body.ID_CLASSROOM,
            START_TIME: body.START_TIME,
            END_TIME: body.END_TIME
        }
    })
}

const sectionbyProffessor = async (body)=>{
    return await Section.findOne({
        where:{
            ID_PROFFERSSOR: body.ID_PROFFERSSOR,
            START_TIME: body.START_TIME,
            END_TIME: body.END_TIME,
            DELETED:0
        }
    })
}

const getSection = async (body)=>{
    return await Section.findOne({
        where:{
            ID_SECTION: body.ID_SECTION
        },include:{
            model:Professor, as:"Proffessor"
        }
    })
}

const getSectionById = async (id)=>{
    return await Section.findOne({
        where:{
            ID_SECTION: id
        },include:{
            model:Professor, as:"Proffessor"
        }
    })
}

const getMyCourseEnded = async(idStudent) =>{
    return await Section.findAll({
        attributes:["DAYS",
        "SECTION_CODE",
        "START_TIME",
        "END_TIME",
        "SPACE_AVAILABLE",
        "ID_PERIOD"],include:[{model:Enrollment,as:"enrollments", attributes:["OBS",
        "CALIFICATION",
        "STATE",
        "ARRIVAL_NUMBER"], where:{
            ID_STUDENT:idStudent,
            STATE:"Finalizada",
            [Op.or]:[{
                OBS:"APR"
            },{
                OBS:"RPB"
            }] 
        }},{
            model:Course, as:"course", attributes:[ "CODE_COURSE",
            "NAME",
            "IS_SERVICE",
            "UV"]
        }]
    }) 
}
const getMyCourseAproved = async(idStudent) =>{
    return await Section.findAndCountAll({
        attributes:["DAYS",
        "SECTION_CODE",
        "START_TIME",
        "END_TIME",
        "SPACE_AVAILABLE",
        "ID_PERIOD"],include:[{model:Enrollment,as:"enrollments", attributes:["OBS",
        "CALIFICATION",
        "STATE",
        "ARRIVAL_NUMBER"], where:{
            ID_STUDENT:idStudent,
            STATE:"Finalizada",
            OBS:"APR"
            
        }},{
            model:Course, as:"course", attributes:["ID_COURSE" ,"CODE_COURSE",
            "NAME",
            "IS_SERVICE",
            "UV"]
        }]
    }) 
}
const getMyCoursePeriodPrev = async(idStudent,previousPeriod) =>{
    if (!previousPeriod) {
        return null
        
    }
    return await Section.findAll({
        where:{
            ID_PERIOD: previousPeriod.ID_PERIOD
        },attributes:["DAYS",
        "SECTION_CODE",
        "START_TIME",
        "END_TIME",
        "SPACE_AVAILABLE",
        "ID_PERIOD"],include:[{model:Enrollment,as:"enrollments", attributes:["OBS",
        "CALIFICATION",
        "STATE",
        "ARRIVAL_NUMBER"], where:{
            
            ID_STUDENT:idStudent,
            STATE:"Finalizada",
            [Op.or]:[{
                OBS:"APR"
            },{
                OBS:"RPB"
            }] 
        }},{
            model:Course, as:"course", attributes:[ "CODE_COURSE",
            "NAME",
            "IS_SERVICE",
            "UV"]
        }]
    }) 
}

const getMyIndexAcademic = (sections) =>{

    if (!sections) {
        return null
        
    }
    let sumPromUv =0
    let sumUv =0

    sections.map((section)=>{
        sumPromUv +=section.enrollments[0].CALIFICATION * section.course.UV
        sumUv += section.course.UV
    })
    
    return parseInt(sumPromUv/sumUv)
}

module.exports = {
    getSectionsByCenterAndCareer,
    getSectionsByCenterAndCareerPeriod,
    getProfessorIdUser,
    getSection,
    getSectionById,
    sectionExistsHourClassroom,
    sectionbyProffessor,
    getMyCourseEnded,
    getMyIndexAcademic,
    getMyCoursePeriodPrev,
    getMyCourseAproved,
    getSectionsByCenterAndCareerPeriods
};
