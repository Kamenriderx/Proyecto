const { check } = require("express-validator");
const validateResults = require("../handlers/handleValidators");


const validatorRegisterProfessor = [
    check("NAME")
    .exists()
    .notEmpty(),
    check("ACCOUNT_NUMBER")
    .exists()
    .notEmpty()
    .isNumeric(),
    check("ROLE")
    .exists()
    .notEmpty()
    .isNumeric(),
    check("CENTER")
    .exists()
    .notEmpty(),
    check("EMAIL")
    .exists()
    .isEmail()
    .notEmpty(),
    check("CAREER")
    .exists()
    .notEmpty(),
    (req,res,next) => {
        return validateResults(req,res,next)

    }
]



module.exports = {validatorRegisterProfessor};