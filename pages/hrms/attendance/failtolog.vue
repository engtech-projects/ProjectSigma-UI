<script setup lang="ts">
definePageMeta({
  layout: 'default',
}),

useHead({
  title: 'Fail to Log',
  meta: [
    { name: 'description', content: '' }
  ],

})

const headers = [
  { text: "ID", value: "id" },
  { text: "EMPLOYEE", value: "employee_name" },
  { text: "LOG DATE", value: "logdate" },
  { text: "TIME IN", value: "timein" },
  { text: "TIME OUT", value: "timeout" },
  { text: "REASON", value: "reason" },
];

const items = [
  {
    id: "Employee-0011",
    employee_name: "Employee 11",
    logdate: "10/24/23",
    timein: "10/24/23",
    timeout: "10/24/23",
    reason: "reason101",
  },
  {
    id: "Employee-0011",
    employee_name: "Employee 11",
    logdate: "10/24/23",
    timein: "10/24/23",
    timeout: "10/24/23",
    reason: "reason101",
  },
  {
    id: "Employee-0011",
    employee_name: "Employee 11",
    logdate: "10/24/23",
    timein: "10/24/23",
    timeout: "10/24/23",
    reason: "reason101",
  },
  {
    id: "Employee-0011",
    employee_name: "Employee 11",
    logdate: "10/24/23",
    timein: "10/24/23",
    timeout: "10/24/23",
    reason: "reason101",
  },
  {
    id: "Employee-0011",
    employee_name: "Employee 11",
    logdate: "10/24/23",
    timein: "10/24/23",
    timeout: "10/24/23",
    reason: "reason101",
  },
  
];
</script>

<template>
  <div class="mt-10 md:mt-0 md:flex gap-2">
    <HrmsAttendanceFailureToLogForm />

    <div class="shadow-md border border-gray-200 p-4 rounded-lg w-full">
      <label for="" class="text-xl font-normal text-gray-900">Log Failures Table</label>
        <Table
          :tbl-headers="headers"
          :tbl-items="items"
        />
    </div>
  </div>
</template>


