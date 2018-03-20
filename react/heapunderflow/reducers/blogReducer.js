import {ACTION_TYPES} from "../actions/blogactions.js";

export function blogReducer(state={blogs:[]}, action){
    switch(action.type){
        case ACTION_TYPES.ADDED_BLOG:
            return {
                
            };
        
        default:
            return {
                blogs: []
            };
    }
};