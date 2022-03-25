import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase/firebase-config';


export const loadNotes = async (uid) => {
    
    const notesRef = collection(db, uid, 'journal', 'notes');
    const q = query( notesRef, orderBy( "date", 'desc' ) );
    const colle = await getDocs( q );
    const notes = [];
    //console.log(colle);
    colle.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        //console.log(doc.data().date)
        notes.push({
            id: doc.id,
            ...doc.data()
        });
    });

    //console.log(notes)
    
    return notes;
}