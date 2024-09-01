<template>
  <div class="modal">
    <div class="modal-content">
      <span class="close-button" @click="closeModal">&times;</span>
      <h3>{{ modalTitle }}</h3>
      <div v-if="isAddItemModal">
        <input type="text" v-model="itemName" placeholder="Enter item name" />
        <input type="text" v-model="itemUrl" placeholder="Enter item URL" />
      </div>
      <div v-else-if="showInput">
        <input
          type="text"
          v-model="inputValue"
          :placeholder="inputPlaceholder"
        />
      </div>
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
  "isAddItemModal",
]);

const emit = defineEmits(["close", "submit"]);

const inputValue = ref("");
const itemName = ref("");
const itemUrl = ref("");

const closeModal = () => {
  emit("close");
};

const submit = () => {
  if (isAddItemModal) {
    if (!itemName.value.trim() || !itemUrl.value.trim()) {
      alert("Both name and URL are required.");
      return;
    }
    emit("submit", { name: itemName.value, url: itemUrl.value });
  } else if (showInput) {
    if (!inputValue.value.trim()) {
      alert("Input cannot be empty.");
      return;
    }
    emit("submit", inputValue.value);
  } else if (isDeleteConfirm) {
    emit("submit");
  }
  closeModal();
};
</script>
