"use strict";

var DBInterface = require('./dbInterface');
var md5 = require('md5');

// Select table
var UserTable = DBInterface.extend({
    tableName: "users"
});

var userTable = null; // instance

class user{

    /* Constructor */
    // constructor(){
    //     this.userTable = new UserTable();
    // }

    /* Find all citizens */
    static findAll(request, callback){
        userTable = new UserTable();
        
        var sql = "SELECT * FROM users ORDER BY first_name ASC"; 
        
        userTable.query(sql, function(err, rows, fields) {
            callback(rows);
        });
    }

    /* Create a new user */
    static create(request, callback){
        var user_id = md5( new Date() ).substr(0, 30); // User id
        var password = md5( new Date() ).substr(0, 8); // Genarate a Random password

        userTable = new UserTable({
            user_id:        user_id,
            first_name:     request.body.first_name,
            last_name:      request.body.last_name,
            national_id:    request.body.national_id,
            phone:          request.body.phone,
            email:          request.body.email,
            password:       password,
            privilege:      request.body.privilege,
            account_status: 'Active',
            scope_province_id:  request.body.scope_province_id,
            scope_district_id:  request.body.scope_district_id
        });

        userTable.save(function(err, rows){
            if(err){
                console.log(err);
                callback({code:'101', message:'There was an internal error'});
            }else{
                callback({code:'100', message:'New user successfully created. Password: '+password});
            }
        });
    }

    /* Authenticate user */
    static authenticate(username, password, callback){
        userTable = new UserTable();
        userTable.query("SELECT * FROM users WHERE email='"+username+"' AND password='"+password+"'", function(err, rows, fields){
            if(err){
                console.log(err);
                callback({code:'101', message:'There was an internal error'});
            }else{
                if(rows.length === 0){
                    // No record
                    callback({code:'101', message:'Incorrect username or password'});
                }else{
                    var data;
                    if( rows[0].privilege === 'Admin'){
                        data = {
                            name:   rows[0].first_name+" "+rows[0].last_name,
                            email:  rows[0].email,
                            scope_district: rows[0].scope_district_id,
                            scope_province: rows[0].scope_province_id,
                            privilege_admin: rows[0].privilege
                        }
                    }else{
                        data = {
                            user:   rows[0].user_id,
                            name:   rows[0].first_name+" "+rows[0].last_name,
                            email:  rows[0].email,
                            scope_district: rows[0].scope_district_id,
                            scope_province: rows[0].scope_province_id,
                            privilege_user: rows[0].privilege
                        }
                    }
                    // Successfully authenticated
                    callback({code:'100', message:'User successfully authenticated', data:data});
                }
            }
        });
    }

}

module.exports = user;