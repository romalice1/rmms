"use strict";
var Citizen = require('../models/citizen');

class citizenController {

    static createNewCitizen(request, response, next) {
        Citizen.createNewCitizen( request, function(results) {
            // response.render('new-citizen', { message: results });
            response.redirect('/citizens');
        });		
    }

    static moveCitizen(request, response, next) {
        Citizen.moveCitizen( request, function(results) {
            //Redirect to view citizen
            response.redirect('/show-citizen/'+results.citizen_id);
            // response.send({results});
        });     
    }

    static findAllCitizens(request, response, next) {
        Citizen.findAll( request, function(results) {
            response.send({results});
        });		
    }

    static findById(request, response, next) {
        Citizen.findById( request, function(results) {
            response.send({ data: results });
        });     
    }

    static findWhere( request, response, next){
        Citizen.findWhere( request, function(results) {
            response.send({ results });
        }); 
    }
}

module.exports = citizenController;