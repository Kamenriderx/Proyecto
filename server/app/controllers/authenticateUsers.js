const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Sequelize } = require('sequelize');
const { generateAuthToken } = require('../../utils/authToken');

//!Importando modelos
const Role = require('../models/role'); 
const USER_ = require('../models/user');

//! Controlador para el inicio de sesión
exports.loginAccess = async (req, res) => {
    const { identifier, password } = req.body;
  
    try {

      // Busca el usuario por su EMAIL o Numero de Cuenta
      const user = await USER_.findOne({
        where: Sequelize.or(
          { EMAIL: identifier },
          { ACCOUNT_NUMBER: identifier }
        )
      });
  
      // Verifica si el usuario existe
      if (!user) {
        return res.status(404).json({ error: 'N° de cuenta o email incorrecto. Vuelva a intentaro.' });
      }
  
      // Verifica la contraseña
      const passwordMatch = await bcrypt.compare(password, user.USER_PASSWORD);
        if (!passwordMatch) {
         return res.status(401).json({ error: 'Contraseña incorrecta. Vuelve a intentarlo o selecciona "¿Restablecer contraseña?" para cambiarla.' });
      }

      // Obtiene el rol del usuario
      const role = await Role.findByPk(user.ID_ROLE);
      
      // Genera un token de acceso utilizando JWT
      const token = generateAuthToken({ userId: user.ID_USER, role: role.ROLE_NAME }, '24h');

      //Imprimo el token para ver si se estan enviando los datos
      const decodedToken = jwt.verify(token, process.env.HASHPASS);
      console.log(decodedToken);
      
      // Actualiza la última conexión del usuario
      await user.update({ LAST_CONNECTION: new Date() });
  
      // Envia la respuesta con el token de acceso como parametro
    /*res.redirect(`http://localhost:3000/registro/userProfile/perfil?token=${token}`);
      } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al iniciar sesión.' });
  }*/
      //Envia la respuesta con el token de acceso como JSON
      res.status(200).json({ token });
      } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al iniciar sesión.' });
  }
};

//!Middleware para verificar el token
exports.verifyToken = (req, res, next) => {

  // Obtener el token del encabezado de la solicitud
  const token = req.headers.authorization;

  // Verificar si el token existe
  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado. Inicie sesión primero.' });
  }

  try {
    // Verificar la validez del token utilizando JWT
    const decoded = jwt.verify(token.split(' ')[1], process.env.HASHPASS);

    // Verificar si el token identifica un inicio de sesión
    if ( !decoded.userId || !decoded.role || decoded.role !== 'Estudiante') {
      return res.status(401).json({ error: 'Token inválido. Inicie sesión primero.' });
    }

    // Token válido y autenticado correctamente como inicio de sesión
    // Almacenar los detalles del usuario o realizar otras operaciones

    next();
  } catch (error) {
    // Error al verificar el token
    return res.status(401).json({ error: 'Token inválido. Inicie sesión primero.' });
  }
};

//! Controlador para verificar el estado de inicio de sesión
exports.verifyLoginStatus = async (req, res) => {
  const token = req.headers.authorization;

  try {
    // Verifica si se proporcionó un token
    if (!token) {
      return res.redirect('http://localhost:3000/registro/login/students')
    }

    // Verifica y decodifica el token utilizando JWT
    const decodedToken = jwt.verify(token, 'secretKey');

    // Obtiene el ID de usuario y el rol desde el token
    const userId = decodedToken.userId;
    const role = decodedToken.role;

    // Buscar el usuario por su ID
    const user = await user.findByPk(U);

    // Verificar si el usuario existe
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    // Enviar la respuesta con el estado de inicio de sesión, el rol y los datos del usuario
    res.json({ loggedIn: true, userId, role, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al verificar el estado de inicio de sesión.' });
  }
};
