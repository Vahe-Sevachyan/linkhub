<!-- SubcategoryView.vue -->
<template>
  <div>
    <h2>{{ list.name }}</h2>
    <button @click="$emit('addSubcategory')">Create Subcategory</button>
    <button @click="showDeleteModal">Delete Category "{{ list.name }}""</button>
    <div class="subcategory-list">
      <div
        v-for="subcategory in list.subcategories"
        :key="subcategory.id"
        class="subcategory"
      >
        <h3>
          {{ subcategory.name }}
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
    <!-- Delete Confirmation Modal -->
    <DeleteConfirmationModal
      v-if="isDeleteModalVisible"
      :categoryName="list.name"
      @confirmDeletion="handleDeleteCategory"
      @closeModal="isDeleteModalVisible = false"
    />
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref } from "vue";
import DeleteConfirmationModal from "./DeleteConfirmationModal.vue";

// Define the props to accept the list
const props = defineProps({
  list: Object,
});

// // Define the emit function
const emit = defineEmits(["deleteCategory"]);
// Local state to control modal visibility

const isDeleteModalVisible = ref(false);

// Show delete confirmation modal
const showDeleteModal = () => {
  isDeleteModalVisible.value = true;
};
// Method to handle category deletion
const handleDeleteCategory = () => {
  emit("deleteCategory", props.list);
  isDeleteModalVisible.value = false; // Close modal after deletion
};
// // Method to handle deletion
// const handleDeleteCategory = () => {
//   console.log("Emitting deleteCategory with list:", props.list);
//   emit("deleteCategory", props.list);
// };
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
