<template>
      <h5 class="text-xl font-extrabold dark:text-white">Allowance Payroll Form</h5>
        <div class="mt-5 mb-6">
          <div class="flex">
            <div class="search">
              <div>
                  <label for="search" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Search</label>
                  <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" v-model="searchValue" type="text">
              </div>
            </div>
          </div>
          <EasyDataTable
                  class="mt-5"
                  table-class-name="customize-table"
                  :headers="headers"
                  :items="items"
                  :search-field="searchField"
                  :search-value="searchValue"
                  :sort-by="sortBy"
                  :sort-type="sortType"
                  v-model:items-selected="itemsSelected"
                >
                <template #header-employee_id="header">
                  <div class="flex flex-col gap-4 text-left">
                    <div>
                      {{ header.text }}
                    </div>
                  </div>
                </template>
                <template #header-employee="header">
                  <div class="flex flex-col gap-4 text-left">
                    <div>
                      {{ header.text }}
                    </div>
                  </div>
                </template>
                <template #header-employment_type="header">
                  <div class="flex flex-col gap-4 text-left">
                    <div>
                      {{ header.text }}
                    </div>
                  </div>
                </template>
                <template #header-department="header">
                  <div class="flex flex-col gap-4 text-left">
                    <div>
                      {{ header.text }}
                    </div>
                  </div>
                </template>
                <template #header-position="header">
                  <div class="flex flex-col gap-4 text-left">
                    <div>
                      {{ header.text }}
                    </div>
                  </div>
                </template>
                <template #item-actions="item">
                    <button
                    @click="viewItem(item)"
                    >
                      <Icon name="material-symbols:visibility-rounded" color="blue" class="w-5 h-5"/>
                    </button>
                </template>
          </EasyDataTable>
        </div>
  </template>
  
  
  <script setup lang="ts">
  import { Header, Item, SortType  } from "vue3-easy-data-table";
  
  const searchField = ["employee_id"];
  const searchValue = ref("");
  const itemsSelected = ref<Item[]>([]);
  
  const sortBy: any[] = ["employee_id", "employee","employment_type","department", "position"];
  const sortType: SortType[] = ["desc", "asc"];

  const headers: Header[] = [
        { text: "Employee ID", value: "employee_id", sortable: true },
        { text: "Employee", value: "employee", sortable: true },
        { text: "Employment Type", value: "employment_type", sortable: true },
        { text: "Department", value: "department", sortable: true },
        { text: "Position", value: "position", sortable: true },
        { text: "View Payslip", value: "actions" },
  ];
  
  const items: Item[any] = ref([
    {
        employee_id: "1111111111",
        employee: "Lorem 1",
        employment_type: "",
        department: "2",
        position: "Student Assistant",
    },
    {
        employee_id: "1111111112",
        employee: "Lorem 2",
        employment_type: "",
        department: "2",
        position: "Student Assistant",
    },
    {
        employee_id: "1111111113",
        employee: "Lorem 3",
        employment_type: "",
        department: "2",
        position: "Student Assistant",
    },
  ]);
  
  const deleted = (val: Item) =>{
    items.value.splice(val.key,1);      
  }
  
  
const viewItem = (item:any) => {
};

  </script>
  
  <style>
  .customize-table {
    --easy-table-header-item-padding: 10px 15px;
  }
  </style>