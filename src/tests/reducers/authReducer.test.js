import { authReducer } from "../../reducers/authReducer"
import { types } from "../../types/types";

describe('Pruebas en authReducer', () => {

    test('Debe retornar los datos de logueo LOGIN', () => {
        const initialState = {};

        const payload = {
            uid: 'uidTest12316513',
            displayName: 'kamerun',
        };

        const state = authReducer( initialState , {
            type: types.login,
            payload: payload
        });

        expect( state ).toEqual( {
            uid: 'uidTest12316513',
            name: 'kamerun',
        } );
    });


    test('Debe retornar un objeto vacio LOGOUT', () => {
        const state = authReducer({
            uid: 'uidTest12316513',
            name: 'kamerun',
        }, {
            type: types.logout
        });

        //console.log( resp );
        
        expect( state ).toEqual( {} );
    });

    
    test('Debe retornar el estado inicial ERROR', () => {
        const state = authReducer({
            uid: 'uidTest12316513',
            name: 'kamerun',
        }, {
            type: 'asdf'
        });

        //console.log( resp );
        
        expect( state ).toEqual( {
            uid: 'uidTest12316513',
            name: 'kamerun',
        } );
    });
});