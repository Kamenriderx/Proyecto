const { getCurrentPeriod } = require("../helpers/repositoryRequest")

const getPeriodInfo = async (req,res)=>{
    try {
        const period = await getCurrentPeriod()

        res.status(200).json({period})
    } catch (error) {
        console.log({error})
        res.status(500).json({messagge:"Algo salio mal."})
    }
}

module.exports = {
    getPeriodInfo
};
