import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "./firebase"; // Adjust path to your Firebase config

// Save user data to Firestore
export const saveUserDataToFirestore = async (uid, data) => {
  try {
    const userDocRef = doc(db, "users", uid);
    await setDoc(userDocRef, data, { merge: true });
    console.log("User data saved to Firestore:", data);
  } catch (error) {
    console.error("Error saving user data to Firestore:", error);
  }
};

// Get user data from Firestore
export const getUserDataFromFirestore = async (uid) => {
  try {
    const userDocRef = doc(db, "users", uid);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      console.log("No such user document!");
      return null;
    }
  } catch (error) {
    console.error("Error retrieving user data from Firestore:", error);
    return null;
  }
};
