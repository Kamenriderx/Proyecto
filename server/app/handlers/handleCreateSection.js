const { Course, Section, Classroom, Professor } = require("../models");
const { Op } = require('sequelize');

const getCourse = async(id)=>{
   return await Course.findOne(
    {
        where:{
            ID_COURSE: id
        }
    }
    )
}
const getClassroom = async(body)=>{
   return await Classroom.findOne({
    where:{
        ID_CLASSROOM:body.ID_CLASSROOM,
    }
})
}

const sectionRange = async (body)=>{
    return await Section.findOne({
        where:{
            [Op.or]:[
                {[Op.and]:[
                    {
                        ID_CLASSROOM:body.ID_CLASSROOM,
                    },
                    {
                        START_TIME:{
                            [Op.lt]:body.START_TIME
                        },
                    },
                    {
                        END_TIME:{
                            [Op.gt]:body.START_TIME
                        },
                    },{DELETED : 0},{ID_PERIOD:body.ID_PERIOD}
                    
                ]},
                {[Op.and]:[
                    {
                        ID_CLASSROOM:body.ID_CLASSROOM,
                    },
                    {
                        START_TIME:{
                            [Op.eq]:body.START_TIME
                        },
                    },
                    {
                        END_TIME:{
                            [Op.gt]:body.START_TIME
                        },
                    },{DELETED : 0},{ID_PERIOD:body.ID_PERIOD}
                    
                ]},
                {[Op.and]:[
                    {
                        ID_CLASSROOM:body.ID_CLASSROOM,
                    },
                    {
                        START_TIME:{
                            [Op.gt]:body.START_TIME
                        },
                    },
                    {
                        END_TIME:{
                            [Op.gt]:body.START_TIME
                        },
                    },
                    {
                        START_TIME:{
                            [Op.lt]:body.END_TIME
                        },
                    },
                    {
                        END_TIME:{
                            [Op.lt]:body.END_TIME
                        },
                    },{DELETED : 0},{ID_PERIOD:body.ID_PERIOD}
                    
                ]},
                {[Op.and]:[
                    {
                        ID_CLASSROOM:body.ID_CLASSROOM,
                    },
                    {
                        START_TIME:{
                            [Op.lt]:body.END_TIME
                        },
                    },
                    {
                        END_TIME:{
                            [Op.gt]:body.END_TIME
                        },
                    },{DELETED : 0},{ID_PERIOD:body.ID_PERIOD}
                    
                ]},
                {[Op.and]:[
                    {
                        ID_CLASSROOM:body.ID_CLASSROOM,
                    },
                    {
                        START_TIME:{
                            [Op.lt]:body.END_TIME
                        },
                    },
                    {
                        END_TIME:{
                            [Op.eq]:body.END_TIME
                        },
                    },{DELETED : 0},{ID_PERIOD:body.ID_PERIOD}
                    
                ]},
            ]
                        
        }
    });
}

const sectionExists = async (body)=>{
    return await Section.findOne({
        where:{
            ID_CLASSROOM: body.ID_CLASSROOM,
            START_TIME: body.START_TIME,
            END_TIME: body.END_TIME,
            ID_PERIOD: body.ID_PERIOD,
            DELETED:0
        }
    })
}

const createSectionCode = async (body)=>{
    let sectionCode = ""
    const section = await Section.findOne({
        where:{
            ID_COURSE: body.ID_COURSE,
            SECTION_CODE: body.START_TIME
        }
    })

    if (!section) {
        sectionCode = body.START_TIME
    }

    if (parseInt(body.START_TIME) < 1000 && section != null ) {
        sectionCode = `0${parseInt(body.START_TIME)+1}` 
        
    }

    if (parseInt(body.START_TIME) >= 1000 && section != null) {
        sectionCode = `${parseInt(body.START_TIME)+1}` 
        
    }

    return sectionCode

}

const getProfessor = async (body)=>{
    return await Professor.findOne({
        where:{
            ID_PROFFERSSOR: body.ID_PROFFERSSOR
        }
    })
}

const getSectionsProffessor = async (IdProfersor,idPeriod)=>{
    return await Section.findAndCountAll({
        where:{
            ID_PROFFERSSOR:IdProfersor,
            DELETED:0,
            ID_PERIOD: idPeriod
        }
    })
}

const validateSchedule=  async(body)=>{
    let section = await Section.findOne({
        where:{
            [Op.or]:[
                {[Op.and]:[
                    {
                        ID_PROFFERSSOR:body.ID_PROFFERSSOR,
                    },
                    {
                        START_TIME:{
                            [Op.lt]:body.START_TIME
                        },
                    },
                    {
                        END_TIME:{
                            [Op.gt]:body.START_TIME
                        },
                    },
                    {
                        DAYS:{
                            [Op.eq]:body.DAYS
                        },
                    },
                    
                ]},
                {[Op.and]:[
                    {
                        ID_PROFFERSSOR:body.ID_PROFFERSSOR,
                    },
                    {
                        START_TIME:{
                            [Op.eq]:body.START_TIME
                        },
                    },
                    {
                        END_TIME:{
                            [Op.eq]:body.END_TIME
                        },
                    },
                    {
                        DAYS:{
                            [Op.eq]:body.DAYS
                        },
                    },
                    
                ]},
                {[Op.and]:[
                    {
                        ID_PROFFERSSOR:body.ID_PROFFERSSOR,
                    },
                    {
                        START_TIME:{
                            [Op.eq]:body.START_TIME
                        },
                    },
                    {
                        END_TIME:{
                            [Op.gt]:body.START_TIME
                        },
                    },
                    {
                        DAYS:{
                            [Op.eq]:body.DAYS
                        },
                    },
                    
                ]},
                {[Op.and]:[
                    {
                        ID_PROFFERSSOR:body.ID_PROFFERSSOR,
                    },
                    {
                        START_TIME:{
                            [Op.gt]:body.START_TIME
                        },
                    },
                    {
                        END_TIME:{
                            [Op.gt]:body.START_TIME
                        },
                    },
                    {
                        START_TIME:{
                            [Op.lt]:body.END_TIME
                        },
                    },
                    {
                        END_TIME:{
                            [Op.lt]:body.END_TIME
                        },
                    },
                    {
                        DAYS:{
                            [Op.eq]:body.DAYS
                        },
                    },
                    
                ]},
                {[Op.and]:[
                    {
                        ID_PROFFERSSOR:body.ID_PROFFERSSOR,
                    },
                    {
                        START_TIME:{
                            [Op.lt]:body.END_TIME
                        },
                    },
                    {
                        END_TIME:{
                            [Op.gt]:body.END_TIME
                        },
                    },
                    {
                        DAYS:{
                            [Op.eq]:body.DAYS
                        },
                    },
                    
                ]},
                {[Op.and]:[
                    {
                        ID_PROFFERSSOR:body.ID_PROFFERSSOR,
                    },
                    {
                        START_TIME:{
                            [Op.lt]:body.END_TIME
                        },
                    },
                    {
                        END_TIME:{
                            [Op.eq]:body.END_TIME
                        },
                    },
                    {
                        DAYS:{
                            [Op.eq]:body.DAYS
                        },
                    },
                    
                ]},
            ]
                        
        }
    }); 


    return (section)? true : false;
    

}


module.exports = {
    getCourse,
    getClassroom,
    sectionRange,
    sectionExists,
    createSectionCode,
    getProfessor,
    validateSchedule,
    getSectionsProffessor   
}
