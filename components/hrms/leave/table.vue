<template>
  <div class="mt-5 edit-item w-full max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-6 overflow-auto" >
      <h5 class="text-xl font-extrabold dark:text-white">Leave List</h5>
      <div class="mt-5 mb-6">
        <div class="inline-flex rounded-md shadow-sm" role="group">
          <button type="button" class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
            <svg class="w-3 h-3 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
            </svg>
            Print
          </button>
          <button type="button" class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
            <svg class="w-3 h-3 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2"/>
            </svg>
            Excel
          </button>
          <button type="button" class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
            <svg class="w-3 h-3 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z"/>
              <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/>
            </svg>
            PDF
          </button>
        </div>
      </div>
      <div class="mt-5 mb-6">
        <EasyDataTable
                class="mt-5"
                :headers="headers"
                :items="items"
              >
              <template #item-actions="item">
                  <div class="flex flex-row gap-1">
                    <button
                    @click="approved(item)"
                    >
                      <Icon class="text-lg" name="mingcute:check-fill" />
                    </button>
                    <button
                    @click="reject(item)"
                    >
                      <Icon class="text-lg" name="fa-solid:times" />
                    </button>
                    <button
                    @click="deleted(item)"
                    >
                      <Icon class="text-lg" name="mdi:trash" />
                    </button>
                  </div>
              </template>
        </EasyDataTable>
      </div>
    </div>
</template>


<script setup lang="ts">
import { Header, Item } from "vue3-easy-data-table";

const headers: Header[] = [
      { text: "Employee Name", value: "employee_name" },
      { text: "Date Filed", value: "date_filed" },
      { text: "Leave Availed", value: "leave_availed" },
      { text: "Date From", value: "date_from" },
      { text: "Date To", value: "date_to" },
      { text: "No. of Days", value: "no_days" },
      { text: "No. of Hours", value: "no_hours" },
      { text: "Pay", value: "pay" },
      { text: "Reasons/Remarks", value: "reason_remarks" },
      { text: "Status", value: "status" },
      { text: "Action", value: "actions" },
];

const items: Item[any] = ref([
  {
    employee_name: "Lorem 1",
    date_filed: "2017-10-10",
    leave_availed: "Travel",
    date_from: "2017-09-22 08:00:00",
    date_to: "2017-09-22 17:00:00",
    no_days: "1.00",
    no_hours: "8.00",
    pay: "With Pay",
    reason_remarks: "went to davao",
    status: "Approved",
  },
  {
    employee_name: "Lorem 1",
    date_filed: "2017-10-10",
    leave_availed: "Travel",
    date_from: "2017-09-22 08:00:00",
    date_to: "2017-09-22 17:00:00",
    no_days: "1.00",
    no_hours: "8.00",
    pay: "With Pay",
    reason_remarks: "went to davao",
    status: "Approved",
  },
  {
    employee_name: "Lorem 1",
    date_filed: "2017-10-10",
    leave_availed: "Travel",
    date_from: "2017-09-22 08:00:00",
    date_to: "2017-09-22 17:00:00",
    no_days: "1.00",
    no_hours: "8.00",
    pay: "With Pay",
    reason_remarks: "went to davao",
    status: "Approved",
  },
  {
    employee_name: "Lorem 1",
    date_filed: "2017-10-10",
    leave_availed: "Travel",
    date_from: "2017-09-22 08:00:00",
    date_to: "2017-09-22 17:00:00",
    no_days: "1.00",
    no_hours: "8.00",
    pay: "With Pay",
    reason_remarks: "went to davao",
    status: "Approved",
  },
  {
    employee_name: "Lorem 1",
    date_filed: "2017-10-10",
    leave_availed: "Travel",
    date_from: "2017-09-22 08:00:00",
    date_to: "2017-09-22 17:00:00",
    no_days: "1.00",
    no_hours: "8.00",
    pay: "With Pay",
    reason_remarks: "went to davao",
    status: "Approved",
  },
  {
    employee_name: "Lorem 1",
    date_filed: "2017-10-10",
    leave_availed: "Travel",
    date_from: "2017-09-22 08:00:00",
    date_to: "2017-09-22 17:00:00",
    no_days: "1.00",
    no_hours: "8.00",
    pay: "With Pay",
    reason_remarks: "went to davao",
    status: "Approved",
  },
  {
    employee_name: "Lorem 1",
    date_filed: "2017-10-10",
    leave_availed: "Travel",
    date_from: "2017-09-22 08:00:00",
    date_to: "2017-09-22 17:00:00",
    no_days: "1.00",
    no_hours: "8.00",
    pay: "With Pay",
    reason_remarks: "went to davao",
    status: "Approved",
  },
]);

const approved = (val: Item) =>{
}

const deleted = (val: Item) =>{
}

const reject = (val: Item) => {
};
</script>