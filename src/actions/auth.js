import { types } from "../types/types";
import { finishLoading, startLoading } from './ui';

import { googleAuthProvider } from "../firebase/firebase-config";
import {
    createUserWithEmailAndPassword,
    getAuth, signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile
} from 'firebase/auth';
import Swal from 'sweetalert2';
import { notesLogout } from "./notes";


const auth = getAuth();

export const startRegisterNameEmailPass = ( name, email, password ) => {
    return ( dispatch ) => {
        createUserWithEmailAndPassword( auth, email, password )
            .then(async ({ user }) => {
                await updateProfile( user, {
                    displayName: name
                });
                dispatch(
                    login( user.uid, user.displayName )
                );
            })
            .catch(e => {
                Swal.fire( 'Error', 'Error en el registro', 'error' );
            });
    }
};

export const startLoginEmailPassword = ( email, password ) => {
    return ( dispatch ) => {

        dispatch( startLoading() );

        signInWithEmailAndPassword( auth, email, password )
            .then(({ user }) => {
                dispatch(login( user.uid, user.displayName ));
                dispatch( finishLoading() );
            })
            .catch(e => {
                switch ( e.code ) {
                    case 'auth/user-not-found':

                    case 'auth/wrong-password':
                        Swal.fire('ERROR', 'Usuario o Contraseña Incorrecta', 'error');
                        break;

                    default:
                        Swal.fire('Error', 'Error Desconocido', 'error')
                        break;
                }
                dispatch( finishLoading() );
            });
    };
};

export const startGoogleLogin = () => {
    return ( dispatch ) => {
        signInWithPopup( auth, googleAuthProvider )
            .then(({ user }) => {
                const { displayName, uid } = user;
                dispatch(
                    login( uid, displayName )
                )
            })
    }
}

export const login = ( uid, displayName ) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }
});

export const logout = () => ({
    type: types.logout
})

export const startLogout = () => {
    return async ( dispatch ) => {
        await signOut( auth );
        dispatch( logout() );
        dispatch( notesLogout() )
    };
};






// forma un poquito mas larga
// export const login = ( uid, displayName ) => {
//     return {
//         type: types.login,
//         payload:{
//             uid,
//             displayName
//         }
//     }
// }