<template>
  <div>
    <h2>{{ selectedList?.name }}</h2>
    <ul>
      <li v-for="item in selectedList?.items" :key="item.name">
        <a :href="item.url" target="_blank">{{ item.name }}</a>
      </li>
    </ul>
    <div v-if="selectedList">
      <input v-model="newItemName" placeholder="Item Name" />
      <input v-model="newItemUrl" placeholder="Item URL" />
      <button @click="addItem">Add Item</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Define props to accept the selected list from the parent component
const props = defineProps(["selectedList"]);

// Define emits to emit events back to the parent component
const emit = defineEmits(["addItem"]);

// State to hold new item input values
const newItemName = ref("");
const newItemUrl = ref("");

// Function to add a new item to the selected list
const addItem = () => {
  if (newItemName.value && newItemUrl.value) {
    const newItem = { name: newItemName.value, url: newItemUrl.value };
    emit("addItem", props.selectedList.id, newItem); // Emit addItem event
    newItemName.value = "";
    newItemUrl.value = "";
  }
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding: 5px 0;
}

a {
  text-decoration: none;
  color: #007bff;
}

a:hover {
  text-decoration: underline;
}
</style>
