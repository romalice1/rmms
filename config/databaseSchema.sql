----------------------------------
-- THIS IS THE DATABASE SCHEMA --
----------------------------------

--- DATABASE ---
CREATE DATABASE rwanda_migration_management_sys;
--

---- TABLES ----
-- table country
CREATE TABLE IF NOT EXISTS country(
	country_id int AUTO_INCREMENT,
	country_name VARCHAR(30),
	PRIMARY KEY (country_id)
);

-- table province
CREATE TABLE IF NOT EXISTS province(
	province_id int AUTO_INCREMENT,
	province_name VARCHAR(30),
	country_id int,
	PRIMARY KEY (province_id),
    FOREIGN KEY (country_id) REFERENCES country(country_id)
);

-- table district
CREATE TABLE IF NOT EXISTS district(
	district_id int AUTO_INCREMENT,
	district_name VARCHAR(30),
	province_id int,
	PRIMARY KEY (district_id),
    FOREIGN KEY (province_id) REFERENCES province(province_id)
);

-- table umurenge
CREATE TABLE IF NOT EXISTS umurenge(
	umurenge_id int AUTO_INCREMENT,
	umurenge_name VARCHAR(30),
	district_id int,
	PRIMARY KEY (umurenge_id),
    FOREIGN KEY (district_id) REFERENCES district(district_id)
);

--- table akagari
CREATE TABLE IF NOT EXISTS akagari(
	akagari_id int AUTO_INCREMENT,
	akagari_name VARCHAR(30),
	umurenge_id int,
	PRIMARY KEY (akagari_id),
    FOREIGN KEY (umurenge_id) REFERENCES umurenge(umurenge_id)
);

--- table umudugudu
CREATE TABLE IF NOT EXISTS umudugudu(
	umudugudu_id int AUTO_INCREMENT,
	umudugudu_name VARCHAR(30),
	akagari_id int,
	PRIMARY KEY (umudugudu_id),
    FOREIGN KEY (akagari_id) REFERENCES akagari(akagari_id)
);

-- table citizen
CREATE TABLE IF NOT EXISTS citizen(
	citizen_id VARCHAR(65),

	first_name VARCHAR(30),
	last_name VARCHAR(30),
	national_id VARCHAR(16) UNIQUE NOT NULL,
	date_of_birth date,
	place_of_birth VARCHAR(100),
	phone VARCHAR(30),
	email VARCHAR(100),
	
	country_id int,
	province_id int,
	district_id int,
	umurenge_id int, 
	akagari_id int,
	
	umudugudu VARCHAR(100),

	photo_file_path VARCHAR(100),

	father_name VARCHAR(100),
	mother_name VARCHAR(100),
	parents_current_residence VARCHAR(100),
	parents_contact_phone VARCHAR(30),

	employer_name VARCHAR(100),
	employer_identification_number VARCHAR(100),
	employer_phone VARCHAR(30),
	employer_residence VARCHAR(100),
	register_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

	PRIMARY KEY (citizen_id),
    FOREIGN KEY (country_id) REFERENCES country(country_id),
    FOREIGN KEY (province_id) REFERENCES province(province_id),
    FOREIGN KEY (district_id) REFERENCES district(district_id),
    FOREIGN KEY (umurenge_id) REFERENCES umurenge(umurenge_id),
    FOREIGN KEY (akagari_id) REFERENCES akagari(akagari_id)
);

-- table migration
CREATE TABLE migrations(
	migration_id VARCHAR(30),
	
	citizen_id VARCHAR(65),

	country_id int,
	province_id int,
	district_id int,
	umurenge_id int, 
	akagari_id int,

	umudugudu VARCHAR(100),

	user_id VARCHAR(30),

	migration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

	PRIMARY KEY (migration_id),
	FOREIGN KEY (citizen_id) REFERENCES citizen(citizen_id),
    FOREIGN KEY (country_id) REFERENCES country(country_id),
    FOREIGN KEY (province_id) REFERENCES province(province_id),
    FOREIGN KEY (district_id) REFERENCES district(district_id),
    FOREIGN KEY (umurenge_id) REFERENCES umurenge(umurenge_id),    
    FOREIGN KEY (akagari_id) REFERENCES akagari(akagari_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

--
-- USER ADMINISTRATION --
--

-- table users
CREATE TABLE users(
	user_id VARCHAR(30),
	first_name VARCHAR(30),
	last_name VARCHAR(30),
	national_id VARCHAR(16),
	phone VARCHAR(30),
	email VARCHAR(30) UNIQUE NOT NULL,
	password VARCHAR(65) NOT NULL,
	privilege VARCHAR(30) NOT NULL,
	account_status VARCHAR(10) NOT NULL DEFAULT 'Active',
	scope_province_id VARCHAR(3),
	scope_district_id VARCHAR(3),
	scope_umurenge_id VARCHAR(3),
	scope_akagari_id VARCHAR(3),
	created_on datetime DEFAULT CURRENT_TIMESTAMP,

	PRIMARY KEY (user_id)
);




----
-- Helper commands
----

--- Import data from excel file
/*
mysqlimport --ignore-lines=1 --fields-terminated-by=, --verbose --local -u [user] -p [database] /path/to/address.csv
*/