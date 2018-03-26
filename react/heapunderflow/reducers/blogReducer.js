import {ACTION_TYPES} from "../actions/blogactions.js";

export function blogReducer(state={blogs:[]}, action){
    switch(action.type){
        case ACTION_TYPES.ADDED_BLOG:
            return {
                blog:action.blog
            };
        case ACTION_TYPES.FETCHED_BLOGS:
            console.log("IN blog Reducer")
            console.log(action.blogs)
            return {
                blogs:action.blogs
            }
        case ACTION_TYPES.FETCHED_BLOG_BY_ID:
            console.log("IN blog Reducer")
            console.log(action.blog)
            return {
                blog:action.blog
            }
        
        default:
            return {
                blogs: []
            };
    }
};