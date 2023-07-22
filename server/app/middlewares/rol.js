const checkRolJefe = (req,res,next)=>{
    try {
        if (req.user.ID_ROLE != 3) {
            res.status(401).json({messagge:"NO ESTAS AUTORIZADO"})
            return
            
        }

        next()
        
    } catch (error) {
        console.log({error})
        res.status(500).json({messagge:"ALGO SALIO MAL"})
    }
}

module.exports = {
    checkRolJefe
};
