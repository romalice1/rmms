"use strict";
var Citizen = require('../models/citizen');

class citizenController {

    static createNewCitizen(request, response, next) {
        Citizen.createNewCitizen( request, function(results) {
            response.render('new-citizen', { message: results });
        });		
    }

    static moveCitizen(request, response, next) {
        Citizen.moveCitizen( request, function(results) {
            response.render('move-citizen', { results });
        });     
    }

    static findAllCitizens(request, response, next) {
        Citizen.findAll( request, function(results) {
            response.render('citizens', { citizens: results });
        });		
    }

    static findById(request, response, next) {
        Citizen.findById( request, function(results) {
            response.send({ data: results });
        });     
    }
}

module.exports = citizenController;