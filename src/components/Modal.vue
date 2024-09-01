<!-- Modal.vue -->
<!-- Modal.vue -->
<template>
  <div class="modal">
    <div class="modal-content">
      <span class="close-button" @click="closeModal">&times;</span>
      <h3>{{ modalTitle }}</h3>
      <input
        v-if="showInput"
        type="text"
        v-model="inputValue"
        :placeholder="inputPlaceholder"
      />
      <div v-if="isDeleteConfirm" class="delete-confirm">
        <p>Are you sure you want to delete {{ deleteItemName }}?</p>
      </div>
      <button @click="submit">{{ submitButtonText }}</button>
      <button v-if="showCancelButton" @click="closeModal">Cancel</button>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits, defineProps } from "vue";

const props = defineProps([
  "modalTitle",
  "showInput",
  "inputPlaceholder",
  "submitButtonText",
  "showCancelButton",
  "isDeleteConfirm",
  "deleteItemName",
]);

const emit = defineEmits(["close", "submit"]);

const inputValue = ref("");

const closeModal = () => {
  emit("close");
};

const submit = () => {
  // Adjust submission to pass inputValue as object if multiple values are needed
  if (props.showInput && inputValue.value.trim() === "") {
    alert("Input cannot be empty");
    return;
  }
  emit("submit", inputValue.value); // Pass input value to parent
  closeModal();
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7); /* Dark overlay */
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: #2c2f33; /* Dark grey */
  padding: 20px;
  border-radius: 5px;
  width: 300px;
  text-align: center;
  color: #ffffff; /* White text for contrast */
}

.close-button {
  float: right;
  cursor: pointer;
  font-size: 18px;
  color: #ffffff;
}

input {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  background: #3a3f44; /* Slightly lighter grey */
  color: #ffffff;
  border: none;
  border-radius: 3px;
}

button {
  padding: 10px 20px;
  margin-top: 10px;
  cursor: pointer;
  border: none;
  border-radius: 3px;
  background-color: #5865f2; /* Soft blue button */
  color: #ffffff;
}

button:hover {
  background-color: #4752c4; /* Slightly darker blue on hover */
}

.delete-confirm {
  color: #f04747; /* Red for delete confirmation */
}
</style>
