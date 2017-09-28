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
		var id = md5( new Date().getTime() ); // Generate random id of 64 characters

		// Check if the photo was provided
		if(!request.files.profile_photo){
			console.log('Photo is undefined');
		}else{
			//Move the photo to the new location
			var sampleFile = request.files.profile_photo;
			var filename = md5( new Date().getTime() ).slice(-10)+sampleFile.name;
			var path = "./public/images/citizen_photos/"+filename;
 
			// Use the mv() method to place the file somewhere on your server 
			sampleFile.mv(path, function(err) {
			    if (err){
			    	console.log("Can not move new file: "+err);
			    }else{
			    	console.log("Photo file was moved successfully " + filename);
			    }
			});
		}
		
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
			umudugudu_id: 						request.body.umudugudu,
			photo_file_path: 					filename,
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
			+"umudugudu_id='"+ request.body.umudugudu +"'"
			+"WHERE citizen_id='"+request.body.citizen_id+"'";

		citizenTable.query(sql, function(err, rows, fields) {
		    if(err){
		    	console.log("There was an internal error at level #1");
				callback( {code:'101', message:"There was an internal error at level #1", citizen_id: request.body.citizen_id} );		    	
		    }else{
		    	console.log("Ready to change migrationsw table");
		    	// Insert new record into migrations
		    	var m_id = md5( new Date() ).slice(-30); // Generate random id of 30 characters
		    	migrationsTable = new MigrationsTable({
		    		migration_id: 	m_id, 
		    		citizen_id: 	request.body.citizen_id, 
		    		country_id: 	"1", 
		    		province_id: 	request.body.province, 
		    		district_id: 	request.body.district, 
		    		umurenge_id: 	request.body.umurenge, 
		    		akagari_id: 	request.body.akagari, 
		    		umudugudu_id: 	request.body.umudugudu,
		    		user_id: 		request.session.data.user
		    	});

		    	migrationsTable.save(function(rows){
		    		console.log('Migrations here: '+rows);
		    		callback( {code:'100', message:'Citizen successfully moved', citizen_id: request.body.citizen_id});
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
		if( request.params.scope_province === '*'){
			//Show all provinces
			sql = "SELECT citizen_id, first_name, last_name, phone, province_name, district_name, umurenge_name, akagari_name, umudugudu_name FROM citizen c, province p, district d, umurenge u, akagari a, umudugudu du WHERE c.province_id = p.province_id AND c.district_id = d.district_id AND c.umurenge_id = u.umurenge_id AND c.akagari_id=a.akagari_id AND c.umudugudu_id=du.umudugudu_id ORDER BY first_name ASC";
		}else{
			/* Show a specific province*/
			//Filter by district
			if( request.params.scope_district === '*' ){
				sql = "SELECT citizen_id, first_name, last_name, phone, province_name, district_name, umurenge_name, akagari_name, umudugudu_name FROM citizen c, province p, district d, umurenge u, akagari a, umudugudu du WHERE c.province_id='"+request.params.scope_province+"' AND c.province_id = p.province_id AND c.district_id = d.district_id AND c.umurenge_id = u.umurenge_id AND c.akagari_id=a.akagari_id AND c.umudugudu_id=du.umudugudu_id ORDER BY first_name ASC";
			}else{
				if( request.params.scope_umurenge === '*' ){
					sql = "SELECT citizen_id, first_name, last_name, phone, province_name, district_name, umurenge_name, akagari_name, umudugudu_name FROM citizen c, province p, district d, umurenge u, akagari a, umudugudu du WHERE c.district_id='"+request.params.scope_district+"' AND c.province_id = p.province_id AND c.district_id = d.district_id AND c.umurenge_id = u.umurenge_id AND c.akagari_id=a.akagari_id AND c.umudugudu_id=du.umudugudu_id ORDER BY first_name ASC";
				}else{
					if( request.params.scope_akagari === '*' ){
						sql = "SELECT citizen_id, first_name, last_name, phone, province_name, district_name, umurenge_name, akagari_name, umudugudu_name FROM citizen c, province p, district d, umurenge u, akagari a, umudugudu du WHERE c.umurenge_id='"+request.params.scope_umurenge+"' AND c.province_id = p.province_id AND c.district_id = d.district_id AND c.umurenge_id = u.umurenge_id AND c.akagari_id=a.akagari_id AND c.umudugudu_id=du.umudugudu_id ORDER BY first_name ASC";
					}else{
						sql = "SELECT citizen_id, first_name, last_name, phone, province_name, district_name, umurenge_name, akagari_name, umudugudu_name FROM citizen c, province p, district d, umurenge u, akagari a, umudugudu du WHERE c.umurenge_id='"+request.params.scope_umurenge+"' AND c.akagari_id='"+request.params.scope_akagari+"' AND c.province_id = p.province_id AND c.district_id = d.district_id AND c.umurenge_id = u.umurenge_id AND c.akagari_id=a.akagari_id AND c.umudugudu_id=du.umudugudu_id ORDER BY first_name ASC";
					}
				}
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
		
		var sql = "SELECT c.*, DATE_FORMAT(c.register_date, '%M %d, %Y') as created_date, DATE_FORMAT(c.date_of_birth, '%M %d, %Y') as birth_date, province_name, district_name, umurenge_name, akagari_name, umudugudu_name FROM citizen c, province p, district d, umurenge u, akagari aka, umudugudu du WHERE c.citizen_id = '"+citizen_id+"' AND c.province_id = p.province_id AND c.district_id = d.district_id AND c.umurenge_id = u.umurenge_id AND c.akagari_id = aka.akagari_id AND c.umudugudu_id=du.umudugudu_id ORDER BY first_name ASC"; 
		
		citizenTable.query(sql, function(err, rows, fields) {
		    callback(rows);
		});
	}

	/* Find citizens by a keyword */
	static findWhere(request, callback){
		//Find strictly by national_id (it's a business rule)
		var keyword = request.params.keyword;
		citizenTable = new CitizenTable();
		
		var sql = "SELECT c.*, province_name, district_name, umurenge_name, akagari_name FROM citizen c, province p, district d, umurenge u, akagari aka, umudugudu du WHERE c.national_id = '"+keyword+"' AND c.province_id = p.province_id AND c.district_id = d.district_id AND c.umurenge_id = u.umurenge_id AND c.akagari_id = aka.akagari_id AND c.umudugudu_id=du.umudugudu_id ORDER BY first_name ASC"; 
		
		citizenTable.query(sql, function(err, rows, fields) {

		    callback(rows);
		});
	}

	/* Get citizen's migration history */
	static getMigrationHistory(request, callback){
		var id = request.params.citizen_id;
		console.log('MyID: '+id);
		migrationsTable = new MigrationsTable();

		var sql =  "SELECT m.*, concat(c.first_name, ' ', c.last_name) as citizen_name, concat(u.first_name,' ', u.last_name) as agent_name, concat(aka.akagari_name, ', ', umu.umudugudu_name) as location, DATE_FORMAT(m.migration_date, '%M %d, %Y %r') as migration_date FROM migrations m, users u, citizen c, akagari aka, umudugudu umu where m.citizen_id = '"+id+"' AND m.citizen_id=c.citizen_id AND m.user_id=u.user_id AND m.akagari_id=aka.akagari_id AND m.umudugudu_id=umu.umudugudu_id";

		// var sql =  "SELECT m.*, concat(c.first_name, ' ', c.last_name) as citizen_name, concat(u.first_name,' ', u.last_name) as agent_name, concat(p.province_name, ', ', d.district_name) as location, DATE_FORMAT(m.migration_date, '%M %d, %Y %r') as migration_date FROM migrations m, users u, citizen c, province p, district d where m.citizen_id = '"+id+"' AND m.citizen_id=c.citizen_id AND m.user_id=u.user_id AND m.province_id=p.province_id AND m.district_id=d.district_id";


		migrationsTable.query(sql, function(err, rows, fields) {

		    callback(rows);
		});
	}
}

module.exports = citizen;