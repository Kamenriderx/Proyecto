const { PeriodAcademic, DetailsPeriod } = require("../models");
const { Op, fn, col, where, literal } = require("sequelize")

const getPeriodicAcademicCurrent = async () => await PeriodAcademic.findOne({attributes:["ID_PERIOD","PERIOD_NAME", 
[fn("YEAR", col("START_DATE")), "YEAR"],
[fn("MONTH", col("START_DATE")), "MONTH"],
[fn("DAY", col("START_DATE")), "DAY"]
],where:{STATUS: "En curso"}})

const periodToStart= async (currentMonth, currentYear) => await PeriodAcademic.findAll({attributes:["ID_PERIOD","PERIOD_NAME", 
[fn("YEAR", col("START_DATE")), "YEAR"],
[fn("MONTH", col("START_DATE")), "MONTH"],
[fn("DAY", col("START_DATE")), "DAY"]
],where:{
  [Op.and]:[
    where(fn('YEAR', col('START_DATE')), {
      [Op.gte]: currentYear,
    }),
    where(fn('MONTH', col('START_DATE')), {
      [Op.gte]: currentMonth,
    }),
    {STATUS: "Por empezar"}]
}, order:[["START_DATE", "ASC"]], limit:1})

const getTheLastPeriodAcademic= async ( currentYear) => await PeriodAcademic.findAll({attributes:["ID_PERIOD","PERIOD_NAME", 
[fn("YEAR", col("START_DATE")), "YEAR"],
[fn("MONTH", col("START_DATE")), "MONTH"],
[fn("DAY", col("START_DATE")), "DAY"]
],where:{
  [Op.and]:[
    where(fn('YEAR', col('START_DATE')), {
      [Op.gte]: currentYear,
    }),
    
      {[Op.or]:[{STATUS: "Por empezar"}, {STATUS: "En curso"}]}
    ]
}, order:[["START_DATE", "ASC"]], limit:3})



const getNextPeriodicAcademic = async (currentYear, currentMonth) =>{ 
    
    return await PeriodAcademic.findOne({
    attributes: [
      'ID_PERIOD',
      'PERIOD_NAME',
      [fn('YEAR', col('START_DATE')), 'YEAR'],
      [fn('MONTH', col('START_DATE')), 'MONTH'],
      [fn('DAY', col('START_DATE')), 'DAY'],
    ],
    where: {
      [Op.and]: [
        where(fn('YEAR', col('START_DATE')), {
          [Op.eq]: currentYear,
        }),
        where(fn('MONTH', col('START_DATE')), {
          [Op.gt]: currentMonth,
        }),
      ],
    },
  });

}


const getDetailsDatesPeriodAcademic = async (id) => await DetailsPeriod.findOne({where:{ID_PERIOD:id}, attributes: [
    [fn('DATE', col('PREREGISTRATION_START_DATE')),'PRE_DATE_INI'],
    [fn('DATE', col('PREREGISTRATION_END_DATE')),'PRE_DATE_END'],
    [fn('DATE',fn('DATE_ADD', col('PREREGISTRATION_START_DATE'), literal('INTERVAL 1 DAY'))),'PRE_DATE_TWO'],
    [fn('DATE',fn('DATE_ADD', col('PREREGISTRATION_START_DATE'), literal('INTERVAL 2 DAY'))),'PRE_DATE_THREE'],
    [fn('DATE',fn('DATE_ADD', col('PREREGISTRATION_START_DATE'), literal('INTERVAL 3 DAY'))),'PRE_DATE_FOUR'],
    [fn('DATE',fn('DATE_ADD', col('PREREGISTRATION_START_DATE'), literal('INTERVAL 4 DAY'))),'PRE_DATE_FIVE'],
    [fn('DATE', col('ADD_CANCELLATIONS_START_DATE')),'ADD_CAN_DATE_INI'],
    [fn('DATE', col('ADD_CANCELLATIONS_END_DATE')),'ADD_CAN_DATE_END'],
    [fn('DATE', col('REGISTRATION_START_DATE')),'RE_DATE_INI'],
    [fn('DATE', col('REGISTRATION_END_DATE')),'RE_DATE_END'],
    [fn('DATE',fn('DATE_ADD', col('REGISTRATION_START_DATE'), literal('INTERVAL 1 DAY'))),'RE_DATE_TWO'],
    [fn('DATE',fn('DATE_ADD', col('REGISTRATION_START_DATE'), literal('INTERVAL 2 DAY'))),'RE_DATE_THREE'],
    [fn('DATE',fn('DATE_ADD', col('REGISTRATION_START_DATE'), literal('INTERVAL 3 DAY'))),'RE_DATE_FOUR'],
    [fn('DATE',fn('DATE_ADD', col('REGISTRATION_START_DATE'), literal('INTERVAL 4 DAY'))),'RE_DATE_FIVE']
  ]});





module.exports = {
    getPeriodicAcademicCurrent,
    getNextPeriodicAcademic,
    getDetailsDatesPeriodAcademic,
    periodToStart,
    getTheLastPeriodAcademic

};
