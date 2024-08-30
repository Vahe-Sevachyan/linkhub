<template>
  <div id="app">
    <div class="container">
      <div class="sidebar">
        <ListSidebar :lists="lists" @selectList="handleSelectList" />
      </div>

      <div class="main">
        <ListItemDetail :selectedList="selectedList" @addItem="handleAddItem" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ListSidebar from "./components/ListSidebar.vue";
import ListItemDetail from "./components/ListItemDetail.vue";

const lists = ref([
  {
    id: 1,
    name: "List 1",
    items: [{ name: "Link 1", url: "http://example.com" }],
  },
  { id: 2, name: "List 2", items: [] },
]);

const selectedList = ref(null);

const handleSelectList = (list) => {
  selectedList.value = list;
};

const handleAddItem = (listId, newItem) => {
  const list = lists.value.find((list) => list.id === listId);
  if (list) {
    list.items.push(newItem);
  }
};
</script>

<style>
.container {
  display: flex;
}

.sidebar {
  width: 25%;
  border-right: 1px solid #ddd;
  overflow-y: auto;
}

.main {
  width: 75%;
  padding: 20px;
}
</style>
