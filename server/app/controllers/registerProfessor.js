const {matchedData} = require("express-validator"); 

const registerProfessorCtrl = async (req,res)=>{
    try {
        const {file} = req;
        console.log(file)
        const body = matchedData(req);

        

        res.status(200).json(body);
        
    } catch (error) {
        console.log(error)
        res.status(403).json({error:"ALGO SALIO MAL"})
        
    }

}



module.exports = {
    registerProfessorCtrl
};
