<script setup>
  const headers = [
  { text: "EMPLOYEE NAME", value: "employee_name" },
  { text: "DEPARTMENT", value: "department_name" },
  { text: "ACTION TO BE TAKEN", value: "action_taken" },
  { text: "DATE FILED", value: "date_filed" },
];

const items = [
  {
    employee_name: "Juan Luna",
    department_name: "Accounting",
    action_taken: "BASIC SALARY",
    date_filed: "10/24/23",
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
  
];

</script>

<template>
  <div
    class="shadow-md p-4 mt-6 bg-white mb-3 border border-gray-200 rounded-lg w-full md:w-1/2">
   
      <div class="pb-2 text-gray-500">
        <Table :tbl-headers="headers" :tbl-items="items" />
      </div>
      

  </div>
  
</template>
