// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpHce2sXbD-EBZ1zo_tgUwZGd_ZraagjU",
  authDomain: "parallel-deeff.firebaseapp.com",
  projectId: "parallel-deeff",
  storageBucket: "parallel-deeff.firebasestorage.app",
  messagingSenderId: "371736809457",
  appId: "1:371736809457:web:871dc04cf84b3602a3be50",
  measurementId: "G-DTB3ZLSLNV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);