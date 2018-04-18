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
    let response = axios.get(baseurl + userId).then(data => {
        console.log("User Data : " + JSON.stringify(data))
        cb(data);
    })
  /*  return (dispatch) => {
        console.log("User Blogs at :" + baseurl + userId + "/blog")
        fetch(baseurl + userId )
        .then((response) => {
                return response.json();
        }).then((userDetails) => dispatch(fetchUser(userDetails)));
    };*/
}

export function addUsertoServer(user){
    console.log("addUsertoServer")
   
    return (dispatch) => {
       
        fetch(baseurl + "signup", {
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
                sessionStorage.setItem("isLoggedIn" , true)
                dispatch(addUser(text))
            })
      }
    }

export function updateUsertoServer(user){
    console.log("updateUsertoServer")
    
    return (dispatch) => {
        console.log(" Updating User at : " + baseurl + user.userId)
        fetch(baseurl + user.userId, {
                method: 'put',
                headers: {
                    'Content-Type':'application/json',
                    "Accept":'application/json',
                },
                body: JSON.stringify(user)
            }).then((response) => response.text())
            .then(text=>{
                dispatch(addUser(text))
            })
        }
    }

    
    export function loginUser(user){
        console.log("loginUser")
        
        return (dispatch) => {
            fetch(baseurl + "login", {
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
                  sessionStorage.setItem("isLoggedIn" , true)
                  dispatch(loggedinUser(text))
              })
          }
        }

    
export function fetchUserBlogsFromServer(userId) {
    console.log("fetchUserBlogsFromServer")
    return (dispatch) => {
        console.log("User Blogs at :" + baseurl + userId + "/blog")
        fetch(baseurl + userId + "/blog")
        .then((response) => {
                return response.json();
        }).then((blogs) => dispatch(fetchUserBlogs(blogs)));
    };
}

export function fetchBlogById(blogId) {
    console.log("fetchUserBlogsFromServer")
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
    const blogdata = JSON.stringify({
        blogTitle: blog.blogTitle,
        blogAuthor: blog.blogAuthor,
        blogText: blog.blogText,
        blogCreation: blog.blogCreation
      });
    
        axios.post(baseurl + blog.userId + "/blog", blogdata, {
              headers: {
                  'Content-Type':'application/json',
              }
             
          }).then(function(response){
              console.log("Blog Posted")
            cb();              
          });

          return {
            type: ACTION_TYPES.ADDED_BLOG,
        };
      }

export function deleteUserBlogById(userId, blogId, callback){
    const request = axios.delete(baseurl + userId + "/blog/" + blogId ).then(()=>{
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

    