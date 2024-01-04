<script  setup lang="ts">

import { Header, Item } from "vue3-easy-data-table";
import { defineComponent, ref, reactive } from "vue";

const headers: Header[] = [
      { text: "Employee", value: "employee" },
      { text: "Employee Share", value: "employee_share" },
      { text: "Actions", value: "actions" },
];

const items: Item[any] = ref([
  {
    employee: "Neil Down",
    employee_share: "800",
  },
  {
    employee: "Pete Sakes",
    employee_share: "700",
  },
  {
    employee: "Tara Newhall",
    employee_share: "800",
  },
  {
    employee: "Willie Passem",
    employee_share: "700",
  },
  {
    employee: "Drew A. Head",
    employee_share: "800",
  },
]);

const editingItem = reactive({
  employee: "",
  employee_share: "",
  id: 0,
});

const addItem = reactive({
  employee: "",
  employee_share: "",
  id: 0,
});

const deleteItem = (val: Item) => {
  items.value.splice(val.id,1);      
};

const editItem = (val: Item) => {
  const { employee, employee_share, id } = val;
  editingItem.employee = employee;
  editingItem.employee_share = employee_share;
  editingItem.id = id;
};


const submitEdit = () => {
  const item = items.value.find((item: { id: number; }) => item.id === editingItem.id);
  item.employee = editingItem.employee;
  item.employee_share = editingItem.employee_share;
};

const submitAdd = () => {
};

const clear = () => {
  editingItem.employee = "";
  editingItem.employee_share = "";
  editingItem.id = 0;
};

</script>

<template>

<h2 class="text-2xl font-semibold dark:text-white">PAG-IBIG</h2>

<div class="mt-5 edit-item w-full max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-6 overflow-auto">
  <label for="" class="text-xl font-semibold text-gray-900">Add Pag-ibig Share</label>

  <div class="mt-5 b-6">
          <label for="employee" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Employee</label>
          <input v-model="addItem.employee" type="text" id="employee" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required>
      </div> 
      <div class="mt-5 mb-6">
          <label for="employee_share" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Employee Share</label>
          <input v-model="addItem.employee_share" type="text" id="employee_share" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required>
      </div> 
      <button @click="submitAdd" type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Add
      </button>
    </div>
    
    <div class="mt-5 edit-item w-full max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-6 overflow-auto">
      <label for="" class="text-xl font-semibold text-gray-900">Contribution Table</label>
      <EasyDataTable
      show-index
      :headers="headers"
      :items="items"
      class="mt-5"
      >
      
      <template #item-actions="item">
        <button
        @click="deleteItem(item)"
            >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6z"/></svg> 
            </button>
            <button
            @click="editItem(item)"
            >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83l3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75z"/></svg>
          </button>
        </template>
        
      </EasyDataTable>
    </div>
    
    <div class="mt-5 edit-item w-full max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-6 overflow-auto">
      <label for="" class="text-xl font-semibold text-gray-900">Edit Contribution Record</label>

      <div class="mt-5 mb-6">
        <label for="employee" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Employee</label>
        <input disabled readonly v-model="editingItem.employee" type="text" id="employee" class="cursor-not-allowed bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required>
      </div> 
      
      <div class="mb-6">
        <label for="employee_share" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Employee Share</label>
        <input v-model="editingItem.employee_share" type="text" id="employee_share" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required>
      </div> 
      
      <div class="flex flexrow gap-4">
        <button @click="submitEdit" type="submit" class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
          Update
        </button>
        <button @click="clear" type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Cancel
        </button>
      </div>
  </div>

</template>
