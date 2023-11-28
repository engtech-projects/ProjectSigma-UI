<script setup>
  const category_headers = [
  { text: "ID", value: "id" },
  { text: "DEPARTMENT CATEGORY", value: "dept_category" },
  { text: "ACTION", value: "action" },
];

const category_items = [
  {
    id: "Department-0011",
    dept_category: "Department Sample 11",
    action: "10/24/23",
  },
  {
    id: "Department-0012",
    dept_category: "Department Sample 12",
    action: "10/24/23",
  },
  {
    id: "Department-0013",
    dept_category: "Department Sample 13",
    action: "10/24/23",
  },
  {
    id: "Department-0014",
    dept_category: "Department Sample 14",
    action: "10/24/23",
  },
  {
    id: "Department-0015",
    dept_category: "Department Sample 15",
    action: "10/24/23",
  },
  {
    id: "Department-0016",
    dept_category: "Department Sample 16",
    action: "10/24/23",
  },
  {
    id: "Department-0017",
    dept_category: "Department Sample 17",
    action: "10/24/23",
  },
  {
    id: "Department-0018",
    dept_category: "Department Sample 18",
    action: "10/24/23",
  },
];
</script>

<template>
  <div class="w-full">
      <details class="group border border-gray-200 shadow-md rounded-xl p-2">
        <summary
          class="flex cursor-pointer list-none items-center justify-between text-lg font-medium text-gray-900">
          <label for="eventTitle" class="text-lg font-medium">Add New Category</label>

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
                :class="{ 'rotate-180': isOpen2 }"
              />
            </svg>
          </div>
        </summary>
        <div class="pb-2 text-gray-500">
          <form action="">
            <div class="space-y-2">
              <label for="eventTitle" class="text-xs italic">Category Name</label>
              <input type="text" id="eventTitle" class="w-full rounded" />
            </div>
            <div class="flex justify-end">
              <button
                @click="addEvent"
                class="flex-1 text-white p-2 rounded bg-teal-600 content-center mt-5"
              >
                <Icon
                  name="material-symbols:category-outline-rounded"
                  class="mr-2"
                />Add Category
              </button>
            </div>
          </form>
          
          <div class="border-b w-full h-[14px] text-center p-3 mt-4 mb-7">
            <span class="text-sm bg-gray-50 text-black px-10 italic">
              Category List
            </span>
          </div>
          <div class="border-2 border-gray-400 p-2 rounded-lg bg-teal-100">
            <Table
              :tbl-headers="category_headers"
              :tbl-items="category_items"
            />
          </div>
        </div>
      </details>
    </div>
</template>