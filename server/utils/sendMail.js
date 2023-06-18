
const ejs = require("ejs");
const transporter = require('../config/mailTransporter');

const sendMail = async (email,options, view, params = {}) => {

  const html = await ejs.renderFile(`views/${view}.ejs`, params);
  let mailOptions = {
    from: "kiritojeiger@gmail.com",
    to: email,
    subject: options.subject,
    html: html,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(500).send({message:"Error al enviar el correo electrónico"});
    } else {
      res.status(200).send({message:options.message });
    }
  });
};

module.exports = sendMail;
