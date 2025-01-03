<!-- AddLinkModal.vue -->
<template>
  <div class="modal">
    <div class="modal-content">
      <h3>{{ modalTitle }}</h3>
      <input type="text" v-model="name" placeholder="Enter the name" />
      <input type="url" v-model="link" placeholder="Enter the link URL" />
      <button :disabled="!isValid" @click="submitForm">Save</button>
      <button @click="$emit('close')">Cancel</button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  modalTitle: String,
  initialName: String,
  initialLink: String,
});

const emit = defineEmits(["submit", "close"]);
const name = ref(props.initialName || "");
const link = ref(props.initialLink || "");
const isValid = ref(false);

watch([name, link], () => {
  isValid.value = name.value && link.value;
});

const submitForm = () => {
  if (isValid.value) {
    emit("submit", { name: name.value, link: link.value });
  }
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
  background: #333;
  color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
}
input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  background: #444;
  color: #fff;
  border: 1px solid #555;
}
button {
  padding: 10px;
  margin: 10px 0;
  cursor: pointer;
}
button:disabled {
  background: grey;
  cursor: not-allowed;
}
</style>
