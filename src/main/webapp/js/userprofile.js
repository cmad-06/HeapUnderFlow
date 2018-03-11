
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
	var img = '<img src="../assets/images/avatars/' + 4 + '.jpg" alt=""/>';

	$.ajax({
		type: "GET",
		contentType: "application/json; charset=utf-8",
		headers: {
	        "token": sessionStorage.token
	    },
		url: "/heapunderflow/service/user/" + userId,
		success: function(data) {
			alert('Got User Data ' + JSON.stringify(data));
			userData = data;
			document.getElementById("loggedinuser").innerHTML = "Welcome " + userData["firstName"] + "!";
			plotData(data);

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

	function plotData(response){
		
		$.each($(response), function(i, item) {
		      $('<tr>').append(
		          '<td>' + img + '</td>',
		          $('<td>').text(item.username),
		          $('<td>').text(item.email),
				  $('<td>').text(item.firstName),
				  $('<td>').text(item.lastName)
		      ).appendTo('#records_table');
		  });
	}

//--------------------------------------------------------------------------


});
