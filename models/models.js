var path = require('path');
// Postgres DATABASE_URL = postgres://lxguokvzdquapu:7WnMSPIKWpFblsvY04-AeKhQoa@ec2-54-83-10-210.compute-1.amazonaws.com:5432/d7jsvfapvbq09q
// SQLite DATABASE_URL = sqlite://:@:/
//DATABASE_URL = "postgres://lxguokvzdquapu:7WnMSPIKWpFblsvY04-AeKhQoa@ec2-54-83-10-210.compute-1.amazonaws.com:5432/d7jsvfapvbq09q";
//DATABASE_URL = "sqlite://:@:/";
var url = DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name	 = (url[6]||null);
var user	 = (url[2]||null);
var pwd		 = (url[3]||null);
var protocol = (url[1]||null);
var dialect	 = (url[1]||null);
var port	 = (url[5]||null);
var host	 = (url[4]||null);
var storage  = process.env.DATABASE_STORAGE;

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

// Importar la definicion de la tabla Quiz en quiz.js
//var quiz_path = path.join(__dirname, 'quiz');
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

exports.Quiz = Quiz; // exportar definición de tabla Quiz

// sequelize.sync() crea e inicializa tabla de preguntas en DB
sequelize.sync().then(function(){
	// then(..) ejecuta el manejador una vez creada la table
	Quiz.count().then(function(count){
		if(count === 0){ // la tabla se inicializa solo si está vacia
			Quiz.create({ pregunta : 'Capital de Italia', respuesta : 'Roma', tema:'humanidades'})
			Quiz.create({ pregunta : 'Capital de Portugal', respuesta : 'Lisboa', tema:'humanidades'});//.then(function(){console.log('Bases de datos inicializada')});
		}
	});
});
