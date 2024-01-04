<script setup>
const headers = [
      { text: "ID", value: "id" },
      { text: "PROJECT NAME", value: "name" },
      { text: "CREATED AT", value: "created" },
      { text: "UPDATED AT", value: "updated" },
  ]

const items = [
    { id: "Project-0011", name: "Project Sample 11", created: "10/24/23", updated: "10/24/23"},
    { id: "Project-0012", name: "Project Sample 12", created: "10/24/23", updated: "10/24/23"},
    { id: "Project-0013", name: "Project Sample 13", created: "10/24/23", updated: "10/24/23"},
    { id: "Project-0014", name: "Project Sample 14", created: "10/24/23", updated: "10/24/23"},
    { id: "Project-0015", name: "Project Sample 15", created: "10/24/23", updated: "10/24/23"},
    { id: "Project-0016", name: "Project Sample 16", created: "10/24/23", updated: "10/24/23"},
    { id: "Project-0017", name: "Project Sample 17", created: "10/24/23", updated: "10/24/23"},
    { id: "Project-0018", name: "Project Sample 18", created: "10/24/23", updated: "10/24/23"},
  ]

definePageMeta({
  layout: 'default',
}),

useHead({
  title: 'Project',
  meta: [
    { name: 'description', content: '' }
  ],
  
})


</script>



<template>
  <div class="mt-10 md:flex gap-2">
      <HrmsProjectCreateEmployee />

      <HrmsProjectAssign />

      <HrmsProjectAttendanceScheduleForm />

      <!-- <div class="border-2 p-2 rounded-lg shadow col-span-2 w-full md:w-3/4 mb-4">
        <label for="eventTitle" class="text-2xl font-medium">Project List</label>
          <Table :tbl-headers="headers" :tbl-items="items"/>
      </div> -->
  </div>
  
</template>

