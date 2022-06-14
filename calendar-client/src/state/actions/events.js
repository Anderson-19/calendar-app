import Swal from "sweetalert2";
import { prepareEvents } from "../../helpers/prepareEvents";

import { createEvent, deleteEvent, getEvents, updateEvent } from "../../services/events";
import { types } from "../types/types";

export const startEventAddNew = ( event ) => {
    return async ( dispatch, getState ) => {

        const { uid, name, token } = getState().auth;
        const data = { ...event, user: uid}

        try {

            const res = await createEvent( data, token );
    
            if( res.ok ){
                event.id = res.event.id
                event.user = { 
                    _id: uid, 
                    name 
                }
                
                dispatch( eventAddNew( event ) );
    
            } 

        } catch (error) {
            console.log(error);
            return Swal.fire('Error', error, 'error');
        }
    }
}

const eventAddNew = (event) => ({
    type: types.event.eventAddNew,
    payload: event
});

export const startEventUpdate = ( formValues ) => {
    return async ( dispatch, getState ) => {

        const { token } = getState().auth;

        try {
            
            const res = await updateEvent( formValues, token );
    
            if ( res.ok ) {
                dispatch( eventUpdate( formValues ) );
            } else {
                Swal.fire('Error', res.msg, 'error');
            }

        } catch (error) {
            console.log(error);
            Swal.fire('Error', error, 'error');
        }
    }
}

const eventUpdate = (event) => ({
    type: types.event.eventUpdate,
    payload: event
});

export const eventStartLoading = () => {
    return async(dispatch) => {

        try {
            
            const res = await getEvents();
    
            if ( res.ok ) {
                const events = prepareEvents( res.events );
                dispatch( eventsSaved( events ) );
            }

        } catch (error) {
            console.log(error)
        }

    }
}

const eventsSaved = (event) => ({
    type: types.event.eventsSaved,
    payload: event
});

export const eventStartDelete = () => {
    return async ( dispatch, getState ) => {

        const { id } = getState().calendar.activeEvent;
        const { uid, token } = getState().auth;
        try {
            const res = await deleteEvent( id, uid, token )

            if ( res.ok ) {
                dispatch( eventDelete() );
            } else {
                Swal.fire('Error', res.msg, 'error');
            }


        } catch (error) {
            console.log(error)
        }

    }
}

const eventDelete = () => ({
    type: types.event.eventDelete
});

export const eventSetActive = (event) => ({
    type: types.event.eventSetActive,
    payload: event
});

export const eventDesactive = () => ({
    type: types.event.eventDesactive
});

export const eventsCleaning = () => ({
    type: types.event.eventsCleaning
});

