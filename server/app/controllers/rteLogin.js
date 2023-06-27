const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Role = require('../models/Role'); //! Crear modelo

//! Controlador para el inicio de sesión
exports.login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      //! Busca el usuario por su EMAIL
      const user = await USER_.findOne({ where: { EMAIL: email } });
  
      //! Verifica si el usuario existe
      if (!user) {
        return res.status(404).json({ error: 'Correo electrónico no válido.' });
      }
  
      //! Verifica la contraseña
      const passwordMatch = await bcrypt.compare(password, USER_.USER_PASSWORD);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Contraseña incorrecta.' });
      }
  
      //! Obtiene el rol del usuario
      const role = await Role.findByPk(USER_.ID_ROLE);
  
      //! Genera un token de acceso utilizando JWT
      const token = jwt.sign({ userId: USER_.ID_USER, role: ROLE.ROLE_NAME }, 'secretKey', {
        expiresIn: '1h', 
      });
  
      //! Actualiza la última conexión del usuario
      await user.update({ LAST_CONNECTION: new Date() });
  
      //! Enviar la respuesta con el token de acceso
      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al iniciar sesión.' });
    }
  };
  
  //! Controlador para verificar el estado de inicio de sesión
  exports.verifyLoginStatus = async (req, res) => {
    const token = req.headers.authorization;
  
    try {
      //! Verifica si se proporcionó un token
      if (!token) {
        return res.status(401).json({ error: 'Acceso no autorizado.' });
      }
  
      //! Verifica y decodifica el token utilizando JWT
      const decodedToken = jwt.verify(token, 'secretKey');
  
      //! Obtiene el ID de usuario y el rol desde el token
      const userId = decodedToken.userId;
      const role = decodedToken.role;
  
      //! Buscar el usuario por su ID
      const user = await User_.findByPk(U);
  
      //! Verificar si el usuario existe
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado.' });
      }
  
      //! Enviar la respuesta con el estado de inicio de sesión, el rol y los datos del usuario
      res.json({ loggedIn: true, role, user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al verificar el estado de inicio de sesión.' });
    }
  };