<!-- Modal.vue -->
<template>
  <div class="modal">
    <div class="modal-content">
      <h2 class="modal-title">{{ modalTitle }}</h2>
      <p class="item-name" :class="nameClass">{{ expectedName }}</p>
      <p class="subcategory-name">{{ expectedSubCategoryName }}</p>
      <input
        v-model="inputValue"
        :placeholder="inputPlaceholder"
        :class="inputClass"
      />
      <div class="button-container">
        <button @click="submit">{{ submitButtonText }}</button>
        <button v-if="showCancelButton" @click="close">
          {{ cancelButtonText || "Cancel" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
const props = defineProps({
  modalTitle: String,
  inputPlaceholder: String,
  submitButtonText: String,
  showCancelButton: Boolean,
  expectedName: String,
  expectedSubCategoryName: String,
});

const emit = defineEmits(["close", "submit"]);

// State for the input field value

const inputValue = ref("");

// Computed property to style the input field based on whether the input matches the expected name
const inputClass = computed(() => {
  if (inputValue.value === "") {
    return ""; // No special class if empty
  } else if (inputValue.value === props.expectedName) {
    return "input-red"; // Class for red text if it matches
  } else {
    return "input-gray"; // Class for gray text if it doesn't match
  }
});

// Computed property to style the displayed item name
const nameClass = computed(() => {
  return inputValue.value === props.expectedName ? "name-red" : "name-gray";
});

// Function to handle submit
const submit = () => {
  emit("submit", inputValue.value);
};

// Function to close the modal
const close = () => {
  emit("close");
};
</script>

<style scoped>
/* Styling for the input field */
/* .input-gray {
  color: gray;
} */
/* .input-red {
  color: red;
} */

/* Styling for the displayed name */
.name-gray {
  color: gray;
  /* text-decoration: line-through; */
}
.name-red {
  color: rgb(194, 26, 26);
  font-weight: bold;
}
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
  width: 450px;
  text-align: center;
  color: #ffffff; /* White text for contrast */
  /* font-family: "Josefin Sans", Courier, monospace;  */
  font-family: "Manrope", Courier, monospace;
}

.close-button {
  float: right;
  cursor: pointer;
  font-size: 18px;
  color: #ffffff;
}

input {
  width: 75%;
  padding: 10px;
  margin-top: 10px;
  background: #3a3f44; /* Slightly lighter grey */
  color: #ffffff;
  border: none;
  border-radius: 5px;
}

button {
  padding: 10px;
  margin: 15px 5px -5px 5px;
  cursor: pointer;
  border: none;
  border-radius: 3px;
  /*background-color: #5865f2;  Soft blue button */
  background: #5865f2; /* Soft blue */
  color: #ffffff;
}

button:hover {
  background-color: #4752c4; /* Slightly darker blue on hover */
}

.delete-confirm {
  color: #f04747; /* Red for delete confirmation */
}
.error-Msg {
  color: #f04747;
}
</style>
