import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase-config';


export const loadNotes = async (uid) => {

    const colle = await getDocs(collection(db, uid, 'journal', 'notes'));
    const notes = [];

    colle.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        notes.push({
            id: doc.id,
            ...doc.data()
        });
    });

    
    return notes;
}