<!-- App.vue -->
<template>
  <div class="app-container">
    <ListSidebar
      class="list-sidebar"
      :lists="lists"
      @showAddListModal="showAddListModal"
      @selectList="handleSelectList"
    />
    <div class="main-content">
      <SubcategoryView
        v-if="selectedList"
        :list="selectedList"
        @addSubcategory="showSubcategoryModal"
        @deleteCategory="deleteCategory"
        @editSubcategory="showEditSubcategoryModal"
        @deleteSubcategory="confirmDeleteSubcategory"
        @addLink="showAddLinkModal"
        @editLink="showEditLinkModal(selectedList, $event)"
        @deleteItem="showDeleteItemModal"
      />
    </div>
    <!-- Existing Modals -->
    <!-- Add confirmation modal for list and subcategory deletion -->
    <Modal
      v-if="isDeleteItemModalVisible"
      modalTitle="Confirm Delete Item"
      inputPlaceholder="Type the item name to delete"
      submitButtonText="Confirm Delete"
      showCancelButton
      @close="hideDeleteItemModal"
      @submit="validateDeleteItem"
    />
    <Modal
      v-if="isDeleteSubcategoryModalVisible"
      modalTitle="Confirm Delete Subcategory"
      inputPlaceholder="Type the subcategory name to delete"
      submitButtonText="Confirm Delete"
      showCancelButton
      @close="hideDeleteSubcategoryModal"
      @submit="validateDeleteSubcategory"
    />
    <!-- Main Modal for creating lists -->
    <Modal
      v-if="isAddListModalVisible"
      modalTitle="Add to List"
      inputPlaceholder="Enter item name"
      submitButtonText="Save"
      showCancelButton
      @close="hideAddListModal"
      @submit="addNewList"
    />
    <!-- Modal for creating subcategories -->
    <Modal
      v-if="isAddSubcategoryModalVisible"
      modalTitle="Create Subcategory"
      inputPlaceholder="Enter subcategory name"
      submitButtonText="Save"
      showCancelButton
      @close="hideSubcategoryModal"
      @submit="addNewSubcategory"
    />
    <!-- Modal for adding items to subcategories -->
    <Modal
      v-if="isAddItemModalVisible"
      modalTitle="Add to List"
      inputPlaceholder="Enter link name"
      submitButtonText="Save"
      showCancelButton
      @close="hideAddItemModal"
      @submit="addItemToSubcategory"
    />
    <!-- Modals for edit, delete, and confirm delete can be added similarly -->
    <Modal
      v-if="isEditSubcategoryModalVisible"
      modalTitle="Edit Subcategory"
      inputPlaceholder="Enter new subcategory name"
      submitButtonText="Save"
      showCancelButton
      @close="hideEditSubcategoryModal"
      @submit="editSubcategory"
    />
    <Modal
      v-if="isDeleteSubcategoryModalVisible"
      modalTitle="Delete Subcategory"
      isDeleteConfirm
      deleteItemName="subcategory"
      submitButtonText="Yes"
      showCancelButton
      @close="hideDeleteSubcategoryModal"
      @submit="deleteSubcategory"
    />
    <Modal
      v-if="isDeleteItemModalVisible"
      modalTitle="Confirm Category Name"
      isDeleteConfirm
      deleteItemName="item"
      inputPlaceholder="Type the item name to delete"
      submitButtonText="Confirm Delete"
      showCancelButton
      @close="hideDeleteItemModal"
      @submit="validateDeleteItem"
    />
    <AddLinkModal
      v-if="isModalVisible"
      :modalTitle="modalTitle"
      :initialName="nameToEdit"
      :initialLink="linkToEdit"
      @submit="submitModalForm"
      @close="hideModal"
    />
    <Modal
      v-if="isEditLinkModalVisible"
      modalTitle="Edit Link"
      :inputLinkValue="currentSubcategory?.items[editingIndex]?.url"
      :inputNameValue="currentSubcategory?.items[editingIndex]?.name"
      @close="hideEditLinkModal"
      @submit="saveEditedLink"
    />
    <!-- Add confirmation modals and other interactions as needed -->
  </div>
