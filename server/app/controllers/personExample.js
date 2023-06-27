const Person_ = require("../models/personExample");
const sendMail = require("../../utils/sendMail");
const fechaActual = new Date().toLocaleDateString();

const getPersons = async (req, res, next) => {
  try {
    const users = await Person_.findAll();
    res.status(200).json(users);
  } catch (error) {
    next(err);
  }
};

const addPerson = async (req, res, next) => {
  const newPerson = {
    ID_Person_: req.body.ID_Person_,
    P_NAME: req.body.P_NAME,
    P_MAIL: req.body.P_MAIL,
  };
  console.log(req.body);
  Person_.create(newPerson)
    .then((person) => {
      sendMail(req.body.P_MAIL, {subject: "Nuevo usuario creado"},"sendEmail", {
        name: req.body.P_NAME,
        email: req.body.P_MAIL,
        fecha: fechaActual,
      });
      res.status(200).json({ message: "Persona creada correctamente" });
    })
    .catch((err) => {
      next(err);
    });
};

const deletePerson = async (req, res, next) => {
  Person_.destroy({ where: { ID_Person_: req.body.ID_Person_ } })
    .then(() => {
      res.status(200).json({ message: "Persona eliminada correctamente" });
    })
    .catch((err) => {
      next(err);
    });
};

const updatePerson = async (req, res, next) => {
  const updatedValues = {
    P_NAME: req.body.P_NAME,
    P_MAIL: req.body.P_MAIL,
  };

  Person_.update(updatedValues, { where: { ID_Person_: req.body.ID_Person_ } })
    .then(() => {
      sendMail(req.body.P_MAIL, {subject: "Datos actualizados"}, "sendEmail")
      res.status(200).json({ message: "Persona actualizada correctamente" });
    })
    .catch((err) => {
      next(err);
    });
};
module.exports = {
  addPerson,
  getPersons,
  deletePerson,
  updatePerson,
};
