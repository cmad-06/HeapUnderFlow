$(document).ready(function() {

//--------------------------------------------------------------------------

	$(function(){
		$("#header").load("./page/header.html"); 
		$("#footer").load("./page/footer.html"); 
	});
	
//--------------------------------------------------------------------------
		
	var img = '<img src="assets/images/avatars/' + 4 + '.jpg" alt=""/>';
	$.ajax({
		type: "GET",
		contentType: "application/json; charset=utf-8",
		async: false,
		dataType:"text",
		url: "/heapunderflow/service/user",
		success: function(response) {
			plotData(response);
		},
		error: function() {
			alert("Signup Failed");
		}
	});
	
//--------------------------------------------------------------------------
	
	function plotData(response){
		
		$.each($.parseJSON(response), function(i, item) {
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
