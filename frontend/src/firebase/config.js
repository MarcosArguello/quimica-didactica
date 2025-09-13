// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkuuti91Wt00hOzyecsvddanNthcybEuM",
  authDomain: "quimica-didactica.firebaseapp.com",
  projectId: "quimica-didactica",
  storageBucket: "quimica-didactica.firebasestorage.app",
  messagingSenderId: "234503296540",
  appId: "1:234503296540:web:8486986acc43c20afcb1d9"
};

// Inicializa la app
const app = initializeApp(firebaseConfig);

// Inicializa autenticación
const auth = getAuth(app);

// Exportamos lo necesario
export { auth };