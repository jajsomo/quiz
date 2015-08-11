// Get /login  -- Formulario de login
exports.new= function(req, res){
	var errors = req.session.errors || {};
	req.session.errors = {}
	res.render('sessions/new', {errors: errors});
};

// POST /login -- Crear la sesion
exports.create= function(req,res) {
	var login	= req.body.login;
	var password	=req.body.password;

	var userController = require('./user_controller');
	userController.autenticar(login, password, function(error, user){
		if(error) { // si hay error retomamos mensajes de error de sesion
			req.session.errors = [{"message": 'Se ha producido un error: '+ error}];
			res.redirect("/login");
			return;
		}
		// Crear req.session.user y guardar campos  id y username
		// La sesion se define por la existencia de: req.session.user
		req.session.user = {id:user.id, username:user.username};
		res.redirect(req.session.redir.toString()); // redireccion a path anterior a login
	});
};

//DELETE /logout -- Destruir sesion
exports.destroy= function(req,res) {
	req.session.user.destroy().then(
    function(){
      res.redirect(req.session.redir.toString());
    }
  ).catch(function(error){ next(error)});

	//delete req.session.user;
	//res.redirect(req.session.redir.toString()); // redirect a path anterior a login
};