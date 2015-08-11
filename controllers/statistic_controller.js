var models = require('../models/models.js');
var Sequelize = require('sequelize');

// inicializamos las variables para las estadísticas
var estadisticas = {};

// Copyright de las ideas sobre el uso de Promise.all() y aggregate del foro
exports.calcular = function(req, res, next){
  Sequelize.Promise.all([
    models.Quiz.count(),
    models.Comment.count(),
    models.Comment.aggregate('QuizId','count', { distinct: true })
  ]).then( function(valores){
    estadisticas.preguntas = valores[0];
    estadisticas.comentarios = valores[1];
    estadisticas.media_comentarios_pregunta = (estadisticas.comentarios / estadisticas.preguntas).toFixed(2);
    estadisticas.preguntas_sin_comentarios = estadisticas.preguntas - valores[2];
    estadisticas.preguntas_con_comentarios = valores[2];
  }).catch( function(error){
    next(error);
  }).finally( function(){
    next();
  });
};

// GET /statistics
exports.show = function(req, res){
  // mostramos las estadísticas con la vista
  res.render('statistics', { estadisticas: estadisticas, errors: [] });
};