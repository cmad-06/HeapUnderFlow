
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
				$.ajax({
					type: "POST",
					contentType: "application/json; charset=utf-8",
//					async: false,
					headers: {
				        "token": sessionStorage.token
				    },
					data: JSON.stringify(login_user),
					dataType:"text",
					url: "/heapunderflow/service/user/login",
					success: function(data) {
						window.location.href = 'signup.html';
					},
					error: function() {
						alert("login Failed");
					}
				});		
		}
	});
	
	
	$('#loginform input').on('keyup blur', function () {
        if ($('#loginform').valid()) {
            $('button.btn').prop('disabled', false);
        } else {
            $('button.btn').prop('disabled', 'disabled');
        }
    });
	

//------------------------------------------------------------------------------------------
	

});
