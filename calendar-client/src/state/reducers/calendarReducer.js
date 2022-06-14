//import moment from "moment";
import { types } from "../types/types";

const initialState = {
    events: [],
    activeEvent: null
}

export const calendarReducer = ( state= initialState, action ) => {
  
    switch ( action.type ) {
        case types.event.eventSetActive:
            return {
                ...state,
                activeEvent: action.payload
            }
    
        case types.event.eventAddNew:
            return {
                ...state,
                events: [
                    ...state.events,
                    action.payload
                ]
            }

        case types.event.eventsSaved:
            return {
                ...state,
                events: [ ...action.payload ]
            }

        case types.event.eventDesactive:
            return {
                ...state,
                activeEvent: null
            }

        case types.event.eventUpdate:
            return {
                ...state,
                events: state.events.map(
                    e => ( e.id === action.payload.id ) ? action.payload : e
                )
            }

        case types.event.eventDelete:
            return {
                ...state,
                events: state.events.filter(
                    e => ( e.id !== state.activeEvent.id )
                ),
                activeEvent: null
            }
        
        case types.event.eventsCleaning:
            return {
                ...state,
                events: []
            }

        default:
            return state;
    }

}
