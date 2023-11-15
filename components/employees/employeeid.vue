<template>
  <div class="col-span-3">
    <label for="employee_id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Generate Employee ID</label>
    <div class="relative w-full">
      <input
        type="text"
        id="employee_id"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Employee ID"
        v-model="employeeId"
        required
      >
      <button
        type="submit"
        class="absolute top-0 right-0 p-2.5 h-full w-24 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover-bg-blue-700 dark:focus:ring-blue-800 flex items-center"
        @click="generateEmployeeID"
        :disabled="employeeId !== ''"
      >
        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>
        <span class="ml-1">New ID</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      employeeId: '', // Store the generated employee ID
      employeeCounter: 1, // Initial employee counter
    };
  },
  methods: {
    generateEmployeeID() {
      // Generate a chronological employee ID
      this.employeeId = `EVENPAR-${String(this.employeeCounter).padStart(4, '0')}`;
      this.employeeCounter++; // Increment the counter for the next employee
    },
  },
};
</script>
