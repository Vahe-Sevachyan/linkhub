<template>
  <div class="login-modal" v-if="isModalVisible">
    <div class="modal-content">
      <h2>Welcome!</h2>
      <button @click="loginAsGuest">Sign In as Guest</button>
      <button @click="loginWithGmail">Sign In with Gmail</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { signInWithGoogle } from "../firebase";
import { loginWithGoogle } from "../auth/authUtils";
const isModalVisible = ref(true);
import { saveGuestData, loadGuestData } from "../utils/storage";
export default {
  name: "LoginModal",
  emits: ["login-success"],
  setup(_, { emit }) {
    const loginWithGmail = async () => {
      try {
        const user = await loginWithGoogle();
        console.log("User logged in successfully:", user);
        emit("login-success", user); // Notify parent component of login
      } catch (error) {
        console.error("Login failed:", error.message);
      }
    };

    const loginAsGuest = () => {
      const guestData = { isGuest: true };
      localStorage.setItem("appData", JSON.stringify(guestData));
      emit("login-success", guestData); // Notify parent component of guest login
    };

    return {
      loginWithGmail,
      loginAsGuest,
    };
  },
};
const continueAsGuest = () => {
  const initialGuestData = { lists: [], settings: {} };
  saveGuestData(initialGuestData);
  console.log("Saved guest data:", initialGuestData);
  isModalVisible.value = false;
};
// const loginWithGoogle = async () => {
//   try {
//     const user = await signInWithGoogle();
//     console.log("User logged in:", user);
//     isModalVisible.value = false;
//     // Save user data to Firebase or session
//   } catch (error) {
//     alert("Failed to log in with Google.");
//   }
// };
</script>

<style scoped>
/* Basic styles for modal */
.login-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}
</style>
