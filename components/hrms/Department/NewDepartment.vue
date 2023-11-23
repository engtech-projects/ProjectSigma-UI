<script setup>
  
</script>

<template>
  <div class="w-full">
    <details class="group border-2 border-gray-400 rounded-xl p-2">
      <summary
        class="flex cursor-pointer list-none items-center justify-between text-lg font-medium text-gray-900"
      >
        <label for="eventTitle" class="text-lg font-medium"
          >Add New Department</label
        >

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
        <form action="">
          <div class="space-y-2">
            <label for="eventTitle" class="text-xs italic">Department Name</label>
            <input type="text" id="eventTitle" class="w-full rounded" />
          </div>

          <div class="flex justify-end">
            <button
              @click="addEvent"
              class="flex-1 text-white p-2 rounded bg-cyan-800 content-center mt-5"
            >
              <Icon name="mingcute:department-fill" class="mr-2" />Add
              Department
            </button>
          </div>
        </form>
      </div>
    </details>
  </div>
  

    
</template>