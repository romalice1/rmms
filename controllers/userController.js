var User = require('../models/user');
var ENV = require('../config/environment');

var Client = require('node-rest-client').Client;
var client = new Client();

class userController {

    static findAll(request, response, next) {
        User.findAll( request, function(results) {
            response.send(results);
        });		
    }

    static create(request, response, next){
    	User.create(request, function(results){
            if(results.code==='100')
    		  response.render('new-user', {success: results.message} );
            else
                response.render('new-user', {error: results.message} );
    	});
    }

    static authenticate(request, response, next){
    	User.authenticate(request.body.username, request.body.password, function(results){
    		//Authentication failed
    		if(results.code==='101'){
    			//send negative response on the current route
    			response.render('index', {message: results.message});
    		}else{
                //Start session
                request.session.data = results.data;
                response.locals.session = request.session;
    			//Redirect to the welcome page
                response.redirect('/citizens');
    		}
    	})
    }

    static logout(request, response, next){
        request.session.destroy(function(err) {
          if(err) {
            console.log(err);
          } else {
            // After logout
            response.redirect('/');
          }
        });
    }
}

module.exports = userController;