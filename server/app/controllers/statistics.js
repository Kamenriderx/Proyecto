const connection = require("../../config/database");
const getData = async (req,res) =>{

    const response = {};
    const ress = await connection.query(`
        SELECT COUNT(OBS) QUANTITY,OBS, YEAR(START_DATE) AS YEAR
        FROM enrollment
            JOIN section ON section.ID_SECTION = enrollment.ID_SECTION
            JOIN periodacademic ON periodacademic.ID_PERIOD = section.ID_PERIOD
        GROUP BY OBS,YEAR
        ORDER BY YEAR ASC
    `);
    ress[0].map(value=>{
        response[value.YEAR]?response[value.YEAR].push(value):response[`${value.YEAR}`]=[value];
    })

    console.log(response);
    res.status(200).json({data:response});

}

module.exports = {getData}