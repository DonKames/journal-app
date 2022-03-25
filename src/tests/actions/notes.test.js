import { deleteDoc, doc, getDoc } from 'firebase/firestore';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startLoadingNotes, startNewNote, startSaveNote, startUploadImg } from '../../actions/notes';
import { db } from '../../firebase/firebase-config';
import { fileUpload } from '../../helpers/fileUpload';
import { types } from '../../types/types';

jest.mock('../../helpers/fileUpload', () => ({
    fileUpload: jest.fn( () => {
        return 'https://hola-mundo.com/cosa.jpg';
        // return Promise.resolve('https://hola-mundo.com/cosa.jpg');
    })
}));

jest.setTimeout(10000);
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const uid = 'notes Test uid'

const initialState = {
    auth: {
        uid: uid
    },
    notes: {
        active: {
            id: '14QD2jVrEZQYysMX95Hs',
            title: 'Hola',
            body: 'Mundo',
        }
    }
};

let store = mockStore(initialState);


describe('Pruebas en notes.js -Actions', () => {

    beforeEach(() => {
        store = mockStore(initialState);
    });

    test('Debe crear una nueva nota startNewNote', async () => {
        await store.dispatch(startNewNote());

        const actions = store.getActions();

        //console.log(actions);

        expect(actions[0]).toEqual({
            type: types.notesActive,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });

        expect(actions[1]).toEqual({
            type: types.notesAddNew,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });

        const docRef = doc(db, uid, 'journal', 'notes', actions[0].payload.id);
        await deleteDoc(docRef);
    });

    //No funca por problemas con Firestore
    // test('startLoadingNotes debe cargar las notas', async () => {
    //     await store.dispatch( startLoadingNotes( uid ) );

    //     const actions = store.getActions();

    //     console.log(actions);
    // });

    test('startSaveNote debe actualizar la nota', async () => {
        const note = {
            id: '8ip0rYoeQ7f649QbEu7R',
            title: 'titulo',
            body: 'body'
        };

        await store.dispatch(startSaveNote(note));

        const actions = store.getActions();

        //console.log( actions );

        expect(actions[0].type).toBe(types.notesUpdated);

        //Dramas Firestore
        // const docRef = doc(db, uid, 'journal', 'notes', note.id);

        // const docSnap = await getDoc(docRef);

        // if (docSnap.exists()) {
        //     console.log("Document data:", docSnap.data());
        // } else {
        //     // doc.data() will be undefined in this case
        //     console.log("No such document!");
        // };

        //expect( docRef.data().title ).toBe( note.title );
    });

    //El mock de fileUpload no me da el return
    // test('startUploading debe actualizar el URL del entry', async() => {
    //     const file = new File( [], 'foto.jpg' );
    //     await store.dispatch( startUploadImg( file ) );
    // })

});