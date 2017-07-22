"use strict";
var Citizen = require('../models/citizen');

class citizenController {

    static createNewCitizen(request, response, next) {
        Citizen.createNewCitizen( request, function(results) {
            response.render('citizens', { data: results });
        });		
    }

    static findAllCitizens(request, response, next) {
        Citizen.findAll( request, function(results) {
            response.render('citizens', { citizens: results });
        });		
    }
}

module.exports = citizenController;