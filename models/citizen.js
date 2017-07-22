"use strict";

var DBInterface = require('./dbInterface');
var md5 = require('md5');

// Select table
var CitizenTable = DBInterface.extend({
	tableName: "citizen"
});

var citizenTable = null; // instance

class citizen{

	/* Constructor */
	citizen(){
		citizenTable = new CitizenTable();
	}

	/* Create a new citizen record*/
	static createNewCitizen(params, callback){
		var id = md5( new Date() ).substr(0, 30); // Generate random id of 30 characters
		
		citizenTable = new CitizenTable({
			citizen_id: 						id,
			first_name: 						params.body.first_name,
			last_name: 							params.body.last_name,
			national_id: 						params.body.nid,
			date_of_birth: 						params.body.dob,
			place_of_birth: 					params.body.place_of_birth,
			phone: 								params.body.phone_number,
			email: 								params.body.email,
			country_id: 						params.body.country,
			province_id: 						params.body.province,
			district_id: 						params.body.district,
			umurenge_id: 						params.body.umurenge,
			akagari_id: 						params.body.akagari,
			umudugudu: 							params.body.umudugudu,
			photo_file_path: 					params.body.photo,
			father_name: 						params.body.father,
			mother_name: 						params.body.mother,
			parents_current_residence: 			params.body.parents_curr_residence,
			parents_contact_phone: 				params.body.parents_contact_phone,
			employer_name: 						params.body.employer_name,
			employer_identification_number: 	params.body.employer_nid,
			employer_phone: 					params.body.employer_phone_number,
			employer_residence: 				params.body.employer_curr_residence
		});

		citizenTable.save(function(rows){
			console.log('Affected rows are: ' + rows);
		});
		console.log(params.body);
		callback('Created successfully');

	}

	/* FInd all citizens */
	static findAll(params, callback){
		citizenTable = new CitizenTable();
		
		citizenTable.find('all', function(err, rows, fields) {
		    console.log(rows);

		    callback(rows);
		});
	}
}

module.exports = citizen;