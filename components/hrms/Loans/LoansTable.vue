<template>
    <div class="mt-5 border-t-4 border-t-teal-400 edit-item w-full max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-6 overflow-auto ">
        <label for="" class="text-xl font-semibold text-gray-900">Loans List</label>
        <div class="mt-5 mb-6 ">
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
                            <Icon class="text-lg" name="mingcute:check-fill" color="teal" />
                        </button>
                        <button
                            @click="reject(item)"
                        >
                            <Icon class="text-lg" name="fa-solid:times" color="orange" />
                        </button>
                        <button
                            @click="payment(item)"
                        >
                            <Icon class="text-lg" name="mdi:cash" color="green" />
                        </button>
                        <button
                            @click="deleted(item)"
                        >
                            <Icon class="text-lg" name="mdi:trash" color="red" />
                        </button>
                    </div>
                </template>
            </EasyDataTable>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Header, Item } from "vue3-easy-data-table"

const headers: Header[] = [
    { text: "Employee Name", value: "employee_name" },
    { text: "Date Filed", value: "date_filed" },
    { text: "Loan Type", value: "loan_type" },
    { text: "Amount Loaned", value: "amt_loaned" },
    { text: "Terms", value: "repayment_term" },
    { text: "Deduction", value: "deduction" },
    { text: "Balance", value: "balance" },
    { text: "Status", value: "status" },
    { text: "Action", value: "actions" },
]

const items: Item[any] = ref([
    {
        employee_name: "Justin Time",
        date_filed: "2017-10-10",
        loan_type: "BDO",
        amt_loaned: "50,000",
        repayment_term: "Semi-monthly",
        deduction: "2,000",
        balance: "48,000.00",
        status: "Approved",
    },
    {
        employee_name: "Sue Flay",
        date_filed: "2017-10-10",
        loan_type: "BDO",
        amt_loaned: "50,000",
        repayment_term: "Semi-monthly",
        deduction: "2,000",
        balance: "48,000.00",
        status: "Approved",
    },
    {
        employee_name: "Russell Sprout",
        date_filed: "2017-10-10",
        loan_type: "BDO",
        amt_loaned: "50,000",
        repayment_term: "Semi-monthly",
        deduction: "2,000",
        balance: "48,000.00",
        status: "Approved",
    },
])

</script>

<style scoped>
.customize-table {
  --easy-table-header-item-padding: 10px 15px;
}
</style>
