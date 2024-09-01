<!-- App.vue -->
<template>
  <div>
    <ListSidebar
      :lists="lists"
      @triggerModal="showModal"
      @selectList="handleSelectList"
    />
    <ListItemDetail :selectedList="selectedList" @addItem="handleAddItem" />
    <Modal v-if="isModalVisible" @close="hideModal" @submit="addNewList" />
  </div>
</template>

<script setup>
import { ref } from "vue";
// import ListSidebar from "./ListSidebar.vue";
import ListItemDetail from "./ListItemDetail.vue";
import Modal from "./Modal.vue";

const lists = ref([
  {
    id: 1,
    name: "List 1",
    subcategories: [
      {
        id: 101,
        name: "Subcategory 1",
        items: [{ id: 1001, name: "Google", url: "https://www.google.com" }],
      },
      // Other subcategories...
    ],
  },
  // Other lists...
]);

const selectedList = ref(null);
const isModalVisible = ref(false); // State to control modal visibility

const showModal = () => {
  isModalVisible.value = true;
};

const hideModal = () => {
  isModalVisible.value = false;
};

const addNewList = (title) => {
  const newList = { id: Date.now(), name: title, items: [] };
  lists.value.push(newList);
  selectedList.value = newList;
};

const handleSelectList = (list) => {
  selectedList.value = list;
};

const handleAddItem = (listId, newItem) => {
  const list = lists.value.find((l) => l.id === listId);
  if (list) {
    list.items.push(newItem);
  }
};
</script>
