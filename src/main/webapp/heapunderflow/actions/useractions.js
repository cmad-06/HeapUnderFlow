import axios from 'axios'

export const ACTION_TYPES = {
    ADDED_USER: 'added_user',
    LOGGED_IN: 'logged_in',
    USER_BLOGS: "user_blogs",
    ADDED_BLOG: "added_blog",
    FETCHED_USER:"fetched_user",
    UPDATED_USER:"updated_user",
    FETCH_BLOG:'fetch_blog',
    DELETED_BLOG:'deleted_blog'
 }

//let baseurl = "http://heapunderflow-lb-640583785.us-west-2.elb.amazonaws.com:8080/service/user/"
let baseurl = "http://localhost:8080/service/user/"
  
export function fetchUser(userDetails) {
    console.log("addBLog details" )
    return {
        type: ACTION_TYPES.FETCHED_USER,
        userDetails:userDetails
    };
}

export function addUser(userDetails) {
    console.log("User details" + userDetails )
    return {
        type: ACTION_TYPES.ADDED_USER,
        userDetails: userDetails
    };
}

export function updateUser(userDetails) {
    console.log("User details" + userDetails )
    return {
        type: ACTION_TYPES.UPDATE_USER,
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

export function fetchUserBlogs(blogs) {
    console.log("fetchUserBlogs details" + blogs )
    return {
        type: ACTION_TYPES.USER_BLOGS,
        blogs: blogs
    };
}

export function addBLog() {
    console.log("addBLog details" )
    return {
        type: ACTION_TYPES.ADDED_BLOG,
    };
}

export function getUserById(userId, cb){
    
    let AUTH_TOKEN = sessionStorage.getItem("token")
    console.log("AUTH_TOKEN : " + AUTH_TOKEN)
    let response = axios.get(baseurl+userId, {
        headers: {
            'Content-Type':'application/json',
            "Authorization":AUTH_TOKEN
        },
        credentials: 'same-origin'
    }).then(data => {
        console.log("User Data : " + JSON.stringify(data))
        cb(data.data);
    })
  /*  return (dispatch) => {
        console.log("User Blogs at :" + baseurl + userId + "/blog")
        fetch(baseurl + userId )
        .then((response) => {
                return response.json();
        }).then((userDetails) => dispatch(fetchUser(userDetails)));
    };*/
}

export function addUsertoServer(user, cb){
    console.log("addUsertoServer")
    const body = JSON.stringify({
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        password: user.password
      })

      axios.post(baseurl + "signup", body, {
        headers: {
            'Content-Type':'application/json',
            "Accept":'application/json',
        },
    }).then(function(response){
      sessionStorage.setItem("isLoggedIn" , "true");
        console.log("User Logged In + " + JSON.stringify(response.data))
      cb(response.data);
    });

    return {
      type: ACTION_TYPES.ADDED_USER,
  };
}
   

export function updateUsertoServer(user,cb){
    console.log("updateUsertoServer")
   let  data = JSON.stringify(user);
    let token = sessionStorage.getItem("token")
    return (dispatch) => {
        console.log(" Updating User at : " + baseurl + user.userId)
        fetch(baseurl + user.userId, {
                method: 'put',
                headers: {
                    'Content-Type':'application/json',
                    "Accept":'application/json',
                    "Authorization":token
                },
                credentials: 'same-origin',
                body: JSON.stringify(user)
            }).then((response) => response.text())
            .then(text=>{
                dispatch(addUser(text))
            })
        }
    }

    export function loginUser(user, cb){
        console.log("loginUser" + user)
        const body = JSON.stringify({
            username: user.username,
            password: user.password
          })
        
            axios.post(baseurl + "login", body, {
                  headers: {
                      'Content-Type':'application/json',
                      "Accept":'application/json',
                  },
              }).then(function(response){
                sessionStorage.setItem("isLoggedIn" , "true");
                  console.log("User Logged In + " + JSON.stringify(response.data))
                cb(response.data);              
              }).catch(error => {
            	  cb(error);
            	  console.log("error in logging in.");
              });
    
              return {
                type: ACTION_TYPES.LOGGED_IN,
            };
          }
    
    
export function fetchUserBlogsFromServer(userId) {
    console.log("fetchUserBlogsFromServer")
    let token = sessionStorage.getItem("token")
    return (dispatch) => {
        console.log("User Blogs at :" + baseurl + userId + "/blog")
        fetch(baseurl + userId + "/blog", {
            headers: {
                'Content-Type':'application/json',
                "Accept":'application/json',
                "Authorization":token
            },
            credentials: 'same-origin'
        })
        .then((response) => {
            console.log("Success in fetchUserBlogsFromServer " + response);
                return response.json();
        }).then((blogs) => dispatch(fetchUserBlogs(blogs))).catch(err=>{
            console.log("ERROR in fetchUserBlogsFromServer " + err);
        })
    };
}

export function fetchBlogById(blogId) {
    console.log("fetchUserBlogsFromServer")
    let token = sessionStorage.getItem("token")
    return (dispatch) => {
        console.log("User Blogs at :" + baseurl + "/blog/"+blogId)
        fetch(baseurl + "/blog/" + blogId)
        .then((response) => {
                return response.json();
        }).then((blog) => dispatch(fetchUserBlog(blog)));
    };
}


export function addBlogtoServer(blog, cb){
    console.log("addBlogtoServer" + blog)
    let token = sessionStorage.getItem("token")
    const blogdata = JSON.stringify({
        blogTitle: blog.blogTitle,
        blogAuthor: blog.blogAuthor,
        blogText: blog.blogText,
        blogCreation: blog.blogCreation
      });
    
        axios.post(baseurl + blog.userId + "/blog", blogdata, {
              headers: {
                  'Content-Type':'application/json',
                  "Authorization":token
              },
              credentials: 'same-origin'
          }).then(function(response){
              console.log("Blog Posted")
            cb();              
          });

          return {
            type: ACTION_TYPES.ADDED_BLOG,
        };
      }

export function deleteUserBlogById(userId, blogId, callback){
    let token = sessionStorage.getItem("token")
    const request = axios.delete(baseurl + userId + "/blog/" + blogId,  {
        headers: {
            'Content-Type':'application/json',
            "Authorization":token
        },
        credentials: 'same-origin'
    } ).then(()=>{
        console.log("Blog Deleted ");
        callback();
    })
    return {
        type: ACTION_TYPES.DELETED_BLOG,
    };
}

    /*
    $.ajax({
		type: "GET",
		contentType: "application/json; charset=utf-8",
		async: false,
		dataType:"text",
		url: "/service/blog",
		success: function(response) {
			plotData(response);
		},
		error: function() {
//			alert("Signup Failed");
		}
	});
    */

    