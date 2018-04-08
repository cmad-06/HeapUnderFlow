import {ACTION_TYPES} from "../actions/blogactions.js";

export function blogReducer(state={blogs:[]}, action){
    switch(action.type){
        case ACTION_TYPES.ADDED_BLOG:
            return {
                blog:action.blog
            };
        case ACTION_TYPES.FETCHED_BLOGS:
            return {
                blogs:action.blogs
            }
        case ACTION_TYPES.FETCHED_BLOG_BY_ID:
            return {
                blog:action.blog
            }
        case ACTION_TYPES.UPDATED_BLOG:
            console.log("BLOG UPDATED")
            return {
                blog:action.blog
            };
        default:
            return {
                blogs: []
            };
    }
};