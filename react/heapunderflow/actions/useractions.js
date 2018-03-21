export const ACTION_TYPES = {
    ADDED_USER: 'added_user',
 
}

let baseurl = "http://localhost:8080/heapunderflow/service/"


export function addUser(userDetails) {
    return {
        type: ACTION_TYPES.ADDED_USER,
        userDetails: userDetails
    };
}

export function addUsertoServer(user){
    console.log("addUsertoServer")
    return (dispatch) => {
        fetch(baseurl + "user/signup", {
              method: 'post',
              headers: {
                  'Content-Type':'application/json',
              },
              body: JSON.stringify({
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                email: user.email,
                password: user.password
              })
          }).then(function(response){
              console.log("Response received")
              return dispatch(addUser(user));
          });
      }
    }

    /*
    $.ajax({
		type: "GET",
		contentType: "application/json; charset=utf-8",
		async: false,
		dataType:"text",
		url: "/heapunderflow/service/blog",
		success: function(response) {
			plotData(response);
		},
		error: function() {
//			alert("Signup Failed");
		}
	});
    */

    export function getTopBlogs(data){
        return (dispatch) => {
            fetch(baseurl + "/blog", {
                  method: 'get',
                  headers: {
                      'Content-Type':'application/json',
                      'Access-Control-Allow-Origin':'*'
                  }
                  
              }).then(function(response){
                  console.log("Response received")
                  return dispatch(addUser(user));
              });
          }
    }