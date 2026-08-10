import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC8iLzEwsVolhbDDeT2Ndr1oZ7vVl0pc5E",
  authDomain: "qa-management-system-cf5ec.firebaseapp.com",
  projectId: "qa-management-system-cf5ec",
  storageBucket: "qa-management-system-cf5ec.firebasestorage.app",
  messagingSenderId: "771118713230",
  appId: "1:771118713230:web:01b4e8ac5e391c2b173cdf",
  measurementId: "G-GFHM3GVYDK",
};

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);

export default app;