</template>

<script setup>
import { ref } from "vue";
import ListSidebar from "./components/ListSidebar.vue";
import SubcategoryView from "./components/SubcategoryView.vue";
import AddLinkModal from "./components/AddLinkModal.vue";
import Modal from "./components/Modal.vue";
const isAddLinkModalVisible = ref(false);

// State variables
const lists = ref([]);
const selectedList = ref(null);
const isAddListModalVisible = ref(false);
const isAddSubcategoryModalVisible = ref(false);
const isAddItemModalVisible = ref(false);
const isEditSubcategoryModalVisible = ref(false);
const isDeleteSubcategoryModalVisible = ref(false);
const currentSubcategory = ref(null);
const isDeleteItemModalVisible = ref(false);
const currentItem = ref(null);
const itemToDeleteName = ref("");
const isEditLinkModalVisible = ref(false);
const isModalVisible = ref(false);
const editingIndex = ref(null);
const modalMode = ref("add"); // 'add' or 'edit'
const modalTitle = ref("Add New Link");
const nameToEdit = ref("");
const linkToEdit = ref("");

function showAddListModal() {
  isAddListModalVisible.value = true;
}

function hideAddListModal() {
  isAddListModalVisible.value = false;
}
function deleteCategory(list) {
  console.log("deleteCategory called with list:", list);
  lists.value = lists.value.filter((l) => l.id !== list.id);
  selectedList.value = null; // Optionally deselect the deleted list
}
// add link to sub category
function showAddLinkModal(subcategory) {
  modalMode.value = "add";
  currentSubcategory.value = subcategory;
  nameToEdit.value = "";
  linkToEdit.value = "";
  modalTitle.value = "Add New Link";
  isModalVisible.value = true;
}
function saveEditedLink({ name, url }) {
  if (currentSubcategory.value && editingIndex.value !== null) {
    currentSubcategory.value.items[editingIndex.value].name = name;
    currentSubcategory.value.items[editingIndex.value].url = url;
  }
  hideEditLinkModal(); // Close the modal after saving
}

function hideEditLinkModal() {
  isEditLinkModalVisible.value = false;
}

function showEditLinkModal(subcategory, index) {
  if (
    subcategory &&
    Array.isArray(subcategory.items) &&
    index >= 0 &&
    index < subcategory.items.length
  ) {
    currentSubcategory.value = subcategory;
    editingIndex.value = index;
    isEditLinkModalVisible.value = true;
  } else {
    console.error("Invalid subcategory or index.");
  }
}

function hideModal() {
  isModalVisible.value = false;
}

function submitModalForm({ name, link }) {
  if (modalMode.value === "add") {
    // Adding a new item to the subcategory
    const newItem = { id: Date.now(), name, url: link };
    currentSubcategory.value.items.push(newItem);
  } else if (modalMode.value === "edit") {
    // Editing the existing item
    currentSubcategory.value.items[editingIndex.value] = {
      ...currentSubcategory.value.items[editingIndex.value],
      name,
      url: link,
    };
  }
  hideModal();
}

function hideAddLinkModal() {
  isAddLinkModalVisible.value = false;
}

function addNewItemToSubcategory({ name, link }) {
  if (currentSubcategory.value) {
    const newItem = { id: Date.now(), name, url: link };
    currentSubcategory.value.items.push(newItem);
  }
  hideAddLinkModal();
}

const showDeleteItemModal = (subcategory, item) => {
  console.log(
    "showDeleteItemModal called with subcategory and item:",
    subcategory,
    item
  );
  if (subcategory && item) {
    currentSubcategory.value = subcategory; // Set the correct subcategory
    currentItem.value = item;
    isDeleteItemModalVisible.value = true;
  } else {
    console.error("No subcategory or item provided for deletion.");
  }
};
const validateDeleteItem = (inputValue) => {
  console.log("Expected:", currentItem.value.name, "Input:", inputValue);
  if (inputValue === currentItem.value.name) {
    deleteItem(); // Call delete function if the name matches
  } else {
    alert("Item name does not match. Deletion aborted.");
  }
};

