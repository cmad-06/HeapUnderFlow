
$(document).ready(function() {


//------------------------------------------------------------------------------------------

	$('#loginform').validate({ // initialize the plugin
		rules: {
			username2: {
				required: true,
				minlength: 5
			},
			password2: {
				required: true,
				minlength: 5
			}
		},
		submitHandler: function (form) { 
			alert('valid login form submitted');

				var username = $("#username").val();
				var password = $("#pwd").val();
				var login_user = {"username":username, "password":password};
				alert(JSON.stringify(login_user));
				$.ajax({
					type: "POST",
					contentType: "application/json; charset=utf-8",
					async: false,
					headers: {
				        "token": sessionStorage.token
				    },
					data: JSON.stringify(login_user),
					dataType:"text",
					url: "/heapunderflow/service/user/login",
					success: function(data) {
						alert("login success");
					},
					error: function() {
						alert("login Failed");
					}
				});		
		}
	});

//------------------------------------------------------------------------------------------
	

});
