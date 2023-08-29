const { Op } = require('sequelize');
const {Student, User, Multimedia, Professor} = require('../models');
const { getCurrentPeriod } = require('../helpers/repositoryEnrollment');
const { getAcademicPeriodDetails } = require('../middlewares/indexAcademic');
const { getMyCoursePeriodPrev, getMyIndexAcademic, getMyCourseEnded } = require('../helpers/repositorySections');

const getStudents = async (req,res) =>{
    try{
        const students = await Student.findAll({include:{model: User, as:"user"}});
        res.status(200).json(students)
    }catch(err){
        console.log(err)
        res.status(400).json({messagge:"Error al cargar estudiantes"});
    }
}

const getPerfil = async (req,res)=>{
    try {
        const {id} = req.params;
        let user ={};
    

        
        

        if (parseInt(id) === req.user.ID_USER) {    
            user = await getInfo(id,req.user.ID_ROLE);   
        };

        if (!user) {
            res.status(404).json({messagge:"El usuario no existe"})
            return
            
        }
        if (req.user.ID_ROLE == 1) {
            
            const courses = await getMyCourseEnded(user.ID_STUDENT)
            const currentPeriod= await getCurrentPeriod()
            let indexAcademicGlobal = 0
            let indexAcademicPeriod = 0
            let quantityCourses = courses.length
            indexAcademicGlobal = await getMyIndexAcademic(courses) || 0
            if(currentPeriod){
                const {previousPeriod} = await getAcademicPeriodDetails(currentPeriod.ID_PERIOD)
                const coursesPeriodPrev = await getMyCoursePeriodPrev(user.ID_STUDENT,previousPeriod)

                indexAcademicPeriod = await getMyIndexAcademic(coursesPeriodPrev) || 0
            }

            
            res.status(200).json({
                user,
                role: req.user.ID_ROLE,
                indexAcademicGlobal,
                quantityCourses
            })

            return

            
        }

        

        res.status(200).json({
            user,
            role: req.user.ID_ROLE
        })
        
    } catch (error) {
        console.log(error);
        res.status(400).json({messagge:"Algo salio mal"})
    }
}

//  ----------------------------------------------------------------------------------------
//  funciones getPerfil
// ----------------------------------------------------------------------------------------

async function  getInfo(id,role){
    let user ={}
    

    switch (role) {
        case 1:
            user = await Student.findOne({where:{
                ID_USER: id
        
            },include:{attributes:["ID_ROLE","ACCOUNT_NUMBER","NAME","DNI","CENTER","EMAIL"],model:User, as:"user",include:[{model:Multimedia, as:"multimedia", where:{IS_PROFILE:1}}]}}) || await Student.findOne({where:{
                ID_USER: id
        
            },include:{attributes:["ID_ROLE","ACCOUNT_NUMBER","NAME","DNI","CENTER","EMAIL"],model:User, as:"user", include:[{model:Multimedia, limit:1, as:"multimedia"}]}})
            break;
        case 2 :

            user = await Professor.findOne({where:{
                ID_USER: id
        
            },include:{attributes:["ID_ROLE","ACCOUNT_NUMBER","NAME","DNI","CENTER","EMAIL"],model:User, as:"user",include:[{model:Multimedia, as:"multimedia", where:{IS_PROFILE:1}}]}}) || await Professor.findOne({where:{
                ID_USER: id
        
            },include:{attributes:["ID_ROLE","ACCOUNT_NUMBER","NAME","DNI","CENTER","EMAIL"],model:User, as:"user",include:[{model:Multimedia, as:"multimedia"}]}})

            
            break;
            case 3 :

            user = await Professor.findOne({where:{
                ID_USER: id
        
            },include:{attributes:["ID_ROLE","ACCOUNT_NUMBER","NAME","DNI","CENTER","EMAIL"],model:User, as:"user",include:[{model:Multimedia, as:"multimedia", where:{IS_PROFILE:1}}]}}) || await Professor.findOne({where:{
                ID_USER: id
        
            },include:{attributes:["ID_ROLE","ACCOUNT_NUMBER","NAME","DNI","CENTER","EMAIL"],model:User, as:"user",include:[{model:Multimedia, as:"multimedia"}]}})

            
            break;
            case 4 :

            user = await Professor.findOne({where:{
                ID_USER: id
        
            },include:{attributes:["ID_ROLE","ACCOUNT_NUMBER","NAME","DNI","CENTER","EMAIL"],model:User, as:"user",include:[{model:Multimedia, as:"multimedia", where:{IS_PROFILE:1}}]}}) || await Professor.findOne({where:{
                ID_USER: id
        
            },include:{attributes:["ID_ROLE","ACCOUNT_NUMBER","NAME","DNI","CENTER","EMAIL"],model:User, as:"user",include:[{model:Multimedia, as:"multimedia"}]}})

            
            break;
         
            
            default:
                user = await User.findOne({where:{
                    ID_USER : id
                }});
            break;
    }


    return user

}


