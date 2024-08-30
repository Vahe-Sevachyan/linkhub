<template>
  <div>
    <button @click="createNewList">Create New List</button>
    <ul>
      <li v-for="list in lists" :key="list.id" @click="selectList(list)">
        {{ list.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { defineProps, ref } from "vue";

// Define props to accept the lists from the parent component
const props = defineProps(["lists"]);

// Define emits to emit events back to the parent component
const emit = defineEmits(["selectList", "update:lists"]);

// Function to create a new list and emit events
const createNewList = () => {
  const newList = {
    id: Date.now(),
    name: `List ${props.lists.length + 1}`,
    items: [],
  };
  emit("update:lists", [...props.lists, newList]); // Emit updated list
  emit("selectList", newList); // Emit selected list
};

// Function to select a list and emit an event
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
