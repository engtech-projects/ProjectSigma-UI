<template>
  <div class="mt-5 edit-item w-full max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-6 overflow-auto" >
      <label for="" class="text-xl font-semibold text-gray-900">Cash Advances List</label>
      <div class="mt-5 mb-6">
        <EasyDataTable
                class="mt-5"
                table-class-name="customize-table"
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
                    @click="payment(item)"
                    >
                      <Icon class="text-lg" name="mdi:cash" />
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
      { text: "Requested Amount", value: "requested_amt" },
      { text: "Purpose", value: "purpose" },
      { text: "Repayment Term", value: "repayment_term" },
      { text: "Repayment Start.", value: "repayment_start" },
      { text: "Repayment Amount", value: "repayment_amt" },
      { text: "Balance", value: "balance" },
      { text: "Status", value: "status" },
      { text: "Action", value: "actions" },
];

const items: Item[any] = ref([
  {
    employee_name: "Miles A. Head",
    date_filed: "2017-10-10",
    requested_amt: "2,000.00",
    purpose: "medicine",
    repayment_term: "Semi-monthly",
    repayment_start: "2017-09-22 08:00:00",
    repayment_amt: "500",
    balance: "1,000.00",
    status: "Approved",
  },
  {
    employee_name: "Robin Banks",
    date_filed: "2017-10-10",
    requested_amt: "2,000.00",
    purpose: "medicine",
    repayment_term: "Semi-monthly",
    repayment_start: "2017-09-22 08:00:00",
    repayment_amt: "500",
    balance: "1,000.00",
    status: "Approved",
  },
  {
    employee_name: "Faye Kinnitt",
    date_filed: "2017-10-10",
    requested_amt: "2,000.00",
    purpose: "medicine",
    repayment_term: "Semi-monthly",
    repayment_start: "2017-09-22 08:00:00",
    repayment_amt: "500",
    balance: "1,000.00",
    status: "Approved",
  },
])

const approved = (val: Item) =>{
}

const deleted = (val: Item) =>{
}

const payment = (val: Item) =>{
}

const reject = (val: Item) => {
}
</script>

<style>
.customize-table {
  --easy-table-header-item-padding: 10px 15px;
}
</style>