//  ----------------------------------------------------------------------------------------
//  fin
// ----------------------------------------------------------------------------------------


//  ----------------------------------------------------------------------------------------
//  ACTUALIZAR EL EMAIL
// ----------------------------------------------------------------------------------------

const updateEmail = async (req,res)=>{
    try {
        const {id} = req.params
        const {body} = req
      
        if(!body.EMAIL){
            res.status(406).json({
                messagge:"No se ha definido"
            })
            return

        }
        
        if (parseInt(id)!==req.user.ID_USER) {
            res.status(401).json({messagge:"No tienes permiso para editar este perfil"})
            return
            
        }

        const result = await getInfo(id,req.user.ID_ROLE)

        if (!result) {
            res.status(404).json({messagge:"El usuario no existe"})
            return
            
        }
        
        if(body.EMAIL==""){
            res.status(406).json({
                messagge:"El email está en blanco"
            })
            return
            
        }
        if ((req.body.EMAIL == result.user.EMAIL) && (id == req.user.ID_USER)){
            res.status(400).json({
                messagge:"Ingesa un correo diferente al que estas ya tienes"
            })    
            return
            
        }
      
        if (await emailExists(body.EMAIL)){
            res.status(400).json({
                messagge:"El correo ya existe, deberías elegir otro"
            })    
            return
        }
        

    
        await User.updateEmail(id,body.EMAIL)
        res.status(200).json({
        messagge:"Correo actualizado"
        })
        
    } catch (error) {
        console.log(error);
        res.status(400).json({messagge:"Algo salio mal"})
    }
}
//  ----------------------------------------------------------------------------------------
//  fin
// ----------------------------------------------------------------------------------------


//  ----------------------------------------------------------------------------------------
//  SUBIR FOTOS
// ----------------------------------------------------------------------------------------


const uploadPhotos =  async (req, res, next) => {
    // La matriz de archivos se encuentra en req.files
    // console.log(req.files);
    // res.send('Archivos subidos correctamente');

    try {
        const {files, user} = req;
        const {id} = req.params;

        if (parseInt(id)!==user.ID_USER) {
            res.status(401).json({messagge:"No tienes permiso para editar este perfil"})
            return
            
        }
        const result = await getInfo(id, user.ID_ROLE)

        if (!result) {
            res.status(404).json({messagge:"El usuario no existe"})
            return
            
        }

        if(files.length == 0){
            res.status(400).json({messagge: "No has enviado ninguna imagen"})
            return

        }
        if(files.length >= 4){
            res.status(400).json({messagge: "Solo puedes subir 3 imágenes"})
            return

        }

        const flag = await validationImg(res,id,files);
        
        if (flag) {
            await uploadImg(files, id)
            res.status(200).json({messagge:"Fotos de perfil actualizadas"})
            return    
        }

        if(!flag){
            res.status(400).json({messagge:"Debes eliminar una o más imágenes, Solo puedes tener 3 en tu perfil"})
            return
        }
        
    } catch (error) {
        console.log({error});
        res.status(400).json({messagge:"Algo salio mal"})
    }
}
//  ----------------------------------------------------------------------------------------
//  fin
// ----------------------------------------------------------------------------------------
//  ----------------------------------------------------------------------------------------
//  UPLOAD VIDEO
// ----------------------------------------------------------------------------------------
const uploadVideo = async (req, res) => {
    
    try {
        
        const {file, user} = req;
        const {id} = req.params;

        if (parseInt(id)!==user.ID_USER) {
            res.status(401).json({messagge:"No tienes permiso para editar este perfil"})
            return
            
        }
        const result = await getInfo(id, user.ID_ROLE)

        if (!result) {
            res.status(404).json({messagge:"El usuario no existe"})
            return
            
        }

        if(!file){
            res.status(400).json({messagge: "No has subido ningún video"})
            return
        }

        const multi = await Multimedia.findAll({
            where:{
                [Op.and]:[
                    {ID_USER: id},
                    {IS_PROFILE:1}
                ]
            }
        });

        if(multi.length==1){
            res.status(400).json({messagge:"Solo puedes subir un video"})
            return
        }


    
        const url = `http://localhost:3000/videos/${file.filename}`;
        await Professor.updateVideo(id,url);
        res.status(200).json({messagge:"video subido"})
        
    } catch (error) {
        console.log({error});
        res.status(400).json({error})
    }


}
//  ----------------------------------------------------------------------------------------
//  fin
// ----------------------------------------------------------------------------------------

