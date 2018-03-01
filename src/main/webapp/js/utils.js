
$(document).ready(function() {

	$(function(){
		$("#header").load("../page/header.html"); 
		$("#footer").load("../page/footer.html"); 
	});

	$('#login').click(function() {
		var username = $("#username").val();
		var password = $("#pwd").val();
		$.ajax({
			type: "POST",
			beforeSend: function(request) {
				request.setRequestHeader("username", username);
				request.setRequestHeader("password", password);
			},
			url: "/heapunderflow/service/user/login",
			success: function(data) {
				//localStorage.token = data.token;
				alert('Got a token from the server! Token: ' + data);//+ data.token);
			},
			error: function() {
				alert("Login Failed");
			}
		});
	});
});
