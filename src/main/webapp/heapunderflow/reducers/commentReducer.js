import {ACTION_TYPES} from "../actions/commentactions.js";

export function commentReducer(state={comments:[]}, action){
    switch(action.type){
        case ACTION_TYPES.ADDED_COMMENT:
            return {
                comments:action.comments
            };
        case ACTION_TYPES.FETCHED_COMMENTS_BY_BLOGID:
            return {
                comments:action.comments
            }
        default:
            return {
                comments: []
            };
    }
}   