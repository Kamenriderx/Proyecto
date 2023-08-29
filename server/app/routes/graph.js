const express = require('express');
const router = express.Router();
const connection = require('../../config/database');
router.get("/dataAbdSystem", async(req,res)=>{
    try {
        const data = await connection.query(`
            SELECT co.NAME AS class, COUNT(e.obs) AS quantity
            FROM test.enrollment AS e
            INNER JOIN test.section AS s ON e.ID_SECTION = s.ID_SECTION
            INNER JOIN test.course AS co ON s.ID_COURSE = co.ID_COURSE
            INNER JOIN test.classroom AS c ON s.ID_CLASSROOM = c.ID_CLASSROOM
            INNER JOIN test.career AS ca ON c.ID_CAREER = ca.ID_CAREER
            WHERE ca.NAME = "INGENIERIA EN SISTEMAS" AND e.OBS = "ABD"
            GROUP BY co.NAME
            ORDER BY quantity DESC
            LIMIT 10;
        `)


        res.status(200).json({data: data[0], labels:["Clase","Cantidad"]})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error})
    
    }

})
module.exports = router;