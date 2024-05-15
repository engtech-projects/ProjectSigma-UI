<script setup>
import { storeToRefs } from "pinia"
import { useCashadvanceStore } from "@/stores/hrms/loansAndCash/cashadvance"

const cashadvances = useCashadvanceStore()
const { myRequestList: cashadvanceList } = storeToRefs(cashadvances)

const cashadvanceData = ref(null)
const showInformationModal = ref(false)

const showInformation = (data) => {
    cashadvanceData.value = data
    showInformationModal.value = true
}
const closeViewModal = () => {
    showInformationModal.value = false
}

const headers = [
    { name: "Employee Name", id: "employee.fullname_first" },
    { name: "Cash Advance Amount", id: "amount" },
    { name: "Terms", id: "terms_of_payment" },
    { name: "Installment Deduction", id: "installment_deduction" },
    { name: "Deduction Date start", id: "deduction_date_start" },
    { name: "Purpose", id: "purpose" },
]
const actions = {
    showTable: true,
}

const boardLoading = ref(false)

</script>

<template>
    <LayoutBoards title="My Requests" class="w-full" :loading="boardLoading">
        <div class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
            <LayoutPsTable
                :header-columns="headers"
                :actions="actions"
                :datas="cashadvanceList ?? []"
                @show-table="showInformation"
            />
        </div>
    </LayoutBoards>
    <div v-if="showInformationModal">
        <Teleport to="body">
            <div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70">
                <div class="bg-white p-4 w-8/12 h-4/5 mt-10 ml-64 gap-2 rounded-md overflow-auto absolute">
                    <div class="flex gap-2 justify-between p-2">
                        <p>Request Information</p>
                        <button
                            @click="closeViewModal"
                        >
                            <Icon name="cil:x" color="green" class="w-4 h-4 " />
                            Close
                        </button>
                    </div>
                    <div class="grid gap-2 md:justify-between">
                        <div class="p-2 flex gap-2">
                            <span class="text-gray-900 text-4xl">Employee Name {{ cashadvanceData.employee_id }}</span>
                        </div>
                    </div>
                    <div class="grid md:grid-cols-3 gap-2 md:justify-between">
                        <div class="p-2 flex gap-2">
                            <span class="text-teal-600 text-light"> Designation: </span> <span class="text-gray-900">{{ cashadvanceData.designation }}</span>
                        </div>
                        <div class="p-2 flex gap-2">
                            <span class="text-teal-600 text-light">Department: </span> {{ cashadvanceData.department_id }}
                        </div>
                        <div class="p-2 flex gap-2">
                            <span class="text-teal-600 text-light"> Project: </span> {{ cashadvanceData.project_id }}
                        </div>
                        <div class="p-2 flex gap-2">
                            <span class="text-teal-600 text-light"> Amount Requested: </span> {{ cashadvanceData.amount_requested }}
                        </div>
                        <div class="p-2 flex gap-2">
                            <span class="text-teal-600 text-light"> Amount Approved: </span> {{ cashadvanceData.amount_approved }}
                        </div>
                        <div class="p-2 flex gap-2">
                            <span class="text-teal-600 text-light"> Terms: </span> {{ cashadvanceData.terms_of_cash_advance }}
                        </div>
                        <div class="p-2 flex gap-2">
                            <span class="text-teal-600 text-light"> Remarks: </span> {{ cashadvanceData.remarks }}
                        </div>
                        <div class="p-2 flex gap-2">
                            <span class="text-teal-600 text-light"> Released by: </span> {{ cashadvanceData.released_by }}
                        </div>
                    </div>
                    <div class="w-full">
                        <LayoutApprovalsListView :approvals="cashadvanceData.approvals" />
                    </div>
                </div>
            </div>
        </Teleport>
    </div>
</template>
