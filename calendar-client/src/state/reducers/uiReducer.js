import { types } from "../types/types";

const initialState = {
    modalOpen: false
}

export const uiReducer = ( state = initialState, action ) => {

    switch (action.type) {
        case types.ui.uiOpenModal:
            return {
                ...state,
                modalOpen: true
            }
        
        case types.ui.uiCloseModal:
            return {
                ...state,
                modalOpen: false
            }
    
        default:
            return state;
    }

}