"use strict";

var conn= require('./dbInterface');
var md5 = require('md5');
var mailer = require('../helpers/mailer');

// Use mysql connection cb (callback)
function useConnection(sql, cb){
    conn.connect(function (err) {
        if (err) throw err;
        conn.query(sql, function (err, rows){
            if(err) throw err;
            cb(rows);
        } );
    });
}


class user{

    /* Find all users */
    /*
    static findAll(request, callback){
        
        var sql = "SELECT * FROM users ORDER BY first_name ASC"; 
        useConnection(sql, function(rows){
            callback(rows);
        })
    }
    */
    /* Create a new user */
    /*
    static create(request, callback){
        //Verify if we don't have a user with a such email
        this.findUserByEmail( request.body.email, function(rows){
            if(rows > 0){
                //The user already exists
                callback({code:'101', message:'A user with a similar email already exists'});
            }else{
                // User not exists. Go on
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
                    scope_province_id:  request.body.province,
                    scope_district_id:  request.body.district,
                    scope_akagari_id:   request.body.akagari   
                });

                userTable.save(function(err, rows){
                    if(err){
                        console.log(err);
                        callback({code:'101', message:'There was an internal error'});
                    }else{
                        // Send email message to the user 
                        var mailparams = {
                            mailto: request.body.email,
                            mailsubject: 'Welcome to RIMS',
                            mailHTMLmessage: 'Thank your for signing up for an account on Rwanda Internal Migration Management System.<br/>Your Account details are:<p/> Username: '+request.body.email+' <br/>Password: '+password+' <p/>This is default password but you can choose to change it later once you are logged into the system. <p/> Thank you, <p/><i>RIMS team</i>'
                        };
                        mailer.sendMail(mailparams);

                        callback({code:'100', message:'New user successfully created and email with password sent to '+request.body.email});
                    }
                });
            }
        } );
    }
    */

    /* Authenticate user */
    static authenticate(username, password, callback){
        var sql = "SELECT * FROM users WHERE email='"+username+"' AND password='"+password+"'";
        
        useConnection(sql, function(rows){
            console.log("DATA HERE COMES: "+rows);
            if(rows.length === 0){
                    // No record
                    callback({code:'101', message:'Incorrect username or password'});
                }else{
                    var data;
                    if( rows[0].privilege === 'Admin'){
                        data = {
                            name:   rows[0].first_name+" "+rows[0].last_name,
                            email:  rows[0].email,
                            scope_district:     rows[0].scope_district_id,
                            scope_province:     rows[0].scope_province_id,
                            scope_umurenge:     rows[0].scope_umurenge_id,
                            scope_akagari:      rows[0].scope_akagari_id,
                            privilege_admin:    rows[0].privilege
                        }
                    }else{
                        data = {
                            user:   rows[0].user_id,
                            name:   rows[0].first_name+" "+rows[0].last_name,
                            email:  rows[0].email,
                            scope_district: rows[0].scope_district_id,
                            scope_province: rows[0].scope_province_id,
                            scope_umurenge:     rows[0].scope_umurenge_id,
                            scope_akagari:      rows[0].scope_akagari_id,
                            privilege_user: rows[0].privilege
                        }
                    }
                    // Successfully authenticated
                    callback({code:'100', message:'User successfully authenticated', data:data});
                }

        })
    }
    /*
    static findUserByEmail(email, callback){
        userTable = new UserTable();
        userTable.query("SELECT * FROM users WHERE email='"+email+"'", function(err, rows, fields){
            callback(rows.length);
        });
    }
    */
}

module.exports = user;