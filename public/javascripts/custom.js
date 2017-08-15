/* move citizen */
function moveCitizenClicked(){
	console.log('Clicked');
} 

/* Pull all districts */
function pullDistricts(){
	var select = document.getElementById("selectProvince");
	var province_id = select.options[select.selectedIndex].value;

	// Call the api with ajax
	callAjax("GET", "http://localhost:3000/api/districts/"+province_id, function(results){
		
		var results = JSON.parse(results);
		
		// Set districts options
		var optionsAsString = "";
		for(var i = 0; i < results.data.length; i++) {
		    optionsAsString += "<option value='" + results.data[i].district_id + "'>" + results.data[i].district_name + "</option>";
		}

		$( "select[name='district']" ).append( optionsAsString );
	});
}

/* Pull all imirenge */
function pullImirenge(){
	var select = document.getElementById("selectDistrict");
	var district_id = select.options[select.selectedIndex].value;

	// Call the api with ajax
	callAjax("GET", "http://localhost:3000/api/umurenge/"+district_id, function(results){
		
		var results = JSON.parse(results);

		// Set districts options
		var optionsAsString = "";

		for(var i = 0; i < results.data.length; i++) {
		    optionsAsString += "<option value='" + results.data[i].umurenge_id + "'>" + results.data[i].umurenge_name + "</option>";
		}

		$( "select[name='umurenge']" ).append( optionsAsString );
	});
}

/* Pull all utugari*/
function pullUtugari(){
	var select = document.getElementById("selectUmurenge");
	var umurenge_id = select.options[select.selectedIndex].value;

	// Call the api with ajax
	callAjax("GET", "http://localhost:3000/api/akagari/"+umurenge_id, function(results){
		
		var results = JSON.parse(results);

		// Set districts options
		var optionsAsString = "";
		for(var i = 0; i < results.data.length; i++) {
		    optionsAsString += "<option value='" + results.data[i].akagari_id + "'>" + results.data[i].akagari_name + "</option>";
		}
		console.log(optionsAsString);
		$( "select[name='akagari']" ).append( optionsAsString );
	});
}


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