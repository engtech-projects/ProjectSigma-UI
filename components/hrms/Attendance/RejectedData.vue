<script setup>

const headers = [
  { text: "DATE", value: "date" },
  { text: "EMPBIOID", value: "empbioid" },
  { text: "LOGTYPE", value: "logtype" },
  { text: "TIME", value: "time" },
];

const items = [
  {
    date: "Employee-0011",
    empbioid: "Employee 11",
    logtype: "011511",
    time: "",
  },
  {
    date: "Employee-0012",
    empbioid: "Employee 12",
    logtype: "011512",
    time: "",
  },
  {
    date: "Employee-0013",
    empbioid: "Employee 13",
    logtype: "011513",
    time: "",
  },
  
  
];
</script>
<template>
  <div></div>
  <div class="border-2 border-gray-400 p-4 rounded-lg w-full space-y-3">
    <label for="" class="text-xl font-normal text-gray-900">Biometric Data</label>
    <div class="md:w-96">
      <label for="" class="text-sm italic font-normal text-gray-900 mb-4">Select Date</label>
        <DateRangePicker class="mb-4"/>
    </div>
      <Table
        :tbl-headers="headers"
        :tbl-items="items"/>
    </div>
</template>