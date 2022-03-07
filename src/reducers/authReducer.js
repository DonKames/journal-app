/*
    {
        uid: 'fasd6f54asdf261a6s5d1fa',
        name: 'KaMEs'
    }
 */

import { types } from "../types/types";

// const initialState = {
//     uid: 12312313,
//     name: 'KaMEs',
//     dir: {
//         d:12
//     }
// }

export const authReducer = ( state = {} , action) => {
    switch (action.type) {
        case types.login:
            return {
                uid: action.payload.uid,
                name: action.payload.displayName
            };
        
        case types.logout:
            return { };

        default:
            return state;
    }
}
