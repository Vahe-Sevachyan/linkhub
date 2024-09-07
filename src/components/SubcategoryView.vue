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
        <button @click="$emit('addLink', subcategory)">Add to List</button>
        <ul>
          <li v-for="(item, index) in subcategory.items" :key="item.id">
            {{ item.name }} -
            <a :href="item.url" target="_blank">{{ item.url }} </a>
            <button @click="showEditLinkModal(subcategory, index)">Edit</button>
            <button @click="$emit('deleteItem', item)">Delete</button>
          </li>
        </ul>
        <!-- Edit Modal -->
        <div v-if="isEditLinkModalVisible">
          <h3>Edit Link for {{ currentSubcategory?.name }}</h3>
          <input v-model="editLinkName" placeholder="Link Name" />
          <input v-model="editLinkUrl" placeholder="Link URL" />
          <button @click="saveLink">Save</button>
        </div>
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
import { defineProps, defineEmits, ref, computed } from "vue";
import DeleteConfirmationModal from "./DeleteConfirmationModal.vue";

// Define the props to accept the list
const props = defineProps({
  list: Object,
});

//trouble shooting function
function showEditLinkModal(subcategory, index) {
  console.log("subcategory:", subcategory);
  console.log("index:", index);

  // Check if subcategory and index are valid
  if (!subcategory) {
    console.error("subcategory is invalid:", subcategory);
  }

  if (typeof index !== "number") {
    console.error("index is invalid:", index);
  }

  // Check if subcategory and index are valid and usable
  if (
    subcategory &&
    typeof index === "number" &&
    index >= 0 &&
    Array.isArray(subcategory.items) &&
    index < subcategory.items.length
  ) {
    currentSubcategory.value = subcategory;
    editingIndex.value = index;
    isEditLinkModalVisible.value = true;
  } else {
    console.error("Invalid subcategory or index.");
  }
}

// const emit = defineEmits(['editLink']);

// function editItem(index) {
//   emit("editLink", index); // Emit the event for editing
// }

// function showEditLinkModal(subcategory, index) {

//   if (
//     subcategory &&
//     Array.isArray(subcategory.items) &&
//     index >= 0 &&
//     index < subcategory.items.length
//   ) {
//     currentSubcategory.value = subcategory;
//     editingIndex.value = index;
//     isEditLinkModalVisible.value = true;
//   } else {
//     console.error("Invalid subcategory or index.");
//   }
// }
// function showEditLinkModal(subcategory, index) {
//   if (subcategory && typeof index === "number") {
//     currentSubcategory.value = subcategory;
//     editingIndex.value = index; // Properly assign the index
//     isEditLinkModalVisible.value = true; // Show the modal
//   } else {
//     console.error("Invalid subcategory or index.");
//   }
// }
// // Define the emit function
const emit = defineEmits(["deleteCategory", "editLink"]);
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
