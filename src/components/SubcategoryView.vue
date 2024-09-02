<!-- SubcategoryView.vue -->
<template>
  <div>
    <h2>{{ list.name }}</h2>
    <button @click="$emit('addSubcategory')">Create Subcategory</button>
    <button @click="handleDeleteCategory">
      Delete Category "{{ list.name }}""
    </button>
    <!-- <Button @click="$emit('deleteCategory', list)"
      >Delete "{{ list.name }}""</Button
    > -->
    <div class="subcategory-list">
      <div
        v-for="subcategory in list.subcategories"
        :key="subcategory.id"
        class="subcategory"
      >
        <h3>
          {{ subcategory.name }}
          <!-- <span
            class="delete-button"
            @click.stop="$emit('deleteSubcategory', subcategory)"
            >✖</span
          > -->
        </h3>
        <button @click="$emit('editSubcategory', subcategory)">Edit</button>
        <button @click="$emit('deleteSubcategory', subcategory)">Delete</button>
        <button @click="$emit('addItem', subcategory)">Add to List</button>
        <ul>
          <li v-for="item in subcategory.items" :key="item.id">
            {{ item.name }} - {{ item.url }}
            <button @click="$emit('deleteItem', item)">Delete</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
// Define the props to accept the list
const props = defineProps({
  list: Object,
});
// const props = defineProps(["list"]);

// // Define the emit function
const emit = defineEmits(["deleteCategory"]);

// Method to handle deletion
const handleDeleteCategory = () => {
  console.log("Emitting deleteCategory with list:", props.list);
  emit("deleteCategory", props.list);
};
// // Method to handle deletion
// const handleDeleteCategory = (list) => {
//   if (list) {
//     console.log("Emitting deleteCategory with item:", list);
//     emit("deleteCategory", list); // Ensure the item is passed
//   } else {
//     console.error("No item to delete");
//   }
// };
// // Method to handle deletion
// const handleDeleteCategory = (item) => {
//   console.log("Emitting deleteCategory with item:", item);
//   emit("deleteCategory", item);
// };
</script>

<style scoped>
.subcategory-list {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.subcategory {
  border: 1px solid #ddd;
  padding: 10px;
  margin: 10px 0;
  width: 80%;
}

button {
  margin: 5px;
}
</style>
