/****************************************************
	THIS FILE IS CRUCIAL TO THE FUNCTIONALITY OF THE APP.
	PLEASE DON'T NEITHER REMOVE OR MODIFY IT.
*/

/* ENVIRONMENT SETTINGS */
var ENV = {
	host: "https://nameless-garden-16503.herokuapp.com"
};
/*************/

/* move citizen */
function moveCitizenClicked(){
	console.log('Clicked');
} 

/* Pull all districts */
function pullDistricts(priv){
	var select = document.getElementById("selectProvince");
	var province_id = select.options[select.selectedIndex].value;

	// Call the api with ajax
	callAjax("GET", ENV.host+"/api/districts/"+province_id, function(results){
		
		var results = JSON.parse(results);
		// Clean first according to privilege type
		if( priv === 'admin'){
			$( "select[name='district']" ).html("<option value=''>--Select--</option><option value='*'>All</option>");
		}else{
			$( "select[name='district']" ).html("<option value=''>--Select--</option>");
		}
		
		// Set districts options
		if(results.data.length === 0){
			// NO data. Clean the list
			if( priv === 'admin'){
				$( "select[name='district']" ).html("<option value=''>--Select--</option><option value='*'>All</option>");
			}else{
				$( "select[name='district']" ).html("<option value=''>--Select--</option>");
			}
		}else{
			var optionsAsString = "";
			for(var i = 0; i < results.data.length; i++) {
			    optionsAsString += "<option value='" + results.data[i].district_id + "'>" + results.data[i].district_name + "</option>";
			}

			$( "select[name='district']" ).append( optionsAsString );
		}
	});
}

/* Pull all imirenge */
function pullImirenge(priv){
	var select = document.getElementById("selectDistrict");
	var district_id = select.options[select.selectedIndex].value;

	// Call the api with ajax
	callAjax("GET", ENV.host+"/api/umurenge/"+district_id, function(results){
		
		var results = JSON.parse(results);

		// Clean first according to privilege type
		if( priv === 'admin'){
			$( "select[name='umurenge']" ).html("<option value=''>--Select--</option><option value='*'>All</option>");
		}else{
			$( "select[name='umurenge']" ).html("<option value=''>--Select--</option>");
		}

		// Set districts options
		if(results.data.length === 0){
			// NO data. Clean the list
			if( priv === 'admin'){
				$( "select[name='umurenge']" ).html("<option value=''>--Select--</option><option value='*'>All</option>");
			}else{
				$( "select[name='umurenge']" ).html("<option value=''>--Select--</option>");
			}
		}else{
			var optionsAsString = "";

			for(var i = 0; i < results.data.length; i++) {
			    optionsAsString += "<option value='" + results.data[i].umurenge_id + "'>" + results.data[i].umurenge_name + "</option>";
			}

			$( "select[name='umurenge']" ).append( optionsAsString );
		}
	});
}

/* Pull all utugari*/
function pullUtugari(priv){
	var select = document.getElementById("selectUmurenge");
	var umurenge_id = select.options[select.selectedIndex].value;

	// Call the api with ajax
	callAjax("GET", ENV.host+"/api/akagari/"+umurenge_id, function(results){
		
		var results = JSON.parse(results);

		// Clean first
		if( priv === 'admin'){
			$( "select[name='akagari']" ).html("<option value=''>--Select--</option><option value='*'>All</option>");
		}else{
			$( "select[name='akagari']" ).html("<option value=''>--Select--</option>");
		}

		if(results.data.length === 0){
			// NO data. Clean the list
			if( priv === 'admin'){
				$( "select[name='akagari']" ).html("<option value=''>--Select--</option><option value='*'>All</option>");
			}else{
				$( "select[name='akagari']" ).html("<option value=''>--Select--</option>");
			}
		}else{
			// Set districts options
			var optionsAsString = "";
			for(var i = 0; i < results.data.length; i++) {
			    optionsAsString += "<option value='" + results.data[i].akagari_id + "'>" + results.data[i].akagari_name + "</option>";
			}

			$( "select[name='akagari']" ).append( optionsAsString );
		}
	});
}

/* Pull imidugudu */
function pullImidugudu(priv){
	var select = document.getElementById("selectAkagari");
	var akagari_id = select.options[select.selectedIndex].value;

	// Call the api with ajax
	callAjax("GET", ENV.host+"/api/umudugudu/"+akagari_id, function(results){
		
		var results = JSON.parse(results);

		// Clean first
		$( "select[name='umudugudu']" ).html("<option value=''>--Select--</option>");

		if(results.data.length === 0){
			// NO data. Clean the list
			$( "select[name='umudugudu']" ).html("<option value=''>--Select--</option>");
		}else{
			// Set districts options
			var optionsAsString = "";
			for(var i = 0; i < results.data.length; i++) {
			    optionsAsString += "<option value='" + results.data[i].umudugudu_id + "'>" + results.data[i].umudugudu_name + "</option>";
			}

			$( "select[name='umudugudu']" ).append( optionsAsString );
		}
	});
}
/********************************
	CITIZEN CONTROLS
******************************/
/* View a single citizen information */
function getOneCitizen(citizen_id){
	callAjax("GET", ENV.host+"/api/citizens/"+citizen_id, function(results){
		//Change location and pass the data to the new location
		window.location.replace(ENV.host+"/show-citizen?cid="+citizen_id);
	});
}


/************************************
********** ADMINISTRATION ***********
*************************************/

/**********************************************/
/* AJAX helper function */
function callAjax(method, url, callback) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      callback(this.responseText);
    }
  };
  xhttp.open(method, url, true);
  xhttp.send();
}