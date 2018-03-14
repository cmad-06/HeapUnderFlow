
$(document).ready(function() {


//------------------------------------------------------------------------------------------

	$('#loginform').validate({ // initialize the plugin
		rules: {
			username2: {
				required: true,
				minlength: 3
			},
			password2: {
				required: true,
				minlength: 3
			}
		},
		submitHandler: function (form) { 
//			alert('valid login form submitted');

				var username = $("#username").val();
				var password = $("#pwd").val();
				var login_user = {"username":username, "password":password};
				$.ajax({
					type: "POST",
					contentType: "application/json; charset=utf-8",
					headers: {
				        "token": sessionStorage.token
				    },
					data: JSON.stringify(login_user),
					dataType:"text",
					url: "/heapunderflow/service/user/login",
					success: function(data) {

						var userId = JSON.parse(data).userId;
						
						window.location.href = 'userprofile.html?userId=' + userId + '&username=' + username;
						$('#loginoptions').prop('disabled', 'disabled')
					},
					error: function() {
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
