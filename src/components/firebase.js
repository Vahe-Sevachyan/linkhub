import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: "AIzaSyA6kB4ik-fk-vIHxSwcHOe6qvIrpz5NcjM",
  authDomain: "linkhub-fef21.firebaseapp.com",
  projectId: "linkhub-fef21",
  storageBucket: "linkhub-fef21.firebasestorage.app",
  messagingSenderId: "43170559641",
  appId: "1:43170559641:web:ab6c9d111deb856a77aa08",
  measurementId: "G-DMTCNGMF0V",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };
// Export Firebase Authentication and Google Provider
// export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    return user; // Return the authenticated user object
  } catch (error) {
    console.error("Error during Google sign-in:", error);
    throw error;
  }
};
export const db = getFirestore(app);

export const saveUserDataToFirestore = async (userId, data) => {
  try {
    await setDoc(doc(db, "users", userId), { data });
  } catch (error) {
    console.error("Error saving user data to Firestore:", error);
  }
};

export const getUserDataFromFirestore = async (userId) => {
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error fetching user data from Firestore:", error);
  }
};
