const models = {
    User: require("./user.js"),
    Admin: require("./admin"),
    Student: require("./student.js"),
    Professor: require("./professor"),
    Rol : require('./roles.js'),
    Multimedia: require('./multimedia.js'),
    Conversation: require('./conversation.js'),
    Message: require('./message.js')
    
}
//  usuarios- docentes
models.User.Professor=models.User.hasMany(models.Professor,{
    foreignKey:"ID_USER"
});
models.Professor.User=models.Professor.belongsTo(models.User,{
    foreignKey:"ID_USER",
    unique:true,
    as:"user"
});
//  usuarios - multimedia
models.User.Multimedia=models.User.hasMany(models.Multimedia,{
    foreignKey:"ID_USER",
    as:"multimedia"
});
models.Multimedia.User=models.Multimedia.belongsTo(models.User,{
    foreignKey:"ID_USER",
    unique:true,
    as:"user"
});

// usuarios - mensajes 
models.User.Message=models.User.hasMany(models.Message,{
    foreignKey:"SENDER_ID",
    as:"messages"
});
models.Message.User=models.Message.belongsTo(models.User,{
    foreignKey:"SENDER_ID",
    unique:true,
    as:"user"
});

//  conversacion - mensaje 
models.Conversation.Message=models.Conversation.hasMany(models.Message,{
    foreignKey:"ID_CONVERSATION",
    as:"chat"
});
models.Message.Conversation=models.Message.belongsTo(models.Conversation,{
    foreignKey:"ID_CONVERSATION",
    unique:true,
    as:"Conversation"
});

// CONVERSACION - USER
models.Conversation.belongsTo(models.User, { foreignKey: 'USER_1_ID',as:"user1" });
models.Conversation.belongsTo(models.User, { foreignKey: 'USER_2_ID', as:"user2" });

models.User.Conversation=models.User.hasMany(models.Conversation,{
    foreignKey:"USER_1_ID"
});
models.User.Conversation=models.User.hasMany(models.Conversation,{
    foreignKey:"USER_2_ID"
});

//  estudiante - usuarios
models.User.Student=models.User.hasMany(models.Student,{
    foreignKey:"ID_USER"
});
models.Student.User=models.Student.belongsTo(models.User,{
    foreignKey:"ID_USER",
    unique:true,
    as:"user"
});

//  rol - usuarios
models.Rol.User=models.Rol.hasMany(models.User,{
    foreignKey:"ID_ROLE"
});
models.User.Rol=models.User.belongsTo(models.Rol,{
    foreignKey:"ID_ROLE",
    as:"rol"
});




module.exports = models
