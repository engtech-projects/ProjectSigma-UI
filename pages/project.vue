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
      <div class="border-2 p-2 rounded-lg shadow w-full md:w-1/3 mb-4 ">
          <label for="eventTitle" class="text-2xl font-medium">Create Project</label>
          <div>
              <form action="" class="space-y-2 mt-4">
                  <div>
                      <label for="eventTitle">Project</label>
                      <input type="text"   id="eventTitle" class="w-full rounded"/>
                  </div>

                  <div class="flex justify-end">
                      <button @click="addEvent" class="flex-1 text-white p-2 rounded bg-cyan-800 content-center">
                          <Icon name="material-symbols:construction-rounded" class="mr-2"/>Add Project</button>
                  </div>
              </form>
          </div>
      </div>

      <div class="border-2 p-2 rounded-lg shadow col-span-2 w-full md:w-3/4 mb-4">
        <label for="eventTitle" class="text-2xl font-medium">Project List</label>
          <Table :tbl-headers="headers" :tbl-items="items"/>
      </div>
  </div>
  
</template>

