<!-- ListSidebar.vue -->
<template>
  <div class="side-bar-container">
    <button class="side-bar-create-button" @click="emit('showAddListModal')">
      Create New
    </button>
    <div class="side-bar-list-container">
      <ul class="side-bar-list">
        <li v-for="list in lists" :key="list.id" @click="selectList(list)">
          {{ list.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps(["lists"]);
const emit = defineEmits(["selectList", "showAddListModal"]);

const selectList = (list) => {
  emit("selectList", list);
};

// const showAddListModal = () => {
//   emit("triggerModal");
// };
</script>

<style scoped>
.side-bar-create-button {
  padding: 5px;
  width: 120px;
  margin: 15px;
  font-family: "Josefin Sans", Courier, monospace;
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  border-radius: 3px;
  background-color: #0080ff;
  color: #ffffff;
  padding: 4px;
}
.side-bar-list {
  background-color: #2b3038;
}
.side-bar-list li {
  /* border: 1px solid red; */
  color: #bcbcbc;
  border-bottom: #464b54 1px solid;
}
.side-bar-list li:hover {
  color: #f0f0f0;
}
/* .side-bar-list:hover {
  background-color: #4b515a;
} */
.side-bar-create-button:hover {
  background-color: #0066cc;
}
.side-bar-container {
  width: 150px;
}
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
  background-color: #4c505a;
}
</style>
