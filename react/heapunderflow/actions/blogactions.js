export const ACTION_TYPES = {
    ADDED_BLOG: 'added_blog',
    UPDATED_BLOG: 'updated_blog',
    REMOVED_BLOG: 'removed_blog',
    FETCHED_BLOGS: 'fetched_blogs',
    FETCHED_BLOG_BY_ID: 'fetched_blog_by_id'
}

let baseurl = "http://localhost:8080/heapunderflow/service/"

export function addBlog(blogDetails) {
    console.log(`Blog details $blogDetails`)
    return {
        type: ACTION_TYPES.ADDED_BLOG,
        blogDetails: blogDetails
    };
}

export function fetchBlogs(blogs) {
    console.log("fetchBlogs");
    return {
        
        type: ACTION_TYPES.FETCHED_BLOGS,
        blogs: blogs,
    };
}

export function fetchBlogById(blog) {
    console.log("fetchBlogById");
    return {
        type: ACTION_TYPES.FETCHED_BLOG_BY_ID,
        blog: blog,
    };
}

export function fetchBlogsFromServer() {
    console.log("fetchBlogsFromServer")
    return (dispatch) => {
        fetch(baseurl + "blog")
        .then((response) => {
                return response.json();
        }).then((blogs) => dispatch(fetchBlogs(blogs)));
    };
}

export function fetchBlogByIdFromServer(blogId) {
    console.log("fetchBlogsFromServer  :" + baseurl + "blog/" + blogId);
    return (dispatch) => {
        fetch(baseurl + "blog/" + blogId)
        .then((response) => {
                return response.json();
        }).then((blog) => dispatch(fetchBlogById(blog)));
    };
}


