
$(document).ready(function() {


	$.urlParam = function(name){
		var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
		if (results==null){
			return null;
		}
		else{
			return decodeURI(results[1]) || 0;
		}
	}
	
	var blogId = ($.urlParam('blogId')); 
//	alert("Blog id: "+blogId);
	
	$.ajax({
		type: "GET",
		contentType: "application/json; charset=utf-8",
		headers: {
			"token": sessionStorage.token
		},
		url: "/heapunderflow/service/blog/" + blogId,
		success: function(data) {
//			alert('Got User Data ' + JSON.stringify(data));
//				alert("plotting data");
				plotData(data);
			
		},
		error: function() {
//			alert("Error in loading user profile");
		}
	});		

	
//	------------------------------------------------------------------------------------------

	function plotData(response){

		document.getElementById("blogtitle").innerHTML = "<b> Title: &ensp;</b>" + response.blogTitle;
		document.getElementById("blogauthor").innerHTML = "<b> Author: &ensp;</b>" + response.blogAuthor;
		var date = new Date(response.blogCreation);
		document.getElementById("blogcreation").innerHTML = "<b> Created On: &ensp;</b>" + date;
		document.getElementById("blogtext").innerHTML = "<b> Description: &ensp;</b>" + response.blogText;
		
	}
	
//	--------------------------------------------------------------------------

});
