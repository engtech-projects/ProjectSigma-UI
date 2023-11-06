<script setup>
const headers = [
  { text: "ID", value: "id" },
  { text: "DEPARTMENT NAME", value: "name" },
  { text: "CREATED AT", value: "created" },
  { text: "UPDATED AT", value: "updated" },
];

const items = [
  {
    id: "Department-0011",
    name: "Department Sample 11",
    created: "10/24/23",
    updated: "10/24/23",
  },
  {
    id: "Department-0012",
    name: "Department Sample 12",
    created: "10/24/23",
    updated: "10/24/23",
  },
  {
    id: "Department-0013",
    name: "Department Sample 13",
    created: "10/24/23",
    updated: "10/24/23",
  },
  {
    id: "Department-0014",
    name: "Department Sample 14",
    created: "10/24/23",
    updated: "10/24/23",
  },
  {
    id: "Department-0015",
    name: "Department Sample 15",
    created: "10/24/23",
    updated: "10/24/23",
  },
  {
    id: "Department-0016",
    name: "Department Sample 16",
    created: "10/24/23",
    updated: "10/24/23",
  },
  {
    id: "Department-0017",
    name: "Department Sample 17",
    created: "10/24/23",
    updated: "10/24/23",
  },
  {
    id: "Department-0018",
    name: "Department Sample 18",
    created: "10/24/23",
    updated: "10/24/23",
  },
];
</script>
<template>
  <div class="p-2">
    <Table :tbl-headers="headers" :tbl-items="items" />
  </div>
</template>
