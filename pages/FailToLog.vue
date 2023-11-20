<script setup lang="ts">
definePageMeta({
  layout: 'default',
}),

useHead({
  title: 'Fail to LogIn/LogOut',
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
    reason: "10/24/23",
  },
  {
    id: "Employee-0012",
    employee_name: "Employee 12",
    logdate: "10/24/23",
    timein: "10/24/23",
    timeout: "10/24/23",
    reason: "10/24/23",
  },
  {
    id: "Employee-0013",
    employee_name: "Employee 13",
    logdate: "10/24/23",
    timein: "10/24/23",
    timeout: "10/24/23",
    reason: "10/24/23",
  },
  {
    id: "Employee-0014",
    employee_name: "Employee 14",
    logdate: "10/24/23",
    timein: "10/24/23",
    timeout: "10/24/23",
    reason: "10/24/23",
  },
  {
    id: "Employee-0015",
    employee_name: "Employee 15",
    logdate: "10/24/23",
    timein: "10/24/23",
    timeout: "10/24/23",
    reason: "10/24/23",
  },
  {
    id: "Employee-0016",
    employee_name: "Employee 16",
    logdate: "10/24/23",
    timein: "10/24/23",
    timeout: "10/24/23",
    reason: "10/24/23",
  },
  {
    id: "Employee-0017",
    employee_name: "Employee 17",
    logdate: "10/24/23",
    timein: "10/24/23",
    timeout: "10/24/23",
    reason: "10/24/23",
  },
  {
    id: "Employee-0018",
    employee_name: "Employee 18",
    logdate: "10/24/23",
    timein: "10/24/23",
    timeout: "10/24/23",
    reason: "10/24/23",
  },
];
</script>

<template>
  <div class="mt-10 md:flex gap-2">
    <HrmsAttendanceFailureToLogForm />

    <div class="border-2 border-gray-400 p-4 rounded-lg w-full">
      <label for="" class="text-xl font-normal text-gray-900">Log Failures Table</label>
        <Table
          :tbl-headers="headers"
          :tbl-items="items"
        />
      </div>
  </div>
</template>


