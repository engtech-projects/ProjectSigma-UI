<script  setup lang="ts">

import { Header, Item } from "vue3-easy-data-table";
import { defineComponent, ref, reactive } from "vue";

const headers: Header[] = [
      { text: "Range of Compensation", value: "range_compensation" },
      { text: "Emlpoyer Share", value: "employer_share" },
      { text: "Employee Share", value: "employee_share" },
      { text: "Total Contributions", value: "total_contributions" },
      { text: "Actions", value: "actions" },
];

const items: Item[any] = ref([
  {
    range_compensation: "range compensation lorem1",
    employer_share: "employer share lorem1",
    employee_share: "employee share lorem1",
    total_contributions: "total contributions lorem1",
  },
  {
    range_compensation: "range compensation lorem2",
    employer_share: "employer share lorem2",
    employee_share: "employee share lorem2",
    total_contributions: "total contributions lorem2",
  },
  {
    range_compensation: "range compensation lorem3",
    employer_share: "employer share lorem3",
    employee_share: "employee share lorem3",
    total_contributions: "total contributions lorem3",
  },
  {
    range_compensation: "range compensation lorem4",
    employer_share: "employer share lorem4",
    employee_share: "employee share lorem4",
    total_contributions: "total contributions lorem4",
  },
  {
    range_compensation: "range compensation lorem5",
    employer_share: "employer share lorem5",
    employee_share: "employee share lorem5",
    total_contributions: "total contributions lorem5",
  },
  {
    range_compensation: "range compensation lorem6",
    employer_share: "employer share lorem6",
    employee_share: "employee share lorem6",
    total_contributions: "total contributions lorem6",
  },
  {
    range_compensation: "range compensation lorem7",
    employer_share: "employer share lorem7",
    employee_share: "employee share lorem7",
    total_contributions: "total contributions lorem7",
  },
]);

const AddItem = reactive({
  range_compensation: "",
  employer_share: "",
  employee_share: "",
  total_contributions: "",
  id: 0,
});

const editingItem = reactive({
  range_compensation: "",
  employer_share: "",
  employee_share: "",
  total_contributions: "",
  id: 0,
});

const deleteItem = (val: Item) => {
  items.value.splice(val.id,1);      
};

const editItem = (val: Item) => {
  const { range_compensation, employer_share, employee_share, total_contributions, id } = val;
  editingItem.range_compensation = range_compensation;
  editingItem.employer_share = employer_share;
  editingItem.employee_share = employee_share;
  editingItem.total_contributions = total_contributions;
  editingItem.id = id;
};

const submitEdit = () => {
  const item = items.value.find((item: { id: number; }) => item.id === editingItem.id);
  item.range_compensation = editingItem.range_compensation;
  item.employer_share = editingItem.employer_share;
  item.employee_share = editingItem.employee_share;
  item.total_contributions = editingItem.total_contributions;
};

const autoAdd = () =>{
  AddItem.total_contributions = AddItem.employee_share + AddItem.employer_share;
}

const autoAddinEdit = () =>{
  editingItem.total_contributions = editingItem.employee_share + editingItem.employer_share;
}

const submitAdd = () => {
};
</script>

<template>
  
  <h2 class="mt-5 text-4xl font-extrabold dark:text-white">SSS</h2>

  <div class="mt-5 edit-item w-full max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-6 overflow-auto" >
      <h5 class="text-xl font-extrabold dark:text-white">Add SSS Contribution Range</h5>
      <div class="mt-5 mb-6">
          <label for="range_compensation" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Range Compensation</label>
          <input v-model="AddItem.range_compensation" type="text" id="range_compensation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required>
      </div> 
      <div class="mb-6">
          <label for="employer_share" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Employer Share</label>
          <input @change="autoAdd" v-model="AddItem.employer_share" type="number" id="employer_share" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required>
      </div> 
      <div class="mb-6">
          <label for="employee_share" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Employee Share</label>
          <input @change="autoAdd" v-model="AddItem.employee_share" type="number" id="employee_share" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required>
      </div> 
      <div class="mb-6">
          <label for="total_contributions" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Total Contributions</label>
          <input disabled readonly v-model="AddItem.total_contributions" type="number" id="total_contributions" class="cursor-not-allowed bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required>
      </div> 
      <button @click="submitAdd" type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add</button>
  </div>

  <div class="mt-5 w-full max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-5">
    <h5 class="text-xl font-extrabold dark:text-white border-b">Contribution Table</h5>
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

  <div class="mt-5 edit-item w-full max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-6 overflow-auto" >
      <h5 class="text-xl font-extrabold dark:text-white">Edit SSS Contribution Range</h5>
      <div class="mt-5 mb-6">
          <label for="range_compensation" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Range Compensation</label>
          <input v-model="editingItem.range_compensation" type="text" id="range_compensation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required>
      </div> 
      <div class="mb-6">
          <label for="employer_share" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Employer Share</label>
          <input @change="autoAddinEdit" v-model="editingItem.employer_share" type="number" id="employer_share" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required>
      </div> 
      <div class="mb-6">
          <label for="employee_share" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Employee Share</label>
          <input @change="autoAddinEdit" v-model="editingItem.employee_share" type="number" id="employee_share" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required>
      </div> 
      <div class="mb-6">
          <label for="total_contributions" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Total Contributions</label>
          <input disabled readonly  v-model="editingItem.total_contributions" type="number" id="total_contributions" class="cursor-not-allowed bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required>
      </div> 
      <button @click="submitEdit" type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>
  </div>

</template>
