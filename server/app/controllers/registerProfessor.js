

const registerProfessorCtrl = async (req,res)=>{
    try {
        const {body} = req
        res.status(200).json(body)
        
    } catch (error) {
        res.status(403).json({error:"ALGO SALIO MAL"})
        
    }

}



module.exports = {
    registerProfessorCtrl
};
