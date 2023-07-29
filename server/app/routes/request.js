const express = require('express');
const router = express.Router()
const {getCareers, requestChangeCareer, getRequestChangeCareer, responseRequest, cancelledRequest, getMyRequests, requestChangeCenter, getMyRequestsAcceptDenyCenter, getMyRequestsAcceptDenyCareer, getRequestChangeCenter, requestPaymentReplacement, getMyRequestsPaymentReplacements} = require('../controllers/request.js');
const {checkRolCoordinador} = require('../middlewares/rol.js');
const authMiddleware = require('../middlewares/authentication.js');
const upload = require('../middlewares/uploadFiles.js');



// coordinador
router.get("/listRequestChangeCareer" ,authMiddleware,checkRolCoordinador,getRequestChangeCareer);
router.get("/listRequestChangeCenter" ,authMiddleware,checkRolCoordinador,getRequestChangeCenter);
router.put("/responseRequest", authMiddleware,checkRolCoordinador, responseRequest)

// estudiante
router.get("/listCareers" ,getCareers);
router.get("/getMyRequest" ,authMiddleware,getMyRequests);
router.get("/getMyRequestPaymentReplacements" ,authMiddleware,getMyRequestsPaymentReplacements);
router.get("/getMyDictamenCenter" ,authMiddleware,getMyRequestsAcceptDenyCenter);
router.get("/getMyDictamenCareer" ,authMiddleware,getMyRequestsAcceptDenyCareer);
router.post("/requestChangeCareer",authMiddleware, upload.single("pdfFile") ,requestChangeCareer);
router.post("/requestChangeCenter",authMiddleware, upload.single("pdfFile"), requestChangeCenter);
router.post("/requestPaymentReplacements",authMiddleware, requestPaymentReplacement);
router.put("/cancelledRequest", authMiddleware,cancelledRequest)


module.exports = router

