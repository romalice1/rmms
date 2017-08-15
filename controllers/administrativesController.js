"use strict";
var Administratives = require('../models/administratives');

class administrativesController {

    // Find all provinces
    static getProvinces(request, response, next) {
        Administratives.findProvinces( request, function(results) {
            response.send({ data: results });
        });     
    }

    // Find all districts
    static getDistricts(request, response, next) {
        Administratives.findDistricts( request, function(results) {
            response.json({data: results});
        });     
    }

    // Find all imirenge
    static getUmurenge(request, response, next) {
        Administratives.findUmurenge( request, function(results) {
            response.send({ data: results });
        });     
    }

     // Find all utugari
    static getAkagari(request, response, next) {
        Administratives.findAkagari( request, function(results) {
            response.send({ data: results });
        });     
    }

    static renderNewCitizenForm(request, response, next){
        Administratives.findProvinces( request, function(results) {
            response.render('new-citizen', { provinces: results });
        });     
    }
}

module.exports = administrativesController;