<script setup>

const headers = [
  { text: "ID", value: "id" },
  { text: "EMPLOYEE", value: "employee_name" },
  { text: "BIOMETRIC ID", value: "biometric_id" },
  { text: "QR CODE", value: "qrcode" },
];

const items = [
  {
    id: "Employee-0011",
    employee_name: "Employee 11",
    biometric_id: "011510",
    qrcode: "",
  },
  {
    id: "Employee-0011",
    employee_name: "Employee 11",
    biometric_id: "011510",
    qrcode: "",
  },
  {
    id: "Employee-0011",
    employee_name: "Employee 11",
    biometric_id: "011510",
    qrcode: "",
  },
  {
    id: "Employee-0011",
    employee_name: "Employee 11",
    biometric_id: "011510",
    qrcode: "",
  },
  {
    id: "Employee-0011",
    employee_name: "Employee 11",
    biometric_id: "011510",
    qrcode: "",
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