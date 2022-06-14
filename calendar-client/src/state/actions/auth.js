import Swal from "sweetalert2";

import { fetchLogIn } from "../../services/auth";
import { types } from "../types/types";

export const startLogin = ( formValues, setTitle, navigate ) => {
    return async ( dispatch ) => {
        try {

            const res = await fetchLogIn( formValues );
    
            setTitle('Log In');
    
            if ( res.ok ) {
                dispatch( login( res.uid, res.token, res.name, res.lastname ) );
                navigate('/calendar');
            } else {
                return Swal.fire('Error', res.msg, 'error');
            } 
            
        } catch (error) {
            console.log(error);
            return Swal.fire('Error', error, 'error');
        }
    }
}

const login = ( uid, token, name, lastname ) => ({
    type: types.auth.login,
    payload: {
        uid, 
        token, 
        name, 
        lastname
    }
});

export const logout = () => ({
    type: types.auth.logout
})