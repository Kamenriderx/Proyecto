const {getCourse, getClassroom, sectionRange, sectionExists,createSectionCode, getProfessor, validateSchedule} = require('../handlers/handleCreateSection');
const { Section, Professor, User } = require('../models');
const {getProfessorIdUser, getSectionsByCenterAndCareer,getSection, sectionExistsHourClassroom,sectionbyProffessor} = require('../helpers/repositorySections');




const createSection = async(req,res)=>{
    try {
        const {body} = req
        const course = await getCourse(body.ID_COURSE);
        const classroom = await getClassroom(body);
        const professor = await getProfessor(body);
        let section = await sectionRange(body) 
        body.SPACE_AVAILABLE = (body.SPACE_AVAILABLE == null || body.SPACE_AVAILABLE==0) ? classroom.AMOUNT_PEOPLE : body.SPACE_AVAILABLE

        if (parseInt(body.START_TIME) > parseInt(body.END_TIME)) {
            res.status(400).json({messagge:"LA HORA DE INICIO DEBE SER MAYOR A LA HORA DE FINALIZACION"});
            return
            
        }
        if (section && (section.DAYS.includes(body.DAYS) || body.DAYS.includes(section.DAYS))) {
            res.status(400).json({messagge:"EL AULA ESTA OCUPADA EN ESE HORARIO"});
            return    
        }
        if (section && section.DAYS == body.DAYS) {
            res.status(400).json({messagge:"EL AULA ESTA OCUPADA EN ESE HORARIO Y ESOS DIAS"});
            return    
        }
        
        
        section = await sectionExists(body);

        if (section && section.DAYS == body.DAYS ) {
            res.status(400).json({messagge:"YA EXISTE UNA SECCION CON ESE MISMO HORARIO Y ESOS MISMOS DIAS EN ESTA AULA"});
            return    
        }
        let diff = (parseInt(body.END_TIME) - parseInt(body.START_TIME))/100
        if(course.UV != body.DAYS_COUNT && diff < course.UV  ){
            res.status(400).json({messagge:"EL HORARIO NO CUMPLE LA TOTALIDAD DE UNIDADES VALORATIVAS"});
            return


        }
        if(course.UV != body.DAYS_COUNT && diff > course.UV  ){
            res.status(400).json({messagge:"LAS HORAS ASIGNADAS SON MAS DE LAS QUE LA ASIGNATURA NECESITA"});
            return


        }
    
        if (professor.sections.length == 5 ) {
            res.status(400).json({messagge:"EL DOCENTE YA TIENE ASIGNADAS 5 SECCIONES"});
            return
        }
        sectionPro = await sectionbyProffessor(body)
        if (await validateSchedule(body) || (sectionPro && sectionPro.START_TIME == body.START_TIME && sectionPro.END_TIME == body.END_TIME &&  (sectionPro.DAYS.includes(body.DAYS) || body.DAYS.includes(sectionPro.DAYS)))  ) {
         
            res.status(400).json({messagge:"EL DOCENTE YA TIENE UNA SECCION A ESA HORA Y ESOS DIAS"});
            return
            
        }

        


        body.SECTION_CODE = await createSectionCode(body);

        await Section.create(body)


        res.status(200).json({messagge:"SECCIÓN CREADA DE FORMA CORRECTA"})
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }
}

const listSections = async (req,res)=>{
    try {
        const {user} = req
        const sections = await getSectionsByCenterAndCareer(user)
        res.status(200).json({sections})
    } catch (error) {
        console.log({error})
        res.status(500).json({messagge:"ALGO SALIO MAL"})
    }
}

const getProfessorsByCenterAndCarrer = async(req,res)=>{
    try {
        const {user} = req
        const professor = await getProfessorIdUser(user);
        const professors = await Professor.findAll({
            where:{
                CAREER:professor.CAREER

            },include:{
                model:User,
                as:"user",
                where:{
                    CENTER:user.CENTER
                }, attributes:[ "ID_USER",
                "ID_ROLE","ACCOUNT_NUMBER","NAME",
                "DNI","CENTER",
                "EMAIL"]
            }
        })
        res.status(200).json({professors})    
    } catch (error) {
        console.log({error})
        res.status(500).json({messagge:"ALGO SALIO MAL"})
    }
}


