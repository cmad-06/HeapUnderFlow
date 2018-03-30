
export const ACTION_TYPES = {
    ADDED_USER: 'added_user',
    LOGGED_IN: 'logged_in'
 }

let baseurl = "http://localhost:8080/heapunderflow/service/"

export function addUser(userDetails) {
    console.log("User details" + userDetails )
    return {
        type: ACTION_TYPES.ADDED_USER,
        userDetails: userDetails
    };
}

export function loggedinUser(userDetails) {
    console.log("loggedinUser details" + userDetails )
    return {
        type: ACTION_TYPES.LOGGED_IN,
        userDetails: userDetails
    };
}

export function addUsertoServer(user){
    console.log("addUsertoServer")
    let userdata = JSON.stringify({
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        password: user.password
      })
      console.log("Userdata " + userdata)
    return (dispatch) => {
        fetch(baseurl + "user/signup", {
              method: 'post',
              headers: {
                  'Content-Type':'application/json',
                  "Accept":'application/json',
              },
              body: JSON.stringify({
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                email: user.email,
                password: user.password
              })
          }).then((response) => response.text())
            .then(text=>{
                console.log("Signup Data : " + text );
                dispatch(addUser(text))
            })
      }
    }

    export function loginUser(user){
        console.log("loginUser")
        let userdata = JSON.stringify({
            username: user.username,
            password: user.password
          })
          console.log("Userdata " + userdata)
        return (dispatch) => {
            fetch(baseurl + "user/login", {
                  method: 'post',
                  headers: {
                      'Content-Type':'application/json',
                      "Accept":'application/json',
                  },
                  body: JSON.stringify({
                    username: user.username,
                    password: user.password
                  })
              }).then((response) => response.text())
              .then(text => {
                  console.log(text)
                  dispatch(loggedinUser(text))
              })
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
                console.log("Response received"+ JSON.stringify(response));
                  return dispatch(addUser(user));
              });
          }
    }