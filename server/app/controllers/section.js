const {Section} = require('../models');
const {getCourse, getClassroom} = require('../handlers/handleCreateSection');
const { Op } = require('sequelize');



const createSection = async(req,res)=>{
    try {
        const {body} = req
        const course = await getCourse(body.ID_COURSE);
        const classroom = await getClassroom(body);

        const section = await Section.findOne({
            where:{
                [Op.or]:[
                    {[Op.and]:[
                        {
                            ID_CLASSROOM:body.ID_CLASSROOM,
                        },
                        {
                            START_TIME:body.START_TIME,
                        }
                        
                    ]},
                    {[Op.and]:[
                        {
                            ID_CLASSROOM:body.ID_CLASSROOM,
                        },
                        {
                            END_TIME:body.END_TIME,
                        }
                        
                    ]}
                ]
                            
            }
        }); 


        if ( section != null && parseInt(body.START_TIME) >= parseInt(section.START_TIME) && parseInt(body.END_TIME) <= parseInt(section.END_TIME) ) {
            res.status(400).json({messagge:"EL AULA ESTA OCUPADA"});
            return
        }
        console.log({section})

        if (body.SECTION_CODE == section.SECTION_CODE && course != null) {
            res.status(400).json({messagge:"LA SECCION YA EXISTE"});
            return
        }

        res.status(200).json({body,course,classroom})
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }
}




module.exports = {
    createSection
    
};
