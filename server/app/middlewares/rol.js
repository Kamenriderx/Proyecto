const checkRolJefe = (req,res,next)=>{
    try {
        if (req.user.ID_ROLE != 3) {
            res.status(401).json({messagge:"No estas autorizado para obtener estos datos"})
            return
            
        }

        next()
        
    } catch (error) {
        console.log({error})
        res.status(500).json({messagge:"Algo salio mal"})
    }
}
const checkRolCoordinador = (req,res,next)=>{
    try {
        if (req.user.ID_ROLE != 4) {
            res.status(401).json({messagge:"No estas autorizado para obtener estos datos"})
            return
            
        }

        next()
        
    } catch (error) {
        console.log({error})
        res.status(500).json({messagge:"Algo salio mal"})
    }
}

module.exports = {
    checkRolJefe, 
    checkRolCoordinador
};
