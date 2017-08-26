"use strict";

var DBInterface = require('./dbInterface');
var md5 = require('md5');

// Select table
var CitizenTable = DBInterface.extend({
	tableName: "citizen"
});

var MigrationsTable = DBInterface.extend({
	tableName: "migrations"
});

var citizenTable = null; // instance
var migrationsTable = null;

class citizen{

	/* Constructor */
	citizen(){
		citizenTable = new CitizenTable();
	}

	/* Create a new citizen record*/
	static createNewCitizen(request, callback){
		var id = md5( new Date() ).substr(0, 30); // Generate random id of 30 characters
		
		citizenTable = new CitizenTable({
			citizen_id: 						id,
			first_name: 						request.body.first_name,
			last_name: 							request.body.last_name,
			national_id: 						request.body.nid,
			date_of_birth: 						request.body.dob,
			place_of_birth: 					request.body.place_of_birth,
			phone: 								request.body.phone_number,
			email: 								request.body.email,
			country_id: 						request.body.country,
			province_id: 						request.body.province,
			district_id: 						request.body.district,
			umurenge_id: 						request.body.umurenge,
			akagari_id: 						request.body.akagari,
			umudugudu: 							request.body.umudugudu,
			photo_file_path: 					request.body.photo,
			father_name: 						request.body.father,
			mother_name: 						request.body.mother,
			parents_current_residence: 			request.body.parents_curr_residence,
			parents_contact_phone: 				request.body.parents_contact_phone,
			employer_name: 						request.body.employer_name,
			employer_identification_number: 	request.body.employer_nid,
			employer_phone: 					request.body.employer_phone_number,
			employer_residence: 				request.body.employer_curr_residence
		});

		citizenTable.save(function(rows){
			console.log('Affected rows are: ' + rows);
			callback('Created! '+rows);
		});

	}

	/* Move citizen */
	static moveCitizen(request, callback){
		citizenTable = new CitizenTable();

		// Update citizen
		var sql = ""
			+"UPDATE citizen SET "
			+"province_id='"+ request.body.province +"', "
			+"district_id='"+ request.body.district +"', "
			+"umurenge_id='"+ request.body.umurenge +"', "
			+"akagari_id='"+ request.body.akagari +"', "
			+"umudugudu='"+ request.body.umudugudu +"'"
			+"WHERE citizen_id='"+request.body.citizen_id+"'";

		citizenTable.query(sql, function(err, rows, fields) {
		    if(err){
				callback( {code:'101', message:"There was an internal error at level #1", citizen_id: request.body.citizen_id} );		    	
		    }else{

				migrationsTable = new MigrationsTable();

		    	// Insert new record into migrations
		    	var m_id = md5( new Date() ).substr(0, 30); // Generate random id of 30 characters
		    	var sql1 = "INSERT INTO migrations ( migration_id, citizen_id, country_id, province_id, district_id, umurenge_id, akagari_id, umudugudu )"
		    		+" VALUES("
		    			+"'"+m_id+"', "
		    			+"'"+request.body.citizen_id+"', "
		    			+"'1'"
		    			+"'"+request.body.province+"', "
		    			+"'"+request.body.district+"', "
		    			+"'"+request.body.umurenge+"', "
		    			+"'"+request.body.akagari+"', "
		    			+"'"+request.body.umudugudu+"'"
		    		+")";

				migrationsTable.query(sql1, function(err, rows, fields){
					if(err){
						console.log(err);
						callback( {code:'101', message:"There was an internal error at level #2", citizen_id: request.body.citizen_id} );
					}else{
						callback( {code:'100', message:"The citizen was successfully moved", citizen_id: request.body.citizen_id} );
					}
				});
		    }
		});
	}

	/* FInd all citizens */
	static findAll(request, callback){
		citizenTable = new CitizenTable();
		console.log(request.params);
		// Filter by view scope
		var sql;
		// var sql = "SELECT citizen_id, first_name, last_name, phone, province_name, district_name, umurenge_name FROM citizen c, province p, district d, umurenge u WHERE c.province_id = p.province_id AND c.district_id = d.district_id AND c.umurenge_id = u.umurenge_id ORDER BY first_name ASC";
		if( request.params.scope_province === '*'){
			//Show all provinces
			sql = "SELECT citizen_id, first_name, last_name, phone, province_name, district_name, umurenge_name FROM citizen c, province p, district d, umurenge u WHERE c.province_id = p.province_id AND c.district_id = d.district_id AND c.umurenge_id = u.umurenge_id ORDER BY first_name ASC";
		}else{
			/* Show a specific province*/
			//Filter by district
			if( request.params.scope_district === '*' ){
				sql = "SELECT citizen_id, first_name, last_name, phone, province_name, district_name, umurenge_name FROM citizen c, province p, district d, umurenge u WHERE c.province_id='"+request.params.scope_province+"' AND c.province_id = p.province_id AND c.district_id = d.district_id AND c.umurenge_id = u.umurenge_id ORDER BY first_name ASC";
			}else{
				//Show only specific districts
				sql = "SELECT citizen_id, first_name, last_name, phone, province_name, district_name, umurenge_name FROM citizen c, province p, district d, umurenge u WHERE c.province_id='"+request.params.scope_province+"' AND c.district_id='"+request.params.scope_district+"' AND c.province_id = p.province_id AND c.district_id = d.district_id AND c.umurenge_id = u.umurenge_id ORDER BY first_name ASC";
			}
		}
		
		citizenTable.query(sql, function(err, rows, fields) {

		    callback(rows);
		});
	}

	/* Find a citizen by ID */
	static findById(request, callback){

		var citizen_id = request.params.citizen_id;
		citizenTable = new CitizenTable();
		
		var sql = "SELECT c.*, DATE_FORMAT(c.register_date, '%M %d, %Y') as created_date, DATE_FORMAT(c.date_of_birth, '%M %d, %Y') as birth_date, province_name, district_name, umurenge_name, akagari_name FROM citizen c, province p, district d, umurenge u, akagari aka WHERE c.citizen_id = '"+citizen_id+"' AND c.province_id = p.province_id AND c.district_id = d.district_id AND c.umurenge_id = u.umurenge_id AND c.akagari_id = aka.akagari_id ORDER BY first_name ASC"; 
		
		citizenTable.query(sql, function(err, rows, fields) {
		    callback(rows);
		});
	}

	/* Find citizens by a keyword */
	static findWhere(request, callback){
		//Find strictly by national_id (it's a business rule)
		var keyword = request.params.keyword;
		citizenTable = new CitizenTable();
		
		var sql = "SELECT c.*, province_name, district_name, umurenge_name, akagari_name FROM citizen c, province p, district d, umurenge u, akagari aka WHERE c.national_id LIKE '%"+keyword+"%' AND c.province_id = p.province_id AND c.district_id = d.district_id AND c.umurenge_id = u.umurenge_id AND c.akagari_id = aka.akagari_id ORDER BY first_name ASC"; 
		
		citizenTable.query(sql, function(err, rows, fields) {

		    callback(rows);
		});
	}
}

module.exports = citizen;