
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
		url: "/heapunderflow/service/user/" + userId + "/blog",
		success: function(data) {
			alert('Got User Data ' + JSON.stringify(data));
			document.getElementById("loggedinuser").innerHTML = "Welcome <b>" +  data[0].blogAuthor + "</b>!";
			plotData(data);

		},
		error: function() {
			alert("Error in loading user profile");
		}
	});		

	$("#loggedinuser").click(function(){
		alert("username is clicked, navigating to update profile");
		window.location.href = 'profileupdate.html?userId=' + userId;
	});

//	------------------------------------------------------------------------------------------

	function plotData(response){

		$.each((response), function(i, item) {
			$('<tr>').append(
					$('<td>').text(item.blogTitle),
					$('<td>').text(item.blogLikes)
			).appendTo('#records_table');
		});
	}
//	--------------------------------------------------------------------------

	$("#addBlogBtn").click(function(){
		alert("add blog is clicked, navigating to add blog page");
		window.location.href = 'addblog.html?userId=' + userId;
	});


	

//	--------------------------------------------------------------------------


	
	
	$('#addblogform').validate({ // initialize the plugin
		rules: {
			blogtitle: {
				required: true,
				minlength: 10
			},
			blogtext: {
				required: true,
				minlength: 10
			}
		},
		submitHandler: function (form) { 
			alert('valid add blog form submitted');

			var blogtitle = $("#blogtitle").val();
			var blogtext = $("#blogtext").val();
			var dt = new Date();
			var creationtime = dt.toISOString();
			
			var blog = {"blogTitle":blogtitle, "blogText":blogtext, "blogCreation":creationtime, "blogAuthor":"vjcalling"};
			alert(JSON.stringify(blog));

			$.ajax({
				type: "POST",
				contentType: "application/json; charset=utf-8",
				async: false,
				data: JSON.stringify(blog),
				dataType:"text",
				url: "/heapunderflow/service/user/" + userId + "/blog",
				headers: {
					"Accept": 'application/json'
				},
				success: function(data, textStatus, request) {
					sessionStorage.token = data;
					//alert('Got a token from the server! Token:' + request.getResponseHeader('token'));
					window.location.href = 'userprofile.html?userId=' + userId;
				},
				error: function() {
					alert("Signup Failed");
				}
			});		
		}
	});
	
	
	
	
});
