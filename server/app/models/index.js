const models = {
    User: require("./user.js"),
    Admin: require("./admin"),
    Student: require("./student.js"),
    Professor: require("./professor"),
    Rol : require('./roles.js'),
    Multimedia: require('./multimedia.js'),
    Conversation: require('./conversation.js'),
    Message: require('./message.js'),
    Course:require('./course.js'),
    Building:require("./building.js"),
    Classroom:require('./classroom.js'),
    Section:require("./section.js"),
    Department:require("./department.js"),
    Career:require("./career.js"),
    RequerimentsCourse:require("./requirementsCourse.js"),
    Request : require('./requests.js'),
    RequestCareer : require('./requestCareer.js'),
    RequestCenter : require('./requestCenter.js'),
    PeriodAcademic: require('./periodAcademic.js'),
    Enrollment: require('./enrollment.js'),
    ServiceCareer : require('./serviceCareer.js')
    
}

// PERIODO - SOLICITUDES

models.PeriodAcademic.Request=models.PeriodAcademic.hasMany(models.Request,{
    foreignKey:"ID_PERIOD"
});
models.Request.PeriodAcademic=models.Request.belongsTo(models.PeriodAcademic,{
    foreignKey:"ID_PERIOD",
    as:"period"
});
// PERIODO - SECCIONES

models.PeriodAcademic.Section=models.PeriodAcademic.hasMany(models.Section,{
    foreignKey:"ID_PERIOD"
});
models.Section.PeriodAcademic=models.Section.belongsTo(models.PeriodAcademic,{
    foreignKey:"ID_PERIOD",
    as:"period"
});

// ESTUDIANTE - MATRICULA

models.Student.Enrollment=models.Student.hasMany(models.Enrollment,{
    foreignKey:"ID_STUDENT"
});
models.Enrollment.Student=models.Enrollment.belongsTo(models.Student,{
    foreignKey:"ID_STUDENT",
    as:"student"
});
// SECCIONES - MATRICULA

models.Section.Enrollment=models.Section.hasMany(models.Enrollment,{
    foreignKey:"ID_SECTION",
    as:"enrollments"
});
models.Enrollment.Section=models.Enrollment.belongsTo(models.Section,{
    foreignKey:"ID_SECTION",
    unique:true,
    as:"seccion"
});


// ESTUDIANTE - SOLICITUDES

models.Student.Request=models.Student.hasMany(models.Request,{
    foreignKey:"ID_STUDENT"
});
models.Request.Student=models.Request.belongsTo(models.Student,{
    foreignKey:"ID_STUDENT",
    as:"student"
});
// DOCENTE - SOLICITUDES

models.Professor.Request=models.Professor.hasMany(models.Request,{
    foreignKey:"ID_COORDINATOR"
});
models.Request.Professor=models.Request.belongsTo(models.Professor,{
    foreignKey:"ID_COORDINATOR",
    as:"coordinator"
});
// solicitudes - cambioCarrera

models.Request.RequestCareer=models.Request.hasMany(models.RequestCareer,{
    foreignKey:"ID_REQUEST",
    as:"requestCareer"
});
models.RequestCareer.Request=models.RequestCareer.belongsTo(models.Request,{
    foreignKey:"ID_REQUEST",
    as:"request"
});
// CARRERA - REQUERIMIENTOS DE LAS CLASES
models.Career.RequerimentsCourse=models.Career.hasMany(models.RequerimentsCourse,{
    foreignKey:"ID_CAREER"
});
models.RequerimentsCourse.Career=models.RequerimentsCourse.belongsTo(models.Career,{
    foreignKey:"ID_CAREER",
    unique:true,
    as:"career"
});


// solicitudes - cambioCentro

models.Request.RequestCenter=models.Request.hasMany(models.RequestCenter,{
    foreignKey:"ID_REQUEST",
    as:"requestCenter"
});
models.RequestCenter.Request=models.RequestCenter.belongsTo(models.Request,{
    foreignKey:"ID_REQUEST",
    as:"request"
});
// cambioCarrera - carrera

models.Career.RequestCareer=models.Career.hasMany(models.RequestCareer,{
    foreignKey:"ID_CAREER"
});
models.RequestCareer.Career=models.RequestCareer.belongsTo(models.Career,{
    foreignKey:"ID_CAREER",
    as:"career"
});

// requerimientos clase
models.RequerimentsCourse.belongsTo(models.Course, { foreignKey: 'ID_COURSE',as:"course" });
models.RequerimentsCourse.belongsTo(models.Course, { foreignKey: 'REQUIREMENT_ID_COURSE', as:"requirement" });
// CARRERA - CARRERA_SERVIDA
models.ServiceCareer.belongsTo(models.Career, { foreignKey: 'ID_CAREER',as:"career" });
models.ServiceCareer.belongsTo(models.Career, { foreignKey: 'ID_SERVICED_CAREER', as:"servicedCareer" });
// carrera - departamento 

models.Department.Career=models.Department.hasMany(models.Career,{
    foreignKey:"ID_DEPARTMENT"
});
models.Career.Department=models.Career.belongsTo(models.Department,{
    foreignKey:"ID_DEPARTMENT",
    unique:true,
    as:"department"
});




// aula - carrera

models.Career.Classroom=models.Career.hasMany(models.Classroom,{
    foreignKey:"ID_CAREER"
});
models.Classroom.Career=models.Classroom.belongsTo(models.Career,{
    foreignKey:"ID_CAREER",
    unique:true,
    as:"career"
});


// clase - carrera
models.Career.Course=models.Career.hasMany(models.Course,{
    foreignKey:"ID_CAREER"
});
models.Course.Career=models.Course.belongsTo(models.Career,{
    foreignKey:"ID_CAREER",
    unique:true,
    as:"career"
});



//  edificio - aula
models.Building.Classroom=models.Building.hasMany(models.Classroom,{
    foreignKey:"ID_BUILDING"
});
models.Classroom.Building=models.Classroom.belongsTo(models.Building,{
    foreignKey:"ID_BUILDING",
    unique:true,
    as:"building"
});
//  aula - seccion
models.Classroom.Section=models.Classroom.hasMany(models.Section,{
    foreignKey:"ID_CLASSROOM"
});
models.Section.Classroom=models.Section.belongsTo(models.Classroom,{
    foreignKey:"ID_CLASSROOM",
    unique:true,
    as:"classroom"
});
//  seccion - docente
models.Professor.Section=models.Professor.hasMany(models.Section,{
    foreignKey:"ID_PROFFERSSOR",
    as:"sections"
});
models.Section.Professor=models.Section.belongsTo(models.Professor,{
    foreignKey:"ID_PROFFERSSOR",
    unique:true,
    as:"Proffessor"
});
//  seccion - clase
models.Course.Section=models.Course.hasMany(models.Section,{
    foreignKey:"ID_COURSE"
});
models.Section.Course=models.Section.belongsTo(models.Course,{
    foreignKey:"ID_COURSE",
    unique:true,
    as:"course"
});

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
