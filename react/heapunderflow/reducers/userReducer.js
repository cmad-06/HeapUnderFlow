import {ACTION_TYPES} from "../actions/useractions.js";

export function userReducer(state={user:[]}, action){
    switch(action.type){
        case ACTION_TYPES.ADDED_USER:
            return {
                user:userDetails
            };
            case ACTION_TYPES.LOGGED_IN:
            console.log("Logged In" + JSON.stringify(action.userDetails) )
            return {
                user:action.userDetails
            };
        
        default:
            return {
                user: []
            };
    }
};

