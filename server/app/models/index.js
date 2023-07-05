const models = {
    User: require("./user.js"),
    Admin: require("./admin"),
    Student: require("./student.js"),
    Professor: require("./professor"),
    Rol : require('./roles.js'),
    Multimedia: require('./multimedia.js')
}
models.User.Professor=models.User.hasMany(models.Professor,{
    foreignKey:"ID_USER"
});
models.Professor.User=models.Professor.belongsTo(models.User,{
    foreignKey:"ID_USER",
    unique:true,
    as:"user"
});

models.User.Multimedia=models.User.hasMany(models.Multimedia,{
    foreignKey:"ID_USER",
    as:"multimedia"
});
models.Multimedia.User=models.Multimedia.belongsTo(models.User,{
    foreignKey:"ID_USER",
    unique:true,
    as:"user"
});


models.User.Student=models.User.hasMany(models.Student,{
    foreignKey:"ID_USER"
});
models.Student.User=models.Student.belongsTo(models.User,{
    foreignKey:"ID_USER",
    unique:true,
    as:"user"
});


models.Rol.User=models.Rol.hasMany(models.User,{
    foreignKey:"ID_ROLE"
});
models.User.Rol=models.User.belongsTo(models.Rol,{
    foreignKey:"ID_ROLE",
    as:"rol"
});




module.exports = models
