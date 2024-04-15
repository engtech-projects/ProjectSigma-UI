<template>
    <div class="mt-5 border-t-4 border-t-teal-400 edit-item w-full max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-6 overflow-auto ">
        <!-- <label for="" class="text-xl font-semibold text-gray-900">Loans List</label> -->
        <ul id="default-tab" class="flex flex-wrap justify-start -mb-px text-sm font-medium text-center" data-tabs-toggle="#default-tab-content" role="tablist">
            <li class="mr-2" role="presentation">
                <button
                    id="regular-tab"
                    class="inline-block p-4 rounded-t-lg"
                    data-tabs-target="#regular"
                    type="button"
                    role="tab"
                    aria-controls="regular"
                    aria-selected="false"
                >
                    Loans List
                </button>
            </li>
            <li class="mr-2" role="presentation">
                <button
                    id="irregular-tab"
                    class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                    data-tabs-target="#irregular"
                    type="button"
                    role="tab"
                    aria-controls="irregular"
                    aria-selected="false"
                >
                    Payments List
                </button>
            </li>
        </ul>
        <div id="default-tab-content">
            <div id="regular" class=" p-1 rounded-lg bg-gray-50 dark:bg-gray-800" role="tabpanel" aria-labelledby="regular-tab">
                <div class="mt-5 mb-6 ">
                    <EasyDataTable
                        class="mt-5"
                        table-class-name="customize-table"
                        :headers="headers"
                        :items="employeeList"
                    >
                        <template #item-actions="item">
                            <div class="flex flex-row gap-1">
                                <button
                                    @click="showDetails(item)"
                                >
                                    <Icon class="text-lg" name="iconoir:eye-empty" color="teal" />
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

            <div id="irregular" class=" p-1 rounded-lg bg-gray-50 dark:bg-gray-800" role="tabpanel" aria-labelledby="irregular-tab">
                <span>Empty</span>
            </div>
        </div>
        <ModalContainer
            title="Loan Details"
            :loading="isLoading"
            :local="true"
            :show="showModal"
            size="modal-lg"
            @hide="showModal=false"
        >
            <div class="flex flex-col gap-2">
                <div class="flex gap-4">
                    <div class="flex flex-1 flex-col gap-1">
                        <label for="" class="text-gray-500 text-sm">Employee Name</label>
                        <input type="text" class="border border-gray-200 bg-gray-100 rounded-md" :value="loan.fullName" disabled>
                    </div>
                    <div class="flex flex-1 flex-col gap-1">
                        <label for="" class="text-gray-500 text-sm">Date Filed</label>
                        <input type="text" class="border border-gray-200 bg-gray-100 rounded-md" :value="loan.date_filed" disabled>
                    </div>
                    <div class="flex flex-1 flex-col gap-1">
                        <label for="" class="text-gray-500 text-sm">Loan Amount</label>
                        <input type="text" class="border border-gray-200 bg-gray-100 rounded-md" :value="formatCurrency(loan.loan_amount)" disabled>
                    </div>
                </div>
                <div class="flex gap-4">
                    <div class="flex flex-1 flex-col gap-1">
                        <label for="" class="text-gray-500 text-sm">Loan Term Length</label>
                        <input type="text" class="border border-gray-200 bg-gray-100 rounded-md" :value="loan.terms_length" disabled>
                    </div>
                    <div class="flex flex-1 flex-col gap-1">
                        <label for="" class="text-gray-500 text-sm">Period Start</label>
                        <input type="text" class="border border-gray-200 bg-gray-100 rounded-md" :value="loan.period_start" disabled>
                    </div>
                    <div class="flex flex-1 flex-col gap-1">
                        <label for="" class="text-gray-500 text-sm">Period End</label>
                        <input type="text" class="border border-gray-200 bg-gray-100 rounded-md" :value="loan.period_end" disabled>
                    </div>
                </div>
                <div class="flex gap-4">
                    <div class="flex flex-1 flex-col gap-1">
                        <label for="" class="text-gray-500 text-sm">Deduction</label>
                        <input type="text" class="border border-gray-200 bg-gray-100 rounded-md" :value="formatCurrency(loan.installment_deduction)" disabled>
                    </div>
                    <div class="flex flex-1 flex-col gap-1" />
                    <div class="flex flex-1 flex-col gap-1" />
                </div>
                <!-- <div class="flex gap-4">

                </div> -->
                <div class="flex flex-col mt-6">
                    <div class="flex items-center justify-between border-b pb-2">
                        <label for="" class="text-md text-slate-700 font-bold">Payments List</label>
                        <button class="bg-green-500 rounded-md px-4 py-1 text-white hover:bg-green-600 active:bg-green-700">
                            <Icon name="iconoir:hand-card" class="font-bold text-xl" />
                            Make Payment
                        </button>
                    </div>
                    <table class="table w-full text-left mt-4">
                        <thead class="border-b">
                            <th class="py-2">
                                Amount Paid
                            </th>
                            <th class="py-2">
                                Date Paid
                            </th>
                            <th class="py-2">
                                Payment Type
                            </th>
                            <th class="py-2">
                                Posting Status
                            </th>
                            <th>Actions</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    2,000.00
                                </td>
                                <td>
                                    2024-04-15
                                </td>
                                <td>
                                    Payroll
                                </td>
                                <td>
                                    Not Posted
                                </td>
                                <td class="py-2">
                                    <div class="flex gap-3 items-center">
                                        <NuxtLink :to="'/hrms/setup/hmo/edit/' + 1">
                                            <Icon name="iconoir:edit" class="icon bg-green-400 rounded h-7 w-7 p-1 cursor-pointer hover:bg-green-500" />
                                        </NuxtLink>
                                        <Icon name="iconoir:trash" class="icon bg-red-400 rounded h-7 w-7 p-1 cursor-pointer hover:bg-red-500" />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </ModalContainer>
    </div>
</template>

<script setup lang="ts">
import { Header } from "vue3-easy-data-table"
import { useLoansStore } from "@/stores/hrms/loansAndCash/loans"
const utils = useUtilities()
const loansStore = useLoansStore()
await loansStore.getAllList()
const showModal = ref(true)
const loan = ref({})
const isLoading = ref(false)

const employeeList = computed(() => {
    const list = []
    if (loansStore.allList.data) {
        for (const i in loansStore.allList.data.data) {
            const item = loansStore.allList.data.data[i]
            item.fullName = item.employee.family_name + ", " + item.employee.first_name
            item.date_filed = utils.value.dateToString(new Date(item.created_at))
            list.push(item)
        }
    }
    return list
})

const headers: Header[] = [
    { text: "Employee Name", value: "fullName" },
    { text: "Date Filed", value: "date_filed" },
    { text: "Amount Loaned", value: "loan_amount" },
    { text: "Terms", value: "terms_length" },
    { text: "Deduction", value: "installment_deduction" },
    { text: "Action", value: "actions" },
]

const showDetails = (val) => {
    loan.value = val
    showModal.value = true
}

function formatCurrency (number: Number, locale = "en-US") {
    const formatter = new Intl.NumberFormat(locale, {
        style: "decimal",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })
    return formatter.format(number)
}

</script>

<style scoped>
.customize-table {
  --easy-table-header-item-padding: 10px 15px;
}
</style>
