import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase"; // Update path to your Firebase config
import { loadGuestData } from "../utils/storage";
import { getUserDataFromFirestore } from "../firestoreUtils";
export const initializeAuthListener = (updateAppState) => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      console.log("User logged in:", user);
      const data = await getUserDataFromFirestore(user.uid);
      updateAppState(data); // Update your app state with user data
    } else {
      console.log("No user logged in, loading guest data.");
      const guestData = loadGuestData();
      updateAppState(guestData); // Update your app state with guest data
    }
  });
};
