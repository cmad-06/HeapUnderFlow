import {ACTION_TYPES} from "../actions/useractions.js";

export function userReducer(state={user:[]}, action){
    switch(action.type){
        case ACTION_TYPES.FETCHED_USER:
        case ACTION_TYPES.UPDATED_USER:
        case ACTION_TYPES.ADDED_USER:
        case ACTION_TYPES.LOGGED_IN:
        return {
            user:action.userDetails
        };
        case ACTION_TYPES.USER_BLOGS:
        //   console.log("User Blogs" + JSON.stringify(action.userDetails) )
            return {
                blogs:action.blogs
            };
        case ACTION_TYPES.ADDED_BLOG:
    //     console.log("Blog Added" + JSON.stringify(action.userDetails) )
            return {
                blogId:action.blogId
            };
        
        default:
            return {
                user: []
            };
    }
};

