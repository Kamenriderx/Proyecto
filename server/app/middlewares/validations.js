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
    check("CENTER")
    .exists()
    .isAlpha()
    .notEmpty(),
    check("DNI")
    .exists()
    .isNumeric()
    .notEmpty(),
    check("EMAIL")
    .exists()
    .isEmail()
    .notEmpty(),
    (req,res,next) => {
        return validateResults(req,res,next)

    }
]



module.exports = {validatorRegisterProfessor};