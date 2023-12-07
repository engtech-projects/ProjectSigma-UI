<script  setup lang="ts">

import { Header, Item } from "vue3-easy-data-table";
import { defineComponent, ref, reactive } from "vue";

const headers: Header[] = [
      { text: "Employee Name", value: "employee_name" },
      { text: "Department", value: "department_name" },
      { text: "Action to be taken", value: "action_taken" },
      { text: "Actions", value: "actions" },
];

const items: Item[any] = ref([
{
    employee_name: "Juan Luna",
    department_name: "Accounting",
    action_taken: "BASIC SALARY",
    date_filed: "10/24/23",
    action_button: "1230",
  },
  {
    employee_name: "Jose Rizal",
    department_name: "Finance",
    action_taken: "EMPLOYMENT STATUS",
    date_filed: "10/24/23",
  },
  {
    employee_name: "Andress Boni",
    department_name: "IT",
    action_taken: "PROMOTION",
    date_filed: "10/24/23",
  },
  {
    employee_name: "Andress Boni",
    department_name: "IT",
    action_taken: "TRANSFER",
    date_filed: "10/24/23",
  },
]);

const editingItem = reactive({
  salary_val_start: "",
  salary_val_end: "",
  monthly_prem: "",
  id: 0,
});

const deleteItem = (val: Item) => {
  items.value.splice(val.id,1);      
};

const editItem = (val: Item) => {
  const { salary_val, monthly_prem, id } = val;

  editingItem.salary_val_start = salary_val;
  editingItem.salary_val_end = salary_val;
  editingItem.monthly_prem = monthly_prem;
  editingItem.id = id;
};

const submitEdit = () => {
  const item = items.value.find((item: { id: number; }) => item.id === editingItem.id);
  item.salary_val = editingItem.salary_val_start;
  item.monthly_prem = editingItem.monthly_prem;
};

</script>

<template>
  <div
    class="shadow-md p-4 mt-6 bg-white mb-3 border border-gray-200 rounded-lg w-full md:w-1/2">
  
    <div class="pb-2 text-gray-500">
          Personnel Action Form List
          
        </div>
    
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

    <div class="mt-5 edit-item w-full max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-6 overflow-auto">
      <div class="grid gap-6 mb-6 md:grid-cols-2">
            <div>
                <label for="salary_val_start" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start</label>
                <input v-model="editingItem.salary_val_start" type="text" id="salary_val_start" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required>
            </div>
            <div>
                <label for="salary_val_end" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">End</label>
                <input v-model="editingItem.salary_val_end" type="text" id="salary_val_end" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required>
            </div>
        </div>
        <div class="mb-6">
            <label for="monthly_prem" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Monthly Premium</label>
            <input v-model="editingItem.monthly_prem" type="text" id="monthly_prem" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required>
        </div> 
        <button @click="submitEdit" type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
    </div>
  </div>

</template>
