<script  setup lang="ts">

definePageMeta({
  layout: "default",
  }),
  useHead({
    title: "PhilHealth",
  });

import { Header, Item } from "vue3-easy-data-table";
import { defineComponent, ref, reactive } from "vue";

const headers: Header[] = [
      { text: "Salary Bracket", value: "salary_val" },
      { text: "Monthly Premium", value: "monthly_prem" },
      { text: "Actions", value: "actions" },
];

const items: Item[any] = ref([
  {
    salary_val: "salary lorem1 - salary lorem1",
    monthly_prem: "monthly prem lorem1",
  },
  {
    salary_val: "salary lorem2 - salary lorem2",
    monthly_prem: "monthly prem lorem2",
  },
  {
    salary_val: "salary lorem3 - salary lorem3",
    monthly_prem: "monthly prem lorem3",
  },
  {
    salary_val: "salary lorem4 - salary lorem4",
    monthly_prem: "monthly prem lorem4",
  },
  {
    salary_val: "salary lorem5 - salary lorem5",
    monthly_prem: "monthly prem lorem5",
  },
]);

const editingItem = reactive({
  salary_val_start: "",
  salary_val_end: "",
  monthly_prem: "",
  id: 0,
});

const addItem = reactive({
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

const submitAdd = () => {
};

</script>

<template>
  
  <h2 class="text-2xl font-semibold dark:text-white">PHILHEALTH</h2>

  <div class="mt-5 edit-item w-full max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-6 overflow-auto">
      <label for="" class="text-xl font-semibold text-gray-900">Add Contribution Record</label>

      <div class="mt-5 grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <label for="add_salary_val_start" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start</label>
              <input v-model="addItem.salary_val_start" type="text" id="add_salary_val_start" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required>
          </div>
          <div>
            <label for="add_salary_val_end" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">End</label>
              <input v-model="addItem.salary_val_end" type="text" id="add_salary_val_end" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required>
          </div>
      </div>
      <div class="mb-6">
          <label for="add_monthly_prem" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Monthly Premium</label>
          <input v-model="addItem.monthly_prem" type="text" id="add_monthly_prem" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required>
      </div> 
      <button @click="submitAdd" type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add</button>
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
      <div class="mt-5 grid gap-6 mb-6 md:grid-cols-2">
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

</template>
