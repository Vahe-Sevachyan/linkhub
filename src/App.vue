<!-- App.vue -->
<template>
  <div class="app-container">
    <ListSidebar
      :lists="lists"
      @showAddListModal="showAddListModal"
      @selectList="handleSelectList"
    />
    <div class="main-content">
      <SubcategoryView
        v-if="selectedList"
        :list="selectedList"
        @addSubcategory="showSubcategoryModal"
        @editSubcategory="showEditSubcategoryModal"
        @deleteSubcategory="showDeleteSubcategoryModal"
        @addItem="showAddItemModal"
        @deleteItem="confirmDeleteItem"
      />
    </div>
    <!-- Main Modal for creating lists -->
    <Modal
      v-if="isAddListModalVisible"
      modalTitle="Add to List"
      showInput
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
      showInput
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
      showInput
      inputPlaceholder="Enter item name"
      submitButtonText="Save"
      showCancelButton
      @close="hideAddItemModal"
      @submit="addItemToSubcategory"
    />
    <!-- Modals for edit, delete, and confirm delete can be added similarly -->
    <Modal
      v-if="isEditSubcategoryModalVisible"
      modalTitle="Edit Subcategory"
      showInput
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
      modalTitle="Confirm Delete Item"
      isDeleteConfirm
      deleteItemName="item"
      submitButtonText="Yes"
      showCancelButton
      @close="hideDeleteItemModal"
      @submit="deleteItem"
    />

    <!-- Add confirmation modals and other interactions as needed -->
  </div>
</template>

<script setup>
import { ref } from "vue";
import ListSidebar from "./components/ListSidebar.vue";
import SubcategoryView from "./components/SubcategoryView.vue";
import Modal from "./components/Modal.vue";

// State variables
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
    ],
  },
]);

const selectedList = ref(null);
const isAddListModalVisible = ref(false);
const isAddSubcategoryModalVisible = ref(false);
const isSubcategoryModalVisible = ref(false);
const isAddItemModalVisible = ref(false);
const isEditSubcategoryModalVisible = ref(false);
const isDeleteSubcategoryModalVisible = ref(false);
const currentSubcategory = ref(null);

function showAddListModal() {
  isAddListModalVisible.value = true;
}

function hideAddListModal() {
  isAddListModalVisible.value = false;
}

const showDeleteItemModal = (item) => {
  currentItem.value = item;
  isDeleteItemModalVisible.value = true;
};

const deleteItem = () => {
  const subcategory = selectedList.value.subcategories.find(
    (sub) => sub.id === currentSubcategory.value.id
  );
  if (subcategory) {
    subcategory.items = subcategory.items.filter(
      (itm) => itm.id !== currentItem.value.id
    );
  }
  showDeleteItemModal();
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

const confirmDeleteItem = (item) => {
  // Implement logic to confirm and delete the item from the subcategory
};
</script>

<style scoped>
.app-container {
  display: flex;
  background-color: #464545;
  color: #ffffff;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  padding: 20px;
  background-color: #605a5a;
}
.modal-content {
  background: #333;
  color: #fff;
  padding: 20px;
  border-radius: 8px;
}

button {
  padding: 10px 20px;
  margin-top: 10px;
  cursor: pointer;
  background: #565656;
  border: none;
  color: #fff;
  transition: background-color 0.3s ease;
}

button:hover {
  background: #6a6a6a;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  cursor: pointer;
  padding: 10px;
  border-bottom: 1px solid #444;
}

li:hover {
  background-color: #3a3a3a;
}
input {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  background: #444;
  color: #fff;
  border: 1px solid #555;
}

.subcategory-list {
  background: #333;
  color: #fff;
  padding: 20px;
  border-radius: 8px;
}

.subcategory {
  border: 1px solid #ddd;
  padding: 10px;
  margin: 10px 0;
  width: 80%;
}
</style>
