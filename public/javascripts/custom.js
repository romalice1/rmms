// Pull all districts
function pullDistricts(){
	var select = document.getElementById("selectProvinces");
	var province_id = select.options[select.selectedIndex].value;
	console.log("Just selected: "+province_id);

	// Call the api with ajax
	callAjax("GET", "http://localhost:3000/api/districts/"+province_id, function(results){
		//Parse to JSON
		JSON.parse(results, function(res){
			console.log("After parse: "+ res);
		});
		
		// Set districts options
		var optionsAsString = "";
		for(var i = 0; i < results.length; i++) {
		    optionsAsString += "<option value='" + results.data[i] + "'>" + results.data[i] + "</option>";
		}
		console.log(optionsAsString);
		// $( 'select[name="inptProduct"]' ).append( optionsAsString );
	});
}

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