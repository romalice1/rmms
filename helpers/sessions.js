class session{
	// Returns Boolean
	static isAuthenticated(request){
		if(request.session.data){
			//Is authenticated
			return true;
		}else{
			return false;
		}
	}

	//Authenticate route
	static authenticateRoute(req, res, callback){
		if(req.session.data){
			//Is authenticated
			callback(true);
		}else{
			res.redirect('/');
		}
	}
}

module.exports = session;