const express = require('express');
const router = express.Router()
const {getCareers, requestChangeCareer, getRequestChangeCareer, responseRequest, cancelledRequest, getMyRequests, requestChangeCenter, getMyRequestsAcceptDenyCenter, getMyRequestsAcceptDenyCareer, getRequestChangeCenter} = require('../controllers/request.js');
const {checkRolCoordinador} = require('../middlewares/rol.js');
const authMiddleware = require('../middlewares/authentication.js');
const upload = require('../middlewares/uploadFiles.js');




router.get("/listCareers" ,getCareers);
router.get("/listRequestChangeCareer" ,authMiddleware,checkRolCoordinador,getRequestChangeCareer);
router.get("/listRequestChangeCenter" ,authMiddleware,checkRolCoordinador,getRequestChangeCenter);
router.get("/getMyRequest" ,authMiddleware,getMyRequests);
router.get("/getMyDictamenCenter" ,authMiddleware,getMyRequestsAcceptDenyCenter);
router.get("/getMyDictamenCareer" ,authMiddleware,getMyRequestsAcceptDenyCareer);

router.post("/requestChangeCareer",authMiddleware, upload.single("pdfFile") ,requestChangeCareer);
router.post("/requestChangeCenter",authMiddleware, upload.single("pdfFile"), requestChangeCenter);


router.put("/responseRequest", authMiddleware,checkRolCoordinador, responseRequest)
router.put("/cancelledRequest", authMiddleware,cancelledRequest)
module.exports = router

