<template>
  <div class="p-2 w-full max-w-full bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-2 dark:bg-gray-800 dark:border-gray-700">
    <h5 class="text-xl font-medium text-gray-900 dark:text-white border-b">Employee Status</h5>
    
    <Table :tbl-headers="headers" :tbl-items="items"/>

  </div>
</template>


<script setup>
const headers = [
  { text: "EMPLOYEE ID", value: "employee_id" },
  { text: "EMPLOYEE NAME", value: "employee_name" },
  { text: "STATUS", value: "status" },
  { text: "UPDATED AT", value: "updated" },
];

const items = [
  { employee_id: "Employee-0011", employee_name: "John Doe", status: "3 Months", updated: "10/24/23"},
  { employee_id: "Employee-0012", employee_name: "John Does", status: "2 Months", updated: "10/24/23"},
  { employee_id: "Employee-0013", employee_name: "John Did", status: "3 Months", updated: "10/24/23"},
  { employee_id: "Employee-0014", employee_name: "John Didnt", status: "2 Months", updated: "10/24/23"},
  { employee_id: "Employee-0015", employee_name: "John One", status: "2 Months", updated: "10/24/23"},
  { employee_id: "Employee-0016", employee_name: "John Two", status: "2 Months", updated: "10/24/23"},
  { employee_id: "Employee-0017", employee_name: "John Three", status: "4 Months", updated: "10/24/23"},
  { employee_id: "Employee-0018", employee_name: "John Four", status: " Months", updated: "10/24/23"},
];
</script>
