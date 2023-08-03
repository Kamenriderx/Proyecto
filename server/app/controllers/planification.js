const PeriodAcademic = require("../models/periodAcademic");
const { Op, literal } = require("sequelize");
const getPeriods = async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();
    const response = [];
    const periods = await PeriodAcademic.findAll({
      where: literal(`YEAR(START_DATE) = ${currentYear}`),
    });

    periods.map((p) => (response.push(p.dataValues)));
    res.status(200).json(response);
  } catch (e) {}
};

module.exports = { getPeriods };
