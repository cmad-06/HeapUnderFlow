import {ACTION_TYPES} from "../actions/useractions.js";

export function userReducer(state={users:[]}, action){
    switch(action.type){
        case ACTION_TYPES.ADDED_USER:
            return {
                
            };
        
        default:
            return {
                users: []
            };
    }
};