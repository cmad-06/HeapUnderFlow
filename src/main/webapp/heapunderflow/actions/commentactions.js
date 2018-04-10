import axios from 'axios'

export const ACTION_TYPES = {
    ADDED_BLOG: 'added_comment',
    FETCHED_COMMENTS_BY_BLOGID:"fetched_comments_by_blogId",
    
 }
 
 const baseurl = "http://localhost:8080/heapunderflow/service/comment"

export function addComment(comment){
    console.log("Comment : " + comment )
    console.log("baseurl : " + baseurl )
       const request = axios.post((baseurl+"/add"),comment).then(data => {
           console.log(data)
       })

    return {
        type: ACTION_TYPES.ADDED_BLOG,
        comments: request.data
    };
}

export function getCommentsByBlogId(blogId){
    console.log(`Commets URL : ${baseurl}${blogId}`)
    const request = axios.get(`${baseurl}${blogId}`)

    return {
        type: ACTION_TYPES.FETCHED_COMMENTS_BY_BLOGID,
        comments: request.data
    };
}