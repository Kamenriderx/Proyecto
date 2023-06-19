const express = require('express');
const router = express.Router();
const {deletePerson,getPersons,addPerson,updatePerson} = require('../controllers/personExample');
const authToken = require('../middlewares/authToken');

router.get('/getPersons',getPersons);
router.post('/addPerson', addPerson);
router.delete('/deletePerson', deletePerson);
router.put('/updatePerson', updatePerson);

module.exports = router;