const express = require('express');
const router = express.Router()
const {getCareers, requestChangeCareer, getRequestChangeCareer, responseRequest, cancelledRequest, requestChangeCenter, getMyRequestsAcceptDenyCenter, getMyRequestsAcceptDenyCareer, getRequestChangeCenter, requestPaymentReplacement, getMyRequestsPaymentReplacements, getMyRequestsChangeCareer, getMyRequestsChangeCenter, requestExceptionalCancellation, getMyRequestsAcceptDenyCancellCourse, getRequestCancellationCourse} = require('../controllers/request.js');
const {checkRolCoordinador} = require('../middlewares/rol.js');
const authMiddleware = require('../middlewares/authentication.js');
const upload = require('../middlewares/uploadFiles.js');



// coordinador
router.get("/listRequestChangeCareer" ,authMiddleware,checkRolCoordinador,getRequestChangeCareer);
router.get("/listRequestChangeCenter" ,authMiddleware,checkRolCoordinador,getRequestChangeCenter);
router.get("/listRequestCancellationExceptional/:idUser" ,authMiddleware,checkRolCoordinador,getRequestCancellationCourse);
router.put("/responseRequest", authMiddleware,checkRolCoordinador, responseRequest)

// estudiante
router.get("/listCareers" ,getCareers);
router.get("/getMyRequestsChangeCareer" ,authMiddleware,getMyRequestsChangeCareer);
router.get("/getMyRequestChangeCenter" ,authMiddleware,getMyRequestsChangeCenter);
router.get("/getMyRequestPaymentReplacements" ,authMiddleware,getMyRequestsPaymentReplacements);

//  dictamenes
router.get("/getMyDictamenCenter" ,authMiddleware,getMyRequestsAcceptDenyCenter);
router.get("/getMyDictamenCareer" ,authMiddleware,getMyRequestsAcceptDenyCareer);
router.get("/getMyDictamenExceptionalCancellation/:idUser" ,authMiddleware,getMyRequestsAcceptDenyCancellCourse);

// solcitudes que hace el estudiante 
router.post("/requestChangeCareer",authMiddleware, upload.single("pdfFile") ,requestChangeCareer);
router.post("/requestChangeCenter",authMiddleware, upload.single("pdfFile"), requestChangeCenter);
router.post("/requestExceptionalCancellation/:idUser",authMiddleware, upload.single("pdfFile"), requestExceptionalCancellation);
router.post("/requestPaymentReplacements",authMiddleware, requestPaymentReplacement);

router.put("/cancelledRequest", authMiddleware,cancelledRequest)




module.exports = router

