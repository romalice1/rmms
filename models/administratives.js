"use strict";

var DBInterface = require('./dbInterface');

// Select tables
var ProvinceTable = DBInterface.extend({tableName: "province"});
var DistrictTable = DBInterface.extend({tableName: "district"});
var umurengeTable = DBInterface.extend({tableName: "umurenge"});
var akagariTable = DBInterface.extend({tableName: "akagari"});

var districtTable = new DistrictTable();
var umurengeTable = new umurengeTable();
var provinceTable = new ProvinceTable();
var akagariTable = new akagariTable();

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
}

module.exports = administratives;