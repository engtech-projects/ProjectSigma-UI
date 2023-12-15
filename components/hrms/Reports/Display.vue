<template>
    <div>
      <div class="md:grid grid-cols-4 gap-4 mt-5">
        <select v-model="selectedReport" id="report" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
            <option value="" disabled selected>Select Report</option>
            <option value="Report1">Report 1</option>
            <option value="Report2">Report 2</option>
            <option value="Report3">Report 3</option>
            <option value="Report4">Report 4</option>
            <option value="Report5">Report 5</option>
        </select>
        
        <VueDatePicker v-model="month" month-picker class="rounded-lg" placeholder="Select Month" ></VueDatePicker>
        <VueDatePicker v-model="year" year-picker class="rounded-lg" placeholder="Select Year"></VueDatePicker>
      
        <button @click="generateReport" type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Generate Report</button>
        
      </div>
      
      
    </div>

    <div class="mt-5 mb-6 border border-slate-300 rounded-lg p-2">
      <div class="text-2xl font-normal mb-4 mt-0 ">
        {{ selectedReport ? `${selectedReport} - ${monthNames[month.month]} - ${year}` : '' }}
      </div>
        <EasyDataTable
          class="mt-5"
          table-class-name="customize-table"
          :headers="headers"
          :items="items">
        </EasyDataTable>
      
      </div>
      <button @click="print" class="flex justify-end ml-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><Icon name="ic:baseline-local-printshop" class="w-4 h-4 " fill="currentColor"/>Print Report</button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { Header, Item } from "vue3-easy-data-table";


const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const month = ref({
  month: new Date().getMonth(),
  year: new Date().getFullYear()
});

const year = ref(new Date().getFullYear());

const headers: Header[] = [
  { text: "Employee Name", value: "employee_name" },
  { text: "Date Filed", value: "date_filed" },
  { text: "Loan Type", value: "loan_type" },
  { text: "Amount Loaned", value: "amt_loaned" },
  { text: "Terms", value: "repayment_term" },
  { text: "Deduction", value: "deduction" },
  { text: "Balance", value: "balance" },
  { text: "Status", value: "status" },
];

const items: Item[any] = ref([
  {
    employee_name: "Lorem 1",
    date_filed: "2017-10-10",
    loan_type: "BDO",
    amt_loaned: "50,000",
    repayment_term: "Semi-monthly",
    deduction: "2,000",
    balance: "48,000.00",
    status: "Approved",
  },
  {
    employee_name: "Lorem 1",
    date_filed: "2017-10-10",
    loan_type: "BDO",
    amt_loaned: "50,000",
    repayment_term: "Semi-monthly",
    deduction: "2,000",
    balance: "48,000.00",
    status: "Approved",
  },
  {
    employee_name: "Lorem 1",
    date_filed: "2017-10-10",
    loan_type: "BDO",
    amt_loaned: "50,000",
    repayment_term: "Semi-monthly",
    deduction: "2,000",
    balance: "48,000.00",
    status: "Approved",
  },
])


const print = () => {
  window.print();
}



</script>

