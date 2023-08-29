const connection = require("../../config/database");
const USER = require("../models/user");
const Student = require("../models/student");
const getHistory = async (req, res) => {
  try {
    console.log(req.token);
    const lastPeriod = await connection.query(`
      SELECT
          MAX(periodacademic.ID_PERIOD) as lastPeriod
      FROM enrollment
          JOIN section on enrollment.id_section = section.id_section
          JOIN periodacademic on periodacademic.id_period = section.id_period 
          JOIN course on course.id_course = section.id_course
          JOIN student on enrollment.id_student = student.id_student
          JOIN USER_ ON student.ID_USER = USER_.ID_USER
      where user_.id_user = '${req.token.userId}'
    `);
    const final = lastPeriod[0][0];
    const classes = await connection.query(
      `
        SELECT
            obs,
            period_name,
            code_course,
            periodacademic.ID_PERIOD,
            name,
            uv,
            section_code,
            calification,
            enrollment.state,
            YEAR(start_date) as year,
            career
        FROM enrollment
            JOIN section on enrollment.id_section = section.id_section
            JOIN periodacademic on periodacademic.id_period = section.id_period 
            JOIN course on course.id_course = section.id_course
            JOIN student on enrollment.id_student = student.id_student
        where id_user = '${req.token.userId} AND calification>0 AND state = Finalizada'
        `
    );
    const basicInformation = await USER.findAll({
      include: [Student],
      where: { ID_USER: req.token.userId },
    });
    console.log(basicInformation[0].dataValues.STUDENTs[0].dataValues.CAREER);

    const response = {
      data: classes[0],
      basicInformation: {
        ACCOUNT_NUMBER: basicInformation[0].dataValues.ACCOUNT_NUMBER,
        NAME: basicInformation[0].dataValues.NAME,
        CENTER: basicInformation[0].dataValues.CENTER,
        CAREER: basicInformation[0].dataValues.STUDENTs[0].dataValues.CAREER,
      },
      ...final,
    };
    const years = new Set();
    let totalUV = 0;
    let UVenrollmentsProduct = 0;
    let enrollments = [];
    let actualYear = "";
    let studiedYears = [];
    let career = "";
    for (en of classes[0]) {
      if (en.calification >= 65) {
        totalUV += en.uv;
        UVenrollmentsProduct += en.uv * en.calification;

        if (years.has(en.year)) {
          enrollments.push({
            code: en.code_course,
            career: en.name,
            uv: en.uv,
            period: en.period_name.split(" ")[0],
            CALIFICATION: en.calification,
            OBS: en.obs,
          });
        } else if (years.size > 0) {
          career = en.CAREER;
          studiedYears.push({
            year: actualYear,
            enrollments,
          });
          years.add(en.year);
          actualYear = en.year;
          enrollments = [];
          career = en.career;
        } else {
          years.add(en.year);
          actualYear = en.year;
          enrollments.push({
            code: en.code_course,
            career: en.name,
            uv: en.uv,
            period: en.period_name.split(" ")[0],
            CALIFICATION: en.calification,
            OBS: en.obs,
          });
          career = en.career;
        }
      }
    }
    if (enrollments.length > 0) {
      studiedYears.push({
        year: `${actualYear}`,
        enrollments,
      });
    }
    let myResponse = {
      basicInformation: {
        accountNumber: basicInformation[0].dataValues.ACCOUNT_NUMBER,
        name: basicInformation[0].dataValues.NAME.split(" ")[0],
        lastName:
          basicInformation[0].dataValues.NAME.split(" ")[
            basicInformation[0].dataValues.NAME.split(" ").length - 1
          ],
        center: basicInformation[0].dataValues.CENTER,
        career: basicInformation[0].dataValues.STUDENTs[0].dataValues.CAREER,
      },

      academicInformation: {
        totalUV,
        UVenrollmentsProduct,
        careers: [
          {
            career,
            years: studiedYears,
          },
        ],
      },
    };

    const fullResponse = {
      history: myResponse,
      response: response,
    };

    console.log(myResponse);
    //console.log("Respuesta:",response);
    res.status(200).json(fullResponse);
  } catch (e) {
    console.log(e);
  }
};

const searchHistory = async (req, res) => {
  try {
    const { user_account } = req.body;
    const lastPeriod = await connection.query(`
      SELECT
          MAX(periodacademic.ID_PERIOD) as lastPeriod
      FROM enrollment
          JOIN section on enrollment.id_section = section.id_section
          JOIN periodacademic on periodacademic.id_period = section.id_period 
          JOIN course on course.id_course = section.id_course
          JOIN student on enrollment.id_student = student.id_student
          JOIN USER_ ON student.ID_USER = USER_.ID_USER
      where user_.ACCOUNT_NUMBER = ${user_account}
    `);
    const final = lastPeriod[0][0];
    const classes = await connection.query(
      `
      SELECT
      obs,
      period_name,
      periodacademic.ID_PERIOD,
      code_course,
      course.name,
      uv,
      section_code,
      calification,
      YEAR(start_date) as year

  FROM enrollment
      JOIN section on enrollment.id_section = section.id_section
      JOIN periodacademic on periodacademic.id_period = section.id_period 
      JOIN course on course.id_course = section.id_course
      JOIN student on enrollment.id_student = student.id_student
      JOIN USER_ ON student.ID_USER = USER_.ID_USER
  where user_.ACCOUNT_NUMBER = ${user_account};
        `
    );
    const basicInformation = await USER.findAll({
      include: [Student],
      where: { ACCOUNT_NUMBER: user_account },
    });
    console.log(basicInformation[0].dataValues.STUDENTs[0].dataValues.CAREER);

    const response = {
      data: classes[0],
      basicInformation: {
        ACCOUNT_NUMBER: basicInformation[0].dataValues.ACCOUNT_NUMBER,
        NAME: basicInformation[0].dataValues.NAME,
        CENTER: basicInformation[0].dataValues.CENTER,
        CAREER: basicInformation[0].dataValues.STUDENTs[0].dataValues.CAREER,
      },
      ...final,
    };
    console.log(response);
    res.status(200).json(response);
  } catch (e) {}
};

module.exports = { getHistory, searchHistory };
