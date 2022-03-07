import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import { db } from "../firebase/firebase-config";
import { fileUpload } from "../helpers/fileUpload";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";

// KaMEs-journal

export const startNewNote = () => {
    return async (dispatch, getState) => {

        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        };


        const docRef = await addDoc(collection(db, uid, 'journal', 'notes'), newNote);

        console.log(docRef)

        dispatch(activeNote(docRef.id, newNote));
    };
};


export const activeNote = (id, note) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
});


export const startLoadingNotes = (uid) => {
    return async (dispatch) => {
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    };
};


export const setNotes = (notes) => ({
    type: types.notesLoad,
    payload: notes
});


export const startSaveNote = (note) => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;

        const noteToFirestore = { ...note };
        delete noteToFirestore.id;

        const noteRef = doc(db, uid, "journal", "notes", note.id);

        await updateDoc(noteRef, noteToFirestore);

        dispatch(refreshNote(note.id, noteToFirestore));

        Swal.fire('Saved', note.title, 'success');
    }
};


export const refreshNote = (id, note) => ({
    type: types.notesUpdated,
    payload: {
        id,
        note: {
            id,
            ...note
        }
    }
});


export const startUploadImg = (file) => {
    return async (dispatch, getState) => {
        const { active: activeNote } = getState().notes;

        Swal.fire({
            title: 'Cargando Imagen...',
            text: 'Por favor espere...',
            allowOutsideClick: false,
            willOpen: () => {
                Swal.showLoading();
            },
            showConfirmButton: false
        });

        const fileUrl = await fileUpload(file);

        Swal.close();

        activeNote.url = fileUrl;

        dispatch( startSaveNote( activeNote ));
    }
};


export const startDeleteImg = ( noteId ) => {
    return async ( dispatch, getState ) => {

        const { uid } = getState().auth;
        const docRef = doc( db, uid, 'journal', 'notes', noteId );
        await deleteDoc( docRef );

        dispatch( deleteNote( noteId ) );
    };
};

export const deleteNote = ( noteId ) => ({
    type: types.notesDelete,
    payload: noteId
});