var path = require('path');
// Postgres DATABASE_URL = postgress://user:passwd@host:port/database
// SQLite DATABASE_URL = sqlite://:@:/
var url =  process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var protocol = (url[1] || null);
var dialect = (url[1] || null);
var user = (url[2] || null);
var pwd = (url[3] || null);
var host = (url[4] || null);
var port = (url[5] || null);
var DB_name = (url[6] || null);
var storage = process.env.DATABASE_STORAGE;
console.log("base de datos" + url);

// Cargar Modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite: o Postgres
var sequelize = new Sequelize(DB_name, user, pwd,
	{ dialect: 	dialect,
	  protocol: protocol,
	  port: 	port,
	  host: 	host,
	  storage: 	storage,  //solo SQLite (.env)
	  omitNull: true		// solo Postgres
	}
);
console.log("base de datos" + sequelize.dialect + sequelize.protocol +sequelize.port + sequelize.host);
// Importar la definicion de la tabla Quiz en quiz.js
//var quiz_path = path.join(__dirname, 'quiz');
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));
console.log("path" + path.join(__dirname, 'quiz'));
exports.Quiz = Quiz; // exportar definición de tabla Quiz
console.log("Quiz" + Quiz);
// sequelize.sync() crea e inicializa tabla de preguntas en DB
sequelize.sync().then(function(){
	// then(..) ejecuta el manejador una vez creada la table
	Quiz.count().then(function(count){
		if(count === 0){
			Quiz.create({ pregunta : 'Capital de Italia', respuesta : 'Roma', tema: 'humanidades'});
			Quiz.create({ pregunta : 'Capital de Portugal', respuesta : 'Lisboa', tema: 'humanidades'});
		}
	});
});
