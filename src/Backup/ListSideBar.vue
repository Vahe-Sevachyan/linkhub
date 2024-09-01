<!-- ListSidebar.vue -->
<template>
  <div>
    <button @click="emit('triggerModal')">Create New List</button>
    <ul>
      <li v-for="list in lists" :key="list.id" @click="selectList(list)">
        {{ list.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps(["lists"]);
const emit = defineEmits(["selectList", "triggerModal"]);

const selectList = (list) => {
  emit("selectList", list);
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  cursor: pointer;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

li:hover {
  background-color: #f0f0f0;
}
</style>
