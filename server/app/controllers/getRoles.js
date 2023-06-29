const {Rol} = require('../models');
const getRolesCtrl = async(req,res)=>{
    try {
        const roles =await Rol.findAll();
        res.status(200).json({roles})
    } catch (error) {
        console.log(error)
        res.status(403).json({error})
    }
}


module.exports = {
    getRolesCtrl
};
