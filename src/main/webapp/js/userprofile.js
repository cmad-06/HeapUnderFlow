
$(document).ready(function() {


	var currentUser = null;
	
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
	var img = '<img src="../assets/images/avatars/' + userId + '.jpg" alt=""/>';

	$.ajax({
		type: "GET",
		contentType: "application/json; charset=utf-8",
		headers: {
			"token": sessionStorage.token
		},
		url: "/heapunderflow/service/user/" + userId + "/blog",
		success: function(data) {
			//alert('Got User Data ' + JSON.stringify(data));
		//	currentUser = data[0].blogAuthor;
			if(data.length > 0){
				alert("plotting data");
				currentUser = data[0].blogAuthor;
				document.getElementById("loggedinuser").innerHTML = "Welcome <b>" + currentUser  + "</b>!";
				plotData(data);
			}
			else{
				alert("0 records");
				document.getElementById("records_table").innerHTML = "No data available";
			}

		},
		error: function() {
			alert("Error in loading user profile");
		}
	});		

	$("#loggedinuser").click(function(){
		//alert("username is clicked, navigating to update profile");
		window.location.href = 'profileupdate.html?userId=' + userId;
	});

//	------------------------------------------------------------------------------------------

	function plotData(response){

		$.each((response), function(i, item) {
			
			var tr = '<tr>';
		    tr += '<td onclick=launchBlog('+ item.blogId +')>' + item.blogTitle + '</td>';
		    tr += '<td>' + item.blogLikes + '</td>';
		    tr += '<td><button onclick="editBlog('+ item.blogId + ')" class="btn btn-primary">Edit</button></td>';
		    tr += '<td><button onclick="deleteBlog('+ item.blogId + ')" class="btn btn-warning">Delete</button></td>';
		    tr += '</tr>';
		    
		    $('#records_table').append(tr);
		});
	}
	
//	--------------------------------------------------------------------------

	$("#addBlogBtn").click(function(){
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
//			alert('valid add blog form submitted');

			var blogtitle = $("#blogtitle").val();
			var blogtext = $("#blogtext").val();
			var dt = new Date();
			var creationtime = dt.toISOString();
			
			var blog = {"blogTitle":blogtitle, "blogText":blogtext, "blogCreation":creationtime, "blogAuthor":currentUser};
//			alert(JSON.stringify(blog));

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
	
	$.dataHasChanged = function (initialvalue, changedvalue){
		if ( initialvalue === changedvalue){
			console.log("return false")
			return false;
		}
		console.log("return true")
		return true;
	}	
	
	$('#profileupdateform').validate({ // initialize the plugin
		submitHandler: function (form) { 
			alert("Profile Update Form Submitted");
			var firstname = $("#changefirstname").val();
			var lastname = $("#changelastname").val();
			var email = $("#changeemail").val();
			var password = $("#changepassword").val();
			var confirmpassword = $("#confirmpassword").val();
			console.log("firstname : " + firstname + " \nlastname :" + lastname);
			
			var updateServer=false;
			
			if (firstname != null && $.dataHasChanged(currentUser.firstName, firstname) ){
				currentUser.firstName = firstname;
				updateServer = true;
			}
			
			if (lastname != null && $.dataHasChanged(currentUser.lastName, lastname) ){
				currentUser.lastName = lastname;
				updateServer = true;
			}
			if (email != null && $.dataHasChanged(currentUser.email, email) ){
				currentUser.email = email;
				updateServer = true;
			}
			if (password != null && (password === confirmpassword)){
				currentUser.password = password;
				updateServer = true;
			}
			
			console.log("currentUser.firstname : " + currentUser.firstname + " " + "currentUser.lastname: " + currentUser.lastname )
			if ( updateServer == true){
				alert('Updating profile ' + JSON.stringify(currentUser));
				$.ajax({
					type: "PUT",
					contentType: "application/json; charset=utf-8",
	//				async: false,
					headers: {
				        "token": sessionStorage.token
				    },
				    data: JSON.stringify(currentUser),
					dataType:"text",
					url: "/heapunderflow/service/user/" + currentUser.userId,
					success: function(data) {
						alert('Profile has been updated');
						window.location.href = 'userprofile.html?userId=' + currentUser.userId;
					},
					error: function() {
						alert("Profile Update Failed");
					}
				});	
			}
		}
	})
	
	
	//----------------------------------------------------------------------------------------------------------------------------------
	
	var widget = $('.tabs-basic');

    var tabs = widget.find('ul a'),
        content = widget.find('.tabs-content-placeholder > div');

    tabs.on('click', function (e) {

        e.preventDefault();

        // Get the data-index attribute, and show the matching content div

        var index = $(this).data('index');

        tabs.removeClass('tab-active');
        content.removeClass('tab-content-active');

        $(this).addClass('tab-active');
        content.eq(index).addClass('tab-content-active');

    });
	
});
