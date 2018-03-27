import {ACTION_TYPES} from "../actions/useractions.js";

export function userReducer(state={users:[]}, action){
    switch(action.type){
        case ACTION_TYPES.ADDED_USER:
            return {
                userDetails:userDetails
            };
            case ACTION_TYPES.LOGGED_IN:
            console.log("Logged In")
            return {
                userDetails:action.userDetails
            };
        
        default:
            return {
                users: []
            };
    }
};