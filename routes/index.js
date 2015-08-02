var express = require('express');
var router = express.Router();
// importamos el cotrolador
var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

// registramos las rutas
router.get('/quizes/question', quizController.question);
router.get('/quizes/answer', quizController.answer);
router.get('/author', function(req, res) {
  res.render('author');
});


module.exports = router;
