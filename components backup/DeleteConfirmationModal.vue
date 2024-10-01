<template>
  <div class="modal">
    <div class="modal-content">
      <h3>Confirm Deletion</h3>
      <p>
        Please type the name of the category
        <strong>{{ categoryName }}</strong> to confirm deletion:
      </p>
      <input
        type="text"
        v-model="inputName"
        placeholder="Type category name here"
      />
      <button :disabled="!isNameMatched" @click="confirmDeletion">
        Confirm Delete
      </button>
      <button @click="$emit('closeModal')">Cancel</button>
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
  background: white;
  padding: 20px;
  border-radius: 5px;
  width: 300px;
  text-align: center;
}

input {
  width: 100%;
  padding: 8px;
  margin: 10px 0;
}

button {
  padding: 8px 16px;
  margin: 5px;
}
</style>
