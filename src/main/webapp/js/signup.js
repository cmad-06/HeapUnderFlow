
$(document).ready(function() {

	
	$('#signup').click(function() {
				
		var firstname = $("#firstname").val();
		var lastname = $("#lastname").val();
		var username = $("#username").val();
		var email = $("#email").val();
		var password = $("#password").val();
		
		var user1 = {"firstName":firstname, "lastName":lastname, "username":username, "email":email, "password":password};
		alert(JSON.stringify(user1));
		
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8",
			async: false,
			data: JSON.stringify(user1),
			dataType:"text",
			url: "/heapunderflow/service/user/signup",
			success: function(data) {
				//localStorage.token = data.token;
				alert('Got a token from the server! Token: ' + data.token);//+ data.token);
			},
			error: function() {
				alert("Signup Failed");
			}
		});
	});
	
});
