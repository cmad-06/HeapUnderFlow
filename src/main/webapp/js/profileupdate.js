
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

		},
		error: function() {
			alert("Change Password Failed");
		}
	});		

	$('#profileupdateform').validate({ // initialize the plugin
		submitHandler: function (form) { 
			alert("Profile Update Form Submitted");
			var firstname = $("#changefirstname").val();
			var lastname = $("#changelastname").val();
			var password = $("#changepassword").val();
			var confirmpassword = $("#confirmpassword").val();
			console.log("firstname : " + firstname + " \nlastname :" + lastname);
			
			var updateServer=false;
			
			if (firstname != null && $.dataHasChanged(userData.firstname, firstname) ){
				userData.firstName = firstname;
				updateServer = true;
			}
			
			if (lastname != null && $.dataHasChanged(userData.lastname, lastname) ){
				userData.lastName = lastname;
				updateServer = true;
			}
			if (password != null && (password === confirmpassword)){
				userData.password = password;
				updateServer = true;
			}
			
			console.log("userData.firstname : " + userData.firstname + " " + "userData.lastname: " + userData.lastname )
			if ( updateServer == true){
				alert('Updating profile ' + JSON.stringify(userData));
				$.ajax({
					type: "PUT",
					contentType: "application/json; charset=utf-8",
	//				async: false,
					headers: {
				        "token": sessionStorage.token
				    },
				    data: JSON.stringify(userData),
					dataType:"text",
					url: "/heapunderflow/service/user/" + userData.userId,
					success: function(data) {
						alert('Profile has been updated');
					},
					error: function() {
						alert("Profile Update Failed");
					}
				});	
			}
		}
	})
				
	$.dataHasChanged = function (initialvalue, changedvalue){
				if ( initialvalue === changedvalue){
					console.log("return false")
					return false;
				}
				console.log("return true")
				return true;
			}			
//------------------------------------------------------------------------------------------
/*
	$('#passwordupdateform').validate({ // initialize the plugin
		
		rules: {
			changepassword: {
				required: true,
				minlength: 5
			},
			confirmpassword: {
				required: true,
				minlength: 5
			}
		},
		submitHandler: function (form) { 
				alert(window.location);
			
				var oldpassword = $("#oldpassword").val();
				var password = $("#changepassword").val();
				var token = sessionStorage.token;
				
				var confirmpassword = $("#confirmpassword").val();
				alert(JSON.stringify(password + " " + confirmpassword));
				if (password != confirmpassword) {
	                alert("Passwords do not match.");
	                return false;
	            }
				alert('valid change password form submitted');
				var passworddetail = {"userId": userId, "oldpassword":oldpassword , "password": password, "token":token};
				alert(JSON.stringify(passworddetail));
				$.ajax({
					type: "POST",
					contentType: "application/json; charset=utf-8",
//					async: false,
					headers: {
				        "token": sessionStorage.token
				    },
					data: JSON.stringify(passworddetail),
					dataType:"text",
					url: "/heapunderflow/service/user/changepassword",
					success: function(data) {
						alert('Got a token from the server! Token: ' + data);
					//	window.location.href = 'profileupdate.html';
					//	$('#loginoptions').prop('disabled', 'disabled')
					},
					error: function() {
						alert("Change Password Failed");
					}
				});		
		}
	});
	
	
	
	
	$('#passwordupdateform input').on('keyup blur', function () {
        if ($('#passwordupdateform').valid()) {
            $('button.btn').prop('disabled', false);
        } else {
            $('button.btn').prop('disabled', 'disabled');
        }
    });
	
*/
//------------------------------------------------------------------------------------------
	

});
