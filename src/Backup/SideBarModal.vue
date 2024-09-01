<!-- Modal.vue -->
<template>
  <div v-if="visible" class="modal">
    <div class="modal-content">
      <span class="close-button" @click="closeModal">&times;</span>
      <h3>Create New List</h3>
      <input type="text" v-model="title" placeholder="Enter list title" />
      <button @click="submitTitle">Create</button>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits, watch } from "vue";

// Emits to inform the parent component about the action
const emit = defineEmits(["close", "submit"]);

// State to control visibility and input value
const visible = ref(false);
const title = ref("");

// Watcher to handle visibility changes
watch(visible, (newVal) => {
  if (!newVal) {
    title.value = ""; // Reset title when modal is closed
  }
});

// Close modal and reset input
const closeModal = () => {
  emit("close"); // Notify parent to close the modal
};

// Submit title and close modal
const submitTitle = () => {
  if (title.value.trim()) {
    emit("submit", title.value.trim()); // Pass title to parent component
    closeModal(); // Close modal after submission
  }
};

// API to control visibility from parent
export { visible, closeModal };
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  width: 300px;
  text-align: center;
}

.close-button {
  float: right;
  cursor: pointer;
  font-size: 18px;
}

input {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
}

button {
  padding: 10px 20px;
  margin-top: 10px;
  cursor: pointer;
}
</style>
