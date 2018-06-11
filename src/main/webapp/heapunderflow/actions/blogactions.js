import axios from 'axios'

export const ACTION_TYPES = {
    ADDED_BLOG: 'added_blog',
    UPDATED_BLOG: 'updated_blog',
    REMOVED_BLOG: 'removed_blog',
    FETCHED_BLOGS: 'fetched_blogs',
    FETCHED_BLOG_BY_ID: 'fetched_blog_by_id',
    DELETED_BLOG: 'deleted_blog',
}

//let baseurl = "http://heapunderflow-lb-640583785.us-west-2.elb.amazonaws.com:8080/service/"
let baseurl = "http://localhost:8080/service/"

export function addBlog(blogDetails) {
    return {
        type: ACTION_TYPES.ADDED_BLOG,
        blogDetails: blogDetails
    };
}

export function fetchBlogs(blogs) {
    return {
        
        type: ACTION_TYPES.FETCHED_BLOGS,
        blogs: blogs,
    };
}

export function fetchBlogById(blog) {
    return {
        type: ACTION_TYPES.FETCHED_BLOG_BY_ID,
        blog: blog,
    };
}



export function fetchBlogsFromServer() {
    return (dispatch) => {
        fetch(baseurl + "blog")
        .then((response) => {
                return response.json();
        }).then((blogs) => dispatch(fetchBlogs(blogs)));
    };
}

export function fetchBlogsFromServerForPage(page, callback) {
    const currentStart = 15 * (page - 1);
    console.log("Fetching blogs for URL: " + baseurl + "blog/page?limit=15&start=" + currentStart);

    const request = axios.get(baseurl + "blog/page?limit=15&start=" + currentStart ).then(data=>{
        console.log("Blog Data : " + JSON.stringify(data))
        callback(data);
    })
    return {
        type: ACTION_TYPES.UPDATED_BLOG,
        blog: request.data,
    };
	
}


export function searchBlogsByKey(key){
    console.log(baseurl + "blog/search?q="+key)

    return (dispatch) => {
        fetch(baseurl + "blog/search?q="+key)
        .then((response) => {
                return response.json();
        }).then((blogs) => dispatch(fetchBlogs(blogs)));
    };
}

export function fetchBlogByIdFromServer(blogId) {
    return (dispatch) => {
        fetch(baseurl + "blog/" + blogId)
        .then((response) => {
                return response.json();
        }).then((blog) => dispatch(fetchBlogById(blog)));
    };
}

export function updateBlogById(blog, callback){
    const request = axios.put(baseurl + "blog/" + blog.blogId , blog).then(data=>{
        console.log("Blog Data : " + JSON.stringify(data))
        callback(data);
    })
    return {
        type: ACTION_TYPES.UPDATED_BLOG,
        blog: request.data,
    };
}

    /*
    return (dispatch) => {
        fetch(baseurl + "blog/" + blog.blogId, {
                method: 'put',
                headers: {
                    'Content-Type':'application/json',
                    "Accept":'application/json',
                },
                body: JSON.stringify(blog)
            }).then((response) => response.text())
            .then(text=>{
                dispatch(updatedBlog(text))
            })
        }*/



