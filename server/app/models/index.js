const models = {
    User: require("./user.js"),
    Admin: require("./admin"),
    Student: require("./studen"),
    Professor: require("./professor"),
    Rol : require('./roles.js')
}
models.User.Professor=models.User.hasMany(models.Professor,{
    foreignKey:"ID_USER"
});
models.Professor.User=models.Professor.belongsTo(models.User,{
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
