const { Op } = require('sequelize');
const {Student, User, Multimedia, Professor} = require('../models');
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
        console.log(id)
        let user ={}
        

        if (parseInt(id) === req.user.ID_USER) {    
            user = await getInfo(id,req.user.ID_ROLE);   
        };

/*         if(parseInt(id) !== req.user.ID_USER) {
            user = await getInfo(id,5);
            // if ((req.user.ID_ROLE ==1 && user.dataValues.user.ID_ROLE == 1)) {
            //     res.status(402).json({messagge:"NO PUEDES VER ESTE PERFIL"})
            //     return
            // }
        }; */


        if (!user) {
            res.status(404).json({messagge:"EL USUARIO NO EXISTE"})
            return
            
        }

        res.status(200).json({
            user,
            role: req.user.ID_ROLE
        })
        
    } catch (error) {
        console.log(error);
        res.status(400).json({messagge:"ALGO SALIO MAL"})
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
        
            },include:{attributes:["ID_ROLE","ACCOUNT_NUMBER","NAME","DNI","CENTER","EMAIL"],model:User, as:"user",include:[{model:Multimedia, as:"multimedia", where:{IS_PROFILE:1}}]}})|| await Student.findOne({where:{
                ID_USER: id
        
            },include:{attributes:["ID_ROLE","ACCOUNT_NUMBER","NAME","DNI","CENTER","EMAIL"],model:User, as:"user"}})
            break;
        case 2 || 3 || 4:

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
                console.log("Usuario alksmlaksx",user)
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
                messagge:"NO ESTA DEFINIDO"
            })
            return

        }
        
        if (parseInt(id)!==req.user.ID_USER) {
            res.status(401).json({messagge:"NO TIENES PERMISO DE EDTIAR ESTE PERFIL"})
            return
            
        }

        const result = await getInfo(id,req.user.ID_ROLE)

        if (!result) {
            res.status(404).json({messagge:"EL USUARIO NO EXISTE"})
            return
            
        }
        
        if(body.EMAIL==""){
            res.status(406).json({
                messagge:"EL EMAIL ESTA EN BLANCO"
            })
            return
            
        }
        if ((req.body.EMAIL == result.user.EMAIL) && (id == req.user.ID_USER)){
            res.status(400).json({
                messagge:"INGRESA UN CORREO DIFERENTE AL QUE YA TIENES"
            })    
            return
            
        }
      
        if (await emailExists(body.EMAIL)){
            res.status(400).json({
                messagge:"El CORREO YA EXISTE"
            })    
            return
        }
        

    
        await User.updateEmail(id,body.EMAIL)
        res.status(200).json({
        messagge:"CORREO ACTUALIZADO"
        })
        
    } catch (error) {
        console.log(error);
        res.status(400).json({messagge:"ALGO SALIO MAL"})
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
            res.status(401).json({messagge:"NO TIENES PERMISO DE EDTIAR ESTE PERFIL"})
            return
            
        }
        const result = await getInfo(id, user.ID_ROLE)

        if (!result) {
            res.status(404).json({messagge:"EL USUARIO NO EXISTE"})
            return
            
        }

        if(files.length == 0){
            res.status(400).json({messagge: "NO HAS ENVIADO NINGUNA IMAGEN"})
            return

        }
        if(files.length >= 4){
            res.status(400).json({messagge: "SOLO PUEDES SUBIR 3 IMAGENES"})
            return

        }

        const flag = await validationImg(res,id,files);
        
        if (flag) {
            await uploadImg(files, id)
            res.status(200).json({messagge:"FOTOS DE PERFIL ACTUALIZADAS DE FORMA CORRECTA"})
            return    
        }

        if(!flag){
            res.status(400).json({messagge:"DEBES ELIMINAR UNA O MAS IMAGENES, SOLO PUEDES TENER 3 EN TU PERFIL"})
            return
        }
        
    } catch (error) {
        console.log({error});
        res.status(400).json({messagge:"ALGO SALIO MAL"})
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
            res.status(401).json({messagge:"NO TIENES PERMISO DE EDTIAR ESTE PERFIL"})
            return
            
        }
        const result = await getInfo(id, user.ID_ROLE)

        if (!result) {
            res.status(404).json({messagge:"EL USUARIO NO EXISTE"})
            return
            
        }

        if(!file){
            res.status(400).json({messagge: "NO HAS ENVIADO NINGUN VIDEO"})
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
            res.status(400).json({messagge:"SOLO PUEDES SUBIR UN VIDEO"})
            return
        }


    
        const url = `http://localhost:3000/videos/${file.filename}`;
        await Professor.updateVideo(id,url);
        res.status(200).json({messagge:"VIDEO SUBIDO CORRECTAMENTE"})
        
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
            res.status(400).json({messagge:"NO TIENES PERMISO DE ELIMINAR ESTE ARCHIVO"})
            return
        }

        await deleteFile(id);
        res.status(200).json({messagge:"ARCHIVO ELIMINADO"});




        
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
    await User.connection.query("UPDATE multimedia SET IS_PROFILE = :NEW_PROFILE WHERE ID_MULTIMEDIA= :ID_MULTIMEDIA",{replacements:{
        NEW_PROFILE: 0,
        ID_MULTIMEDIA: id

    }})
  
}


module.exports = {
    getStudents,
    getPerfil,
    updateEmail,
    uploadPhotos,
    uploadVideo,
    deleteMultimedia
};