const deleteSection = async (req,res)=>{
    try {
        const {id} = req.params
        const {body}= req
        
        await Section.update({DELETED:1,JUSTIFY: body.JUSTIFY},{where:{ID_SECTION:id}})

        res.status(200).json({messagge:"SECCION ELIMINADA CORRECTAMENTE"})


        
    } catch (error) {
        console.log({error})
        res.status(500).json({messagge:"ALGO SALIO MAL"})
    }
}

const updateSection = async (req,res)=>{
    try {
        const {body}= req
        body.ID_SECTION = req.params.id
        const professor = await getProfessor(body);
        let section = await getSection(body);
        const course = await getCourse(body.ID_COURSE);
        const classroom = await getClassroom(body);
        body.SPACE_AVAILABLE = (body.SPACE_AVAILABLE == null || body.SPACE_AVAILABLE==0) ? classroom.AMOUNT_PEOPLE : body.SPACE_AVAILABLE
        
        if (parseInt(section.ID_PROFFERSOR) != parseInt(body.ID_PROFFERSOR)) {
            if (professor.sections.length == 5 ) {
                res.status(400).json({messagge:"EL DOCENTE YA TIENE ASIGNADAS 5 SECCIONES"});
                return
            }


            
        }
        
        if (parseInt(body.START_TIME) > parseInt(body.END_TIME)) {
            res.status(400).json({messagge:"LA HORA DE INICIO DEBE SER MAYOR A LA HORA DE FINALIZACION"});
            return
            
        }
        section = await sectionExistsHourClassroom(body);
        if (section &&  (section.DAYS.includes(body.DAYS) || body.DAYS.includes(section.DAYS))) {
            res.status(400).json({messagge:"EL AULA ESTA OCUPADA EN ESE HORARIO"});
            return    
        }
        if (section &&  section.DAYS == body.DAYS) {
            res.status(400).json({messagge:"EL AULA ESTA OCUPADA EN ESE HORARIO Y ESOS DIAS"});
            return    
        }
        
            

        if (section && section.DAYS == body.DAYS ) {
            res.status(400).json({messagge:"YA EXISTE UNA SECCION CON ESE MISMO HORARIO Y ESOS MISMOS DIAS EN ESTA AULA"});
            return    
        }
        let diff = (parseInt(body.END_TIME) - parseInt(body.START_TIME))/100
        if(course.UV != body.DAYS_COUNT && diff < course.UV  ){
            res.status(400).json({messagge:"EL HORARIO NO CUMPLE LA TOTALIDAD DE UNIDADES VALORATIVAS"});
            return


        }
        if(course.UV != body.DAYS_COUNT && diff > course.UV  ){
            res.status(400).json({messagge:"LAS HORAS ASIGNADAS SON MAS DE LAS QUE LA ASIGNATURA NECESITA"});
            return


        }
        
        sectionPro = await sectionbyProffessor(body)
        let validate = await validateSchedule(body)
        if ( validate && sectionPro.ID_PROFFERSSOR != body.ID_PROFFERSSOR  || (sectionPro && sectionPro.ID_PROFFERSSOR != body.ID_PROFFERSSOR && sectionPro.START_TIME == body.START_TIME && sectionPro.END_TIME == body.END_TIME &&  (sectionPro.DAYS.includes(body.DAYS) || body.DAYS.includes(sectionPro.DAYS)))  ) {
         
            res.status(400).json({messagge:"EL DOCENTE YA TIENE UNA SECCION A ESA HORA Y ESOS DIAS"});
            return
            
        }

        body.SECTION_CODE = await createSectionCode(body);
        await Section.update({
            ID_CLASSROOM:body.ID_CLASSROOM, 
            ID_PROFFERSSOR:body.ID_PROFFERSSOR, 
            ID_COURSE:body.ID_COURSE ,
            DAYS:body.DAYS , 
            SECTION_CODE:body.SECTION_CODE ,
            START_TIME:body.START_TIME ,
            END_TIME:body.END_TIME,
            SPACE_AVAILABLE:body.SPACE_AVAILABLE
        },{where:{ID_SECTION:body.ID_SECTION}})




        res.status(200).json({messagge:"SECCION ACTUALIZADA CORRECTAMENTE"})


        
    } catch (error) {
        console.log({error})
        res.status(500).json({messagge:"ALGO SALIO MAL"})
    }
}

module.exports = {
    createSection,
    listSections,
    getProfessorsByCenterAndCarrer,
    deleteSection,
    updateSection
    
};
