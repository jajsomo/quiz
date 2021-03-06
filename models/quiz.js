// Definicion del modelo Quiz

module.exports = function(sequelize, DataTypes){
	return sequelize.define('Quiz',
		{ pregunta: {
				type: DataTypes.STRING,
				validate: { notEmpty: {msg: "-> Falta Pregunta"}}
			},
		  respuesta: {
				type: DataTypes.STRING,
				validate: { notEmpty: {msg: "-> Falta Respuesta"}}
			},
			tema: {
				type: DataTypes.STRING,
				validate: {
					isIn: {
					  args: [['otro', 'humanidades', 'ocio', 'ciencia', 'tecnologia']],
					  msg: "-> Tema no v�lido"
					}
				}
			}
		}
	);
}
