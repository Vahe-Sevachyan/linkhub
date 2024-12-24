import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import "./assets/tailwind.css";
createApp(App).mount("#app");

import { onAuthStateChanged } from "firebase/auth";
import { loadGuestData, getUserDataFromFirestore } from "./components/firebase";

onAuthStateChanged(auth, async (user) => {
  if (user) {
    console.log("User logged in:", user);
    const data = await getUserDataFromFirestore(user.uid);
    // Initialize app with user data
  } else {
    console.log("No user logged in, loading guest data.");
    const guestData = loadGuestData();
    // Initialize app with guest data
  }
});
