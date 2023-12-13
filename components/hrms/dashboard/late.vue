<template>
    <div class="w-full max-w-full bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-2 dark:bg-gray-800 dark:border-gray-700">
        <div class="flex flex-col justify-evenly gap-2">
            <h5 class="text-xl font-medium text-gray-900 dark:text-white border-b">
                Late This Month
            </h5>
            <div class="flex flex-row">
                <label class="" for="">Date Filter:</label>
                <VueDatePicker v-model="date" range class="z-15" ></VueDatePicker>
            </div>
        </div>
        <div class="overflow-auto min-h-96 max-h-96">
            <div class="grid grid-cols-4 justify-start mt-4 gap-4 p-2">
              <div v-for="(employee, index) in employees" :key="i0ndex" class="flex flex-col items-center">
                  <img class="rounded w-32 h-28 p-1" :src="employee.avatar" alt="Avatar">
                  <h3 class="text-sm sm:text-xs font-medium ">{{ employee.name }}</h3>
                  <h3 class="text-sm">Lates: {{ formatDate(employee.late) }}</h3>
                  <button type="submit" class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-xs w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                      Generate Memo
                  </button>
              </div>
            </div>
        </div>
    </div>
  </template>
  
  <script>
  import VueDatePicker from '@vuepic/vue-datepicker';
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
  