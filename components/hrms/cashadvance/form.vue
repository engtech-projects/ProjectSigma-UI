<template>
  <div class="mt-5 edit-item w-full max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-6 overflow-auto" >
    <h5 class="text-xl font-extrabold dark:text-white">Cash Advance Request Form</h5>
    <div class="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2">
      <div>
        <label for="date_fill" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
        <input type="date" id="date_fill" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
      </div>
      <div>
        <label for="employee_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Employee Name</label>
        <input type="text" id="employee_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
      </div>  
    </div>
    <div class="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label for="position" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Position</label>
          <input disabled readonly type="text" id="position" class="cursor-not-allowed bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required>
        </div>
        <div>
          <label for="department" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Department</label>
          <input disabled readonly type="text" id="department" class="cursor-not-allowed bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
        </div>
    </div>
    <div class="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label for="position" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount Requested</label>
          <input type="number" id="position" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
        </div>
        <div>
          <label for="department" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount Approved</label>
          <input type="number" id="department" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
        </div>
    </div>
    <div class="mt-5">
        <div>
          <label for="position" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Purpose/Reason(s)</label>
          <textarea id="position" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=""></textarea>
        </div>
    </div>
    <div class="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label for="repayment_sched" class="block mb-2 text-md font-bold text-gray-900 dark:text-white">Repayment Schedule</label>
          <label for="first_name" class="block mb-2 text-md font-medium text-gray-900 dark:text-white">Terms</label>
          <div class="flex flex-col">
            <div class="mt-5 flex flex-wrap items-center mb-4 gap-3">
              <input id="leave-availment-1" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
              <label for="leave-availment-1" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Monthly</label>
            </div>
            <div class="flex items-center mb-4 gap-3">
              <input id="leave-availment-1" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
              <label for="leave-availment-1" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Semi-monthly</label>
            </div>
          </div>
        </div>
        <div class="flex flex-col">
          <div>
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Payroll Deduction:</label>
            <input type="date" id="repayment_sched" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
          </div>
          <div class="mt-5">
            <label for="amt" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount</label>
            <input type="number" id="amt" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
          </div>
        </div>
    </div>
    <div class="max-w-full flex flex-row-reverse mt-5">
      <button @click="submitAdd" type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add</button>
    </div>
  </div>
</template>


<script setup lang="ts">
const submitAdd = () => {
};
</script>