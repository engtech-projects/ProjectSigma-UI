<script setup lang="ts">
definePageMeta({
  layout: 'default',
}),

useHead({
  title: 'Philhealth',
  meta: [
    { name: 'description', content: '' }
  ],
  
})


const headers = [
  { text: "Salary Bracket", value: "id" },
  { text: "Monthly Premium", value: "employee_name" },
  { text: "Actions", value: "biometric_id" },
];

const items = [
  {
    id: "Employee-0011",
    employee_name: "Employee 11",
    biometric_id: "<button></button>",
  },
  {
    id: "Employee-0011",
    employee_name: "Employee 11",
    biometric_id: "011510",
  },
  {
    id: "Employee-0011",
    employee_name: "Employee 11",
    biometric_id: "011510",
  },
  {
    id: "Employee-0011",
    employee_name: "Employee 11",
    biometric_id: "011510",
  },
  {
    id: "Employee-0011",
    employee_name: "Employee 11",
    biometric_id: "011510",
  },
  
];
</script>

<template>
  
  <div class="border-2 border-gray-400 p-4 rounded-lg w-full space-y-3">
    <form>
        <div class="grid gap-6 mb-6 md:grid-cols-1">
            <div>
              <label for="salary_bracket" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Salary Bracket</label>
              <div class="grid gap-6 mb-6 md:grid-cols-2">
                <div class="">
                    <label for="salary_bracket_start" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start</label>
                    <input type="text" id="salary_bracket_start" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required>
                  </div>
                  <div class="">
                    <label for="salary_bracket_end" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">End</label>
                    <input type="text" id="salary_bracket_end" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required>
                  </div>
                </div>
            </div>
            <div>
                <label for="monthly_premium" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Monthly Premium</label>
                <input type="text" id="monthly_premium" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required>
            </div>
        </div>
        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
    </form>
  </div>
  
  <div class="mt-10 border-2 border-gray-400 p-4 rounded-lg w-full space-y-3">
    <label for="" class="text-xl font-normal text-gray-900">Philhealth</label>
    <div>
      <label for="" class="text-sm italic font-normal text-gray-900">Employees with Philhealth accounts</label>
    </div>
      <Table
        :tbl-headers="headers"
        :tbl-items="items"
      />
  </div>
</template>