const handleSelectSubcategory = (subcategory) => {
  currentSubcategory.value = subcategory;
};

const deleteItem = () => {
  console.log(
    "Deleting item from current subcategory: ",
    currentSubcategory.value
  );
  if (currentSubcategory.value && currentItem.value) {
    currentSubcategory.value.items = currentSubcategory.value.items.filter(
      (itm) => itm.id !== currentItem.value.id
    );
  }
  hideDeleteItemModal();
};

function hideDeleteItemModal() {
  currentItem.value = null; // Clear current item
  currentSubcategory.value = null; // Clear subcategory after deletion
  isDeleteItemModalVisible.value = false;
}

const confirmDeleteSubcategory = (subcategory) => {
  currentSubcategory.value = subcategory;
  itemToDeleteName.value = subcategory.name; // Store the name of the subcategory to be deleted
  isDeleteSubcategoryModalVisible.value = true;
};

const addNewList = (name) => {
  const newList = { id: Date.now(), name, subcategories: [] };
  lists.value.push(newList);
  selectedList.value = newList;
  hideAddListModal();
};

const handleSelectList = (list) => {
  selectedList.value = list;
};

const showSubcategoryModal = () => {
  isAddSubcategoryModalVisible.value = true;
};

const hideSubcategoryModal = () => {
  isAddSubcategoryModalVisible.value = false;
};

const addNewSubcategory = (title) => {
  if (selectedList.value) {
    const newSubcategory = { id: Date.now(), name: title, items: [] };
    selectedList.value.subcategories.push(newSubcategory);
  }
  hideSubcategoryModal();
};

const showAddItemModal = (subcategory) => {
  currentSubcategory.value = subcategory;
  isAddItemModalVisible.value = true;
};

const hideAddItemModal = () => {
  isAddItemModalVisible.value = false;
};

const addItemToSubcategory = ({ name, url }) => {
  if (currentSubcategory.value) {
    const newItem = { id: Date.now(), name, url };
    currentSubcategory.value.items.push(newItem);
  }
  hideAddItemModal();
};

const showEditSubcategoryModal = (subcategory) => {
  currentSubcategory.value = subcategory;
  isEditSubcategoryModalVisible.value = true;
};

const hideEditSubcategoryModal = () => {
  isEditSubcategoryModalVisible.value = false;
};

const editSubcategory = (newName) => {
  if (currentSubcategory.value) {
    currentSubcategory.value.name = newName;
  }
  hideEditSubcategoryModal();
};

const showDeleteSubcategoryModal = (subcategory) => {
  currentSubcategory.value = subcategory;
  isDeleteSubcategoryModalVisible.value = true;
};

const hideDeleteSubcategoryModal = () => {
  isDeleteSubcategoryModalVisible.value = false;
};

const deleteSubcategory = () => {
  if (selectedList.value && currentSubcategory.value) {
    selectedList.value.subcategories = selectedList.value.subcategories.filter(
      (sub) => sub.id !== currentSubcategory.value.id
    );
  }
  hideDeleteSubcategoryModal();
};

const validateDeleteSubcategory = (inputValue) => {
  if (inputValue === currentSubcategory.value.name) {
    deleteSubcategory(); // Call delete function if name matches
  } else {
    alert("Subcategory name does not match. Deletion aborted.");
  }
  hideDeleteSubcategoryModal();
};

const confirmDeleteItem = (item) => {
  if (item) {
    currentItem.value = item; // Set currentItem to the item object
    itemToDeleteName.value = item.name; // Store the name of the item to be deleted
    isDeleteItemModalVisible.value = true;
  } else {
    console.error("No item provided to confirm delete.");
  }
};
</script>

<style scoped>
.app-container {
  display: flex;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  background-color: #24282e;
}
.modal-content {
  background: #333;
  color: #fff;
  border-radius: 8px;
}
.list-sidebar {
  background-color: #1a1d22;
  color: #dddddd;
}
</style>
