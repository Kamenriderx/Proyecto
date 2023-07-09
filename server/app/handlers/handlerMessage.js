const {User} = require('../models'); 
const getUser = async (userId)=>{
    const user=await User.findOne(
        {
            where:
            {
                ID_USER:userId
            }
        }
    
    )
    return user.dataValues
} 

module.exports = {
    getUser
};
