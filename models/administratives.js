"use strict";

var DBInterface = require('./dbInterface');

// Select tables
var ProvinceTable = DBInterface.extend({tableName: "province"});
var DistrictTable = DBInterface.extend({tableName: "district"});
var UmurengeTable = DBInterface.extend({tableName: "umurenge"});
var AkagariTable = DBInterface.extend({tableName: "akagari"});
var UmuduguduTable = DBInterface.extend({tableName: "umudugudu"})

var districtTable = new DistrictTable();
var umurengeTable = new UmurengeTable();
var provinceTable = new ProvinceTable();
var akagariTable = new AkagariTable();
var umuduguduTable = new UmuduguduTable();

class administratives{

	// Find all provinces
    static findProvinces(request, callback) {
    	provinceTable.find('all', {where: "country_id = '1'"}, function(err, rows, fields) {
		    callback(rows);
		});
    }

	/* FInd all districts */
	static findDistricts(request, callback){
		districtTable.find('all', {where: "province_id = '"+request.params.prov_id+"'"}, function(err, rows, fields) {
		    callback(rows);
		});
	}

    // Find all umurenge
    static findUmurenge(request, callback) {
    	umurengeTable.find('all', {where: "district_id = '"+request.params.district_id+"'"}, function(err, rows, fields) {
		    callback(rows);
		});
    }

     // Find all akagari
    static findAkagari(request, callback) {
    	akagariTable.find('all', {where: "umurenge_id = '"+request.params.umurenge_id+"'"}, function(err, rows, fields) {
		    callback(rows);
		});
    }

    // Find all umudugudus
    static findUmudugudu( request, callback ){
    	umuduguduTable.find('all', {where: "akagari_id = '"+request.params.akagari_id+"'"}, function(err, rows, fields) {
		    callback(rows);
		});
    }
}

module.exports = administratives;