// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD3HD5PVjCop4Sj1U-7y5Km7S4urKxWcrA',
  authDomain: 'dataparser001.firebaseapp.com',
  projectId: 'dataparser001',
  storageBucket: 'dataparser001.appspot.com',
  messagingSenderId: '5741637813',
  appId: '1:5741637813:web:1cc086d8790e51445f4efc',
  measurementId: 'G-6DTN7K4S8L',
};
// Initialize Firebase

const app = initializeApp(firebaseConfig);
// Export firestore database
// It will be imported into your react app whenever it is needed
export const db = getFirestore(app);
