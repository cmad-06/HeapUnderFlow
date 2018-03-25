export const ACTION_TYPES = {
    ADDED_BLOG: 'added_blog',
    UPDATED_BLOG: 'updated_blog',
    REMOVED_BLOG: 'removed_blog',
    FETCHED_BLOGS: 'fetched_blogs'
}

let baseurl = "http://localhost:8080/heapunderflow/service/"

export function fetchBlogs(blogs) {
    console.log("fetchBlogs");
    return {
        
        type: ACTION_TYPES.FETCHED_BLOGS,
        blogs: blogs,
    };
}

export function fetchBlogsFromServer() {
    console.log("fetchBlogsFromServer")
    return (dispatch) => {
        fetch("http://localhost:8080/heapunderflow/service/" + "blog")
        .then((response) => {
                return response.json();
        }).then((blogs) => dispatch(fetchBlogs(blogs)));
    };
}

