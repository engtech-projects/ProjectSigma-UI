<template>
  <div class="w-full max-w-full bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-2 dark:bg-gray-800 dark:border-gray-700 h-96 overflow-auto">
    <h5 class="text-xl font-medium text-gray-900 dark:text-white border-b">Birthdays This Month</h5>
    <div class="grid grid-cols-4 justify-start mt-4 gap-4">
      <div v-for="(employee, index) in employees" :key="i0ndex" class="flex flex-col items-center">
        <img class="rounded w-32 h-28 p-1" :src="employee.avatar" alt="Avatar">
        <h3 class="text-sm sm:text-xs font-medium ">{{ employee.name }}</h3>
        <h3 class="text-xs font-thin">{{ formatDate(employee.birthdate) }}</h3>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    employees: Array, // An array of employee objects with properties: name, avatar, birthdate
  },
  methods: {
    formatDate(date) {
      const options = { month: 'long', day: 'numeric', year: 'numeric' };
      return new Date(date).toLocaleDateString(undefined, options);
    },
  },
};
</script>
