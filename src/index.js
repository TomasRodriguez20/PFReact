import {getFirestore,doc, getDoc} from 'firebase/firestore'
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7ZjGsmrYMkEGwLE8qbwEsydT6ToPOH4U",
  authDomain: "pfreact-945a6.firebaseapp.com",
  projectId: "pfreact-945a6",
  storageBucket: "pfreact-945a6.appspot.com",
  messagingSenderId: "138915016643",
  appId: "1:138915016643:web:1e61d6e2a1ccb86416d776"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)

export async function getSingleProduct(id) {
    const documentRef =  doc(db, 'products', id);
    try {
        const snapshot = await getDoc(documentRef);
        return snapshot.data();
    } catch (error) {
        console.error('error al obtener el documento: ', error)
    }
}