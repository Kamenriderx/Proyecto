const { getStudent } = require('../helpers/repositoryRequest');

const verifyPaymentEnrollment = async (req,res, next)=>{
    try {
        const {idUser} = req.params;
        const student = await getStudent(idUser)

        if (student.REGISTRATION_PAYMENT==0) {
            res.status(400).json({messagge:"Debes realizar el pago de matricula"})
            return
        }


        req.student = student 
        next()



        
    } catch (error) {
        console.log({error})
        res.status(500).json({messagge:"ALGO_SALIO_MAL"})
    }

}

module.exports = {
    verifyPaymentEnrollment
};
