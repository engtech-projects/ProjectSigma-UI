<template>
    <div class="mt-5 edit-item w-full max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-6 overflow-auto" >
        <h5 class="text-xl font-extrabold dark:text-white">Generate Payroll List</h5>
        <div class="mt-5 mb-6">
          <EasyDataTable
                  class="mt-5"
                  table-class-name="customize-table"
                  :headers="headers"
                  :items="items"
                >
                <template #item-actions="item">
                    <div class="flex flex-row gap-1">
                      <button
                      @click="deleted(item)"
                      >
                        <Icon class="text-lg" name="mdi:trash" />
                      </button>
                    </div>
                </template>
          </EasyDataTable>
        </div>
      </div>
  </template>
  
  
  <script setup lang="ts">
  import { Header, Item } from "vue3-easy-data-table";
  
  const headers: Header[] = [
        { text: "Employee ID", value: "employee_id" },
        { text: "Employee", value: "employee" },
        { text: "Employment Type", value: "employment_type" },
        { text: "Department", value: "department" },
        { text: "Position", value: "position" },
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
  
  </script>
  
  <style>
  .customize-table {
    --easy-table-header-item-padding: 10px 15px;
  }
  </style>