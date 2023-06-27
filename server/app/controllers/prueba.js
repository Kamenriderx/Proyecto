// Controlador para el inicio de sesión
exports.login = async (req, res) => {
    const { identifier, password } = req.body;
  
    try {
      // Buscar el usuario por email o número de cuenta
      const user = await User_.findOne({
        where: Sequelize.or(
          { EMAIL: identifier },
          { ACCOUNT_NUMBER: identifier }
        )
      });
  
      // Verificar si el usuario existe
      if (!user) {
        return res.status(404).json({ error: 'Correo electrónico o número de cuenta no válido.' });
      }
  
      // Verificar la contraseña
      const passwordMatch = await bcrypt.compare(password, user.USER_PASSWORD);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Contraseña incorrecta.' });
      }
  
      // Generar un token de acceso utilizando JWT
      const token = jwt.sign({ userId: user.ID_USER, role: user.ID_ROLE }, 'secretKey', {
        expiresIn: '1h', // Cambia el tiempo de expiración según tus necesidades
      });
  
      // Actualizar la última conexión del usuario
      await user.update({ LAST_CONNECTION: new Date() });
  
      // Enviar la respuesta con el token de acceso
      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al iniciar sesión.' });
    }
  };
  
  // Controlador para verificar el estado de inicio de sesión
  exports.verifyLoginStatus = async (req, res) => {
    const token = req.headers.authorization;
  
    try {
      // Verificar si se proporcionó un token
      if (!token) {
        return res.status(401).json({ error: 'Acceso no autorizado.' });
      }
  
      // Verificar y decodificar el token utilizando JWT
      const decodedToken = jwt.verify(token, 'secretKey');
  
      // Obtener el ID de usuario y el rol desde el token
      const userId = decodedToken.userId;
      const role = decodedToken.role;
  
      // Buscar el usuario por su ID
      const user = await User_.findByPk(userId);
  
      // Verificar si el usuario existe
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado.' });
      }
  
      // Enviar la respuesta con el estado de inicio de sesión, los datos del usuario y el rol
      res.json({ loggedIn: true, user, role });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al verificar el estado de inicio de sesión.' });
    }
  };
  