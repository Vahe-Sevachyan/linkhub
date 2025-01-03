<template>
  <div class="modal">
    <div class="modal-content">
      <h3 class="modal-header">Confirm Deletion</h3>
      <p>
        Please type the name of the category
        <strong class="category-name">"{{ categoryName }}"</strong> to confirm
        deletion:
      </p>
      <input
        type="text"
        v-model="inputName"
        placeholder="Type category name here"
      />
      <div class="button-container">
        <button :disabled="!isNameMatched" @click="confirmDeletion">
          Confirm Delete
        </button>
        <button @click="$emit('closeModal')">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

// Props to receive the category name
const props = defineProps({
  categoryName: String,
});

// Local state to track the input value
const inputName = ref("");

// Computed property to check if the input name matches the category name
const isNameMatched = computed(() => inputName.value === props.categoryName);

// Emit function to send the confirm event back to the parent
const emit = defineEmits(["confirmDeletion", "closeModal"]);

// Method to handle the confirm button click
const confirmDeletion = () => {
  emit("confirmDeletion");
};
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
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: #2c2f33;
  color: #ffffff;
  padding: 20px;
  border-radius: 5px;
  width: 300px;
  text-align: center;
}

input {
  width: 100%;
  padding: 7px;
  margin: 10px 0;
  border: none;
  border-radius: 5px;
  background: #3a3f44;
  color: #ffffff;
}

button {
  background: #5865f2; /* Soft blue */
  color: #ffffff;
  padding: 8px 16px;
  cursor: pointer;
  margin: 5px;
  border-radius: 4px;
}

button:disabled {
  background: grey;
  cursor: not-allowed;
}

button:hover {
  background-color: #4752c4; /* Slightly darker blue on hover */
}
</style>
