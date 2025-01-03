<template>
  <div class="login-modal">
    <h2>Welcome!</h2>
    <button @click="loginAsGuest">Sign In as Guest</button>
    <button @click="loginWithGmail">Sign In with Gmail</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { loginWithGoogle } from "./auth/authUtils";

// Emits an event to the parent component
const emit = defineEmits(["login-success"]);

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
</script>

<style scoped>
.login-modal {
  /* Add your styles here */
}
</style>

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
