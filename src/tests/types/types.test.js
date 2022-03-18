import { types } from '../../types/types';

describe('Prueba types.js', () => {
    const testTypes = {
        login: '[Auth] Login',
        logout: '[Auth] Logout',
    
        uiSetError: '[UI] Set Error',
        uiRemoveError: '[UI] Remove Error',
    
        uiStartLoading: '[UI] Start Loading',
        uiFinishLoading: '[UI] Finish Loading',
    
        notesAddNew: '[Notes] Add New Note',
        notesActive: '[Notes] Set Active Note',
        notesLoad: '[Notes] Load Note',
        notesUpdated: '[Notes] Update Note',
        notesFileUrl: '[Notes] Update image Url',
        notesDelete: '[Notes] Delete note',
        notesLogoutCleaning: '[Notes] Logout Cleaning',
    }

    test('Deben existir los tipos', () => {
        expect( types ).toEqual( testTypes )
     })
 })