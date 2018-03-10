
$(document).ready(function() {

	
	var userData = null;
	$.urlParam = function(name){
	    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	    if (results==null){
	       return null;
	    }
	    else{
	       return decodeURI(results[1]) || 0;
	    }
	}
	
	var userId = ($.urlParam('userId')); 
	
	$.ajax({
		type: "GET",
		contentType: "application/json; charset=utf-8",
//		async: false,
		headers: {
	        "token": sessionStorage.token
	    },
		url: "/heapunderflow/service/user/" + userId,
		success: function(data) {
			alert('Got User Data ' + JSON.stringify(data));
			userData = data;
			console.log(data.password)
			document.getElementById("loggedinuser").innerHTML = "Welcome " + userData["firstName"] + "!";

		},
		error: function() {
			alert("Change Password Failed");
		}
	});		
	
	$("#loggedinuser").click(function(){
	    alert("username is clicked, navigating to update profile");
	    window.location.href = 'profileupdate.html?userId=' + userId;
	});

	
//------------------------------------------------------------------------------------------
	

});
