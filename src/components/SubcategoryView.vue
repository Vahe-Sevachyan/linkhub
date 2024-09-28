<!-- SubcategoryView.vue -->
<template>
  <div class="main-content">
    <div class="header-section">
      <h2 class="category-name">{{ list.name }}</h2>
      <div class="header-button-container">
        <button class="create-subcategory-btn" @click="$emit('addSubcategory')">
          Create Subcategory
        </button>
        <button class="delete-category-btn" @click="showDeleteModal">
          Delete "{{ list.name }}"
        </button>
      </div>
    </div>
    <div class="subcategory-container">
      <div
        v-for="subcategory in list.subcategories"
        :key="subcategory.id"
        class="subcategory-list"
      >
        <div class="subcategory-header">
          <h3 class="subcategory-name">
            {{ subcategory.name }}
          </h3>
          <div class="subcategory-btn-container">
            <button @click="$emit('editSubcategory', subcategory)">Edit</button>
            <button @click="$emit('deleteSubcategory', subcategory)">
              Delete
            </button>
            <button @click="$emit('addLink', subcategory)">Add Link</button>
          </div>
        </div>

        <ul class="ul-container">
          <li
            v-for="(item, index) in subcategory.items"
            :key="item.id"
            class="li-container"
          >
            <div class="link-container">
              <p>{{ item.name }}</p>
              <a :href="item.url" target="_blank">{{ item.url }} </a>
              <div class="link-btn-container">
                <button @click="showEditLinkModal(subcategory, index)">
                  Edit
                </button>
                <button @click="$emit('deleteItem', subcategory, item)">
                  Delete
                </button>
              </div>
            </div>
          </li>
        </ul>
        <div v-if="isEditLinkModalVisible" class="modal">
          <div class="modal-content">
            <h3>Edit Link for {{ currentSubcategory?.name }}</h3>
            <input v-model="editLinkName" placeholder="Link Name" />
            <input v-model="editLinkUrl" placeholder="Link URL" />
            <div class="modal-buttons">
              <button @click="saveLink">Save</button>
              <button @click="cancelEdit">Cancel</button>
            </div>
          </div>
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

// // Define the emit function
const emit = defineEmits(["deleteCategory", "editLink"]);
// State variables
const currentSubcategory = ref(null);
const editingIndex = ref(null);
const isEditLinkModalVisible = ref(false);
const editLinkName = ref("");
const editLinkUrl = ref("");
const isDeleteModalVisible = ref(false);

// Define the props to accept the list
const props = defineProps({
  list: Object,
  subcategory: Object,
});

// Function to show the edit modal
const showEditLinkModal = (subcategory, index) => {
  if (subcategory && index !== undefined) {
    currentSubcategory.value = subcategory;
    editingIndex.value = index;
    isEditLinkModalVisible.value = true;
    // Pre-fill the modal with the existing link data
    const item = subcategory.items[index];
    if (item) {
      editLinkName.value = item.name;
      editLinkUrl.value = item.url;
    }
  } else {
    console.error("Invalid subcategory or index.");
  }
};
// Function to save the edited link
const saveLink = () => {
  if (currentSubcategory.value && editingIndex.value !== null) {
    const item = currentSubcategory.value.items[editingIndex.value];
    if (item) {
      item.name = editLinkName.value;
      item.url = editLinkUrl.value;
      isEditLinkModalVisible.value = false;
    }
  }
};
// Local state to control modal visibility

// Show delete confirmation modal
const showDeleteModal = () => {
  isDeleteModalVisible.value = true;
};
// Cancel edit and hide modal
const cancelEdit = () => {
  isEditLinkModalVisible.value = false;
};
// Method to handle category deletion
const handleDeleteCategory = () => {
  emit("deleteCategory", props.list);
  isDeleteModalVisible.value = false; // Close modal after deletion
};
</script>
<style scoped>
.header-button-container {
  width: 300px;
  /* border: 1px black solid; */
  display: flex;
  justify-content: space-between;
}
.create-subcategory-btn,
.delete-category-btn {
  font-family: "Josefin Sans", Courier, monospace;
  /* font-size: 15px; */
  font-weight: 600;
  cursor: pointer;
  border: none;
  border-radius: 3px;
  background-color: #0080ff;
  color: #ffffff;
  padding: 4px;
}
.create-subcategory-btn:hover,
.delete-category-btn:hover {
  background-color: #0066cc;
}
.subcategory-list button {
  font-family: "Josefin Sans", Courier, monospace;
  font-weight: 600;
  cursor: pointer;
  border: none;
  padding: 8px;
  font-size: 13px;
  border-radius: 3px;
  background-color: #0080ff;
  color: #ffffff;
}
.subcategory-list button:hover {
  background-color: #0066cc;
}
.header-section {
  padding: 10px;
  display: flex;
  justify-content: space-between;
}
.subcategory-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.subcategory-header {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.subcategory-btn-container {
  display: flex;
  justify-content: space-between;
  width: 188px;
}
.subcategory-list {
  background-color: #2b3038;
  border: 1px solid #464b54;
  padding: 10px;
  margin: 10px 0;
  width: 80%;
}

.li-container {
  border-radius: 7px;
  background-color: #1e2229;
  color: #acafb3;
  width: 95%;
  margin: auto;
}
.ul-container {
  width: 100%;
  margin: auto;
}
.link-container {
  padding: 10px;
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
}
.link-btn-container {
  width: 105px;
  display: flex;
  justify-content: space-between;
}
.category-name {
  font-family: "Josefin Sans", Courier, monospace;
  font-weight: 400;
  color: white;
  background-color: #2e3137;
  padding: 5px;
  border-radius: 5px;
}
.subcategory-name {
  font-family: "Josefin Sans", Courier, monospace;
  font-weight: 400;
  color: white;
}
/* Modal styling */
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
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}

.modal-buttons {
  display: flex;
  justify-content: space-around;
}

.modal-buttons button {
  margin: 0 10px;
}
ul {
  list-style-type: none;
}
</style>
