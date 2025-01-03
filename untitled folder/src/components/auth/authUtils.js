import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase"; // Adjust the path to your Firebase configuration file
import { saveUserDataToFirestore } from "../firestoreUtils";

const provider = new GoogleAuthProvider();

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("Logged in user:", user);

    // Save user data to Firestore
    await saveUserDataToFirestore(user.uid, {
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    });

    return user; // Return the user object for further actions
  } catch (error) {
    console.error("Error logging in with Google:", error.message);
    throw error;
  }
};
