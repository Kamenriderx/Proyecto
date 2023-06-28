const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Sequelize } = require('sequelize');

//!Importando modelos
const ROLE = require('../models/role'); 
const USER_ = require('../models/user');

//! Controlador para el inicio de sesión
exports.loginAccess = async (req, res) => {
    const { identifier, password } = req.body;
  
    try {

      //! Busca el usuario por su EMAIL o Numero de Cuenta
      const user = await USER_.findOne({
        where: Sequelize.or(
          { EMAIL: identifier },
          { ACCOUNT_NUMBER: identifier }
        )
      });
  
      //! Verifica si el usuario existe
      if (!user) {
        return res.status(404).json({ error: 'N° de cuenta o email incorrecto. Vuelva a intentaro.' });
      }
      
  
      //! Verifica la contraseña
      const passwordMatch = await bcrypt.compare(password, user.USER_PASSWORD);
        if (!passwordMatch) {
         return res.status(401).json({ error: 'Contraseña incorrecta. Vuelve a intentarlo o selecciona "¿Restablecer contraseña?" para cambiarla.' });
      }

      //! Obtiene el rol del usuario
      const role = await ROLE.findByPk(USER_.ID_ROLE);
  
      //! Genera un token de acceso utilizando JWT
      const token = jwt.sign({ userId: USER_.ID_USER, role: ROLE.ROLE_NAME }, 'secretKey', {
        expiresIn: '24h',
      });

      console.log(token)

      //! Actualiza la última conexión del usuario
      await user.update({ LAST_CONNECTION: new Date() });
  
      //! Enviar la respuesta con el token de acceso como parametro
    res.redirect(`http://localhost:3000/registro/userProfile/perfil?token=${token}`);
      } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al iniciar sesión.' });
  }
};

  //! Controlador para verificar el estado de inicio de sesión
  exports.verifyLoginStatus = async (req, res) => {
    const token = req.query.authorization;

    console.log(req.url);

    try {
      //! Verifica si se proporcionó un token
      if (!token) {
        return res.redirect('http://localhost:3000/registro/login/students')
      }

      //! Verifica y decodifica el token utilizando JWT
      const decodedToken = jwt.verify(token, 'secretKey');
  
      //! Obtiene el ID de usuario y el rol desde el token
      const userId = decodedToken.userId;
      const role = decodedToken.role;
  
      //! Buscar el usuario por su ID
      const user = await USER_.findByPk(U);
  
      //! Verificar si el usuario existe
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado.' });
      }
  
      //! Enviar la respuesta con el estado de inicio de sesión, el rol y los datos del usuario
      res.json({ loggedIn: true, userId, role, user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al verificar el estado de inicio de sesión.' });
    }
  };