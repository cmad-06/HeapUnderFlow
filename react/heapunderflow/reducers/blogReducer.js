import {ACTION_TYPES} from "../actions/blogactions.js";

export function blogReducer(state={blogs:[]}, action){
    switch(action.type){
        case ACTION_TYPES.ADDED_BLOG:
            return {
                
            };
        case ACTION_TYPES.FETCHED_BLOGS:
            console.log("IN blog Reducer")
            console.log(action.blogs)
            return {
                blogs:action.blogs
            }
        
        default:
            return {
                blogs: []
            };
    }
};