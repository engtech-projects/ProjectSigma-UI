<script setup lang="ts">
definePageMeta({
  layout: 'default',
}),

useHead({
  title: 'Biometrics Account',
  meta: [
    { name: 'description', content: '' }
  ],
  
})


const headers = [
  { text: "Salary Bracket", value: "id" },
  { text: "Monthly Premium", value: "employee_name" },
  { text: "Actions", value: "biometric_id" },
];

const items = [
  {
    id: "Employee-0011",
    employee_name: "Employee 11",
    biometric_id: "<button></button>",
  },
  {
    id: "Employee-0011",
    employee_name: "Employee 11",
    biometric_id: "011510",
  },
  {
    id: "Employee-0011",
    employee_name: "Employee 11",
    biometric_id: "011510",
  },
  {
    id: "Employee-0011",
    employee_name: "Employee 11",
    biometric_id: "011510",
  },
  {
    id: "Employee-0011",
    employee_name: "Employee 11",
    biometric_id: "011510",
  },
  
];
</script>

<template>
  <div class="border-2 border-gray-400 p-4 rounded-lg w-full space-y-3">
    <label for="" class="text-xl font-normal text-gray-900">Biometric Accounts</label>
    <div>
      <label for="" class="text-sm italic font-normal text-gray-900">Employees with biometric accounts</label>
    </div>
      <Table
        :tbl-headers="headers"
        :tbl-items="items"
      />
    </div>
</template>