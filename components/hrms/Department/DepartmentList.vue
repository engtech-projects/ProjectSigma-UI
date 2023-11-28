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
  <div class="container mx-auto mt-2">
    <div class="w-full">
      <div class="divide-y divide-gray-100">
        <details class="group border border-gray-200 shadow-md rounded-xl p-2 mb-6" open>
          <summary
            class="flex cursor-pointer list-none items-center justify-between text-lg font-medium text-gray-900">
            <label for="eventTitle" class="text-lg font-medium">Department List</label>

            <div class="text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="block h-5 w-5 transition-all duration-300 group-open:rotate-180"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </div>
          </summary>
          <div class="pb-2 text-gray-500">
            <Table :tbl-headers="headers" :tbl-items="items" />
          </div>
        </details>
      </div>
    </div>
  </div>
</template>