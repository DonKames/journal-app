import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCDDDOPGukKMCqd-MWS7sNh2lvKC7JTLWM",
    authDomain: "journal-app-kurso.firebaseapp.com",
    projectId: "journal-app-kurso",
    storageBucket: "journal-app-kurso.appspot.com",
    messagingSenderId: "796501808502",
    appId: "1:796501808502:web:1ea2dbf61b27bb1aa49657"
  };

  const googleAuthProvider = new GoogleAuthProvider();
  
  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app);


  export{
      db,
      googleAuthProvider,
      
  }