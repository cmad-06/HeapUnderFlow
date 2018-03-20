export const ACTION_TYPES = {
    ADDED_USER: 'added_user',
 
}

let baseurl = "http://localhost:8080/heapunderflow/service/user"


export function addUser(userDetails) {
    return {
        type: ACTION_TYPES.ADDED_USER,
        userDetails: userDetails
    };
}

export function addUsertoServer(user){
    console.log("addUsertoServer")
    return (dispatch) => {
        fetch(baseurl + "/signup", {
              method: 'post',
              headers: {
                  'Content-Type':'application/json',
                  'Access-Control-Allow-Origin':'*'
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