//  ----------------------------------------------------------------------------------------
//   DELETE  Multimedia
// ----------------------------------------------------------------------------------------

const deleteMultimedia = async(req,res)=>{
    try {
        const {id} = req.params;
        const multimedia = await Multimedia.findOne(
            {
              where:{
                ID_MULTIMEDIA: id
              }   
            }
        );

        if (!multimedia) {
            res.status(404).json({messagge:"El archivo no existe"});
            return 
        }
        const IdUser = multimedia.dataValues.ID_USER;
       
        if (IdUser !== req.user.ID_USER ) {
            res.status(400).json({messagge:"No tienes permiso para eliminar este archivo"})
            return
        }

        await deleteFile(id);
        res.status(200).json({messagge:"Archivo eliminado"});




        
    } catch (error) {
        console.log({error});
        res.status(400).json({error})
    }

}


//  ----------------------------------------------------------------------------------------
//  fin
// ----------------------------------------------------------------------------------------



//  ----------------------------------------------------------------------------------------
//  FUNCIONES COMUNES 
// ----------------------------------------------------------------------------------------
async function emailExists(email){
    const result = await User.findOne({where:{EMAIL:email}});
    return (!result) ? false :true;

}

async function uploadImg(files,id){
    // await changeProfile(id);
    files.map(async (file) =>{
        const url = `http://localhost:3000/images/${file.filename}`;
        await Student.updateProfile(id,url);
           
    })
}

async function validationImg(res,id,files){
    let flag = false
    const multi = await Multimedia.findAll({
        where:{
            [Op.and]:[
                {ID_USER: id},
                {IS_PROFILE:1}
            ]
        }
    });

    if (multi.length == 3 ) {
        return flag
    }

    switch (files.length) {
        case 1:
            if(multi.length == 2 || multi.length == 1 || multi.length == 0){
                flag = true

            }
            break;
    
        case 2:
            if(multi.length == 1 || multi.length == 0){
                flag = true

            }

            break;

        case 3:
            if(multi.length == 0){
                flag = true

            }
            
            break;    
        default:
            break;
    }



    return flag

}
//  ----------------------------------------------------------------------------------------
//  fin
// ----------------------------------------------------------------------------------------




async function deleteFile(id){
   /*  await User.connection.query("UPDATE multimedia SET IS_PROFILE = :NEW_PROFILE WHERE ID_MULTIMEDIA= :ID_MULTIMEDIA",{replacements:{
        NEW_PROFILE: 0,
        ID_MULTIMEDIA: id

    }})
   */
  await Multimedia.destroy({where:{ID_MULTIMEDIA:id}});
  
}


module.exports = {
    getStudents,
    getPerfil,
    updateEmail,
    uploadPhotos,
    uploadVideo,
    deleteMultimedia
};
