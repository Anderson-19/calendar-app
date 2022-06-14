import { types } from "../types/types";

export const authReducer = ( state = {}, action ) => {

    switch ( action.type ) {
        case types.auth.login:
            return {
                uid: action.payload.uid,
                token: action.payload.token,
                name: action.payload.name,
                lastname: action.payload.lastname
            }
        
        case types.auth.logout:
            return { }
    
        default:
            return state;
    }

}