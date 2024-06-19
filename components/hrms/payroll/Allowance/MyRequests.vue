<script setup>
import { storeToRefs } from "pinia"
import { useGenerateAllowanceStore } from "@/stores/hrms/payroll/generateAllowance"

const genallowstore = useGenerateAllowanceStore()
const { myRequestList: generateAllowanceList } = storeToRefs(genallowstore)

const generateAllowanceData = ref(null)
const showInformationModal = ref(false)

const showInformation = (data) => {
    generateAllowanceData.value = data
    showInformationModal.value = true
}
const closeViewModal = () => {
    showInformationModal.value = false
}

const headers = [
    { name: "Charge Department", id: "charge_assignment.department_name" },
    { name: "Cutoff Start", id: "cutoff_start" },
    { name: "Cutoff End", id: "cutoff_end" },
    { name: "Allowance Date", id: "allowance_date" },
    { name: "Allowance Amount", id: "allowance_amount" },
    { name: "Total # of Day(s)", id: "total_days" },
    { name: "Total Amount", id: "total_amount" },
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
                :datas="generateAllowanceList ?? []"
                @show-table="showInformation"
            />
        </div>
    </LayoutBoards>
    <div v-if="showInformationModal">
        <Teleport to="body">
            <div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70">
                <LayoutBoards title="" class="bg-white p-4 w-4/5 mt-10 ml-64 gap-2 rounded-md overflow-auto absolute" :loading="boardLoading">
                    <div class="flex gap-2 justify-between p-2">
                        <p class="text-lg font-medium">
                            Request Information
                        </p>
                        <button
                            @click="closeViewModal"
                        >
                            <Icon name="cil:x" class="w-5 h-5 rounded-sm hover:text-white hover:bg-red-400" />
                        </button>
                    </div>
                    <!-- <div class="grid gap-2 md:justify-between">
                        <div class="p-2 flex gap-2">
                            <span class="text-gray-900 text-4xl">Project {{ generateAllowanceData.project_id }}</span>
                        </div>
                    </div>
                    <div class="grid md:grid-cols-3 gap-2 md:justify-between p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm">
                        <div class="p-2 flex gap-2">
                            <span class="text-teal-600 font-medium "> Requesting Office: </span> <span class="text-gray-900">{{ generateAllowanceData.charge_assignment.department_name }}</span>
                        </div>
                        <div class="p-2 flex gap-2">
                            <span class="text-teal-600 font-medium">Cutoff Start: </span> {{ generateAllowanceData.cutoff_start }}
                        </div>
                        <div class="p-2 flex gap-2">
                            <span class="text-teal-600 font-medium">Cutoff End: </span> {{ generateAllowanceData.cutoff_end }}
                        </div>
                        <div class="p-2 flex gap-2">
                            <span class="text-teal-600 font-medium">Allowance Date: </span> {{ generateAllowanceData.allowance_date }}
                        </div>
                        <div class="p-2 flex gap-2">
                            <span class="text-teal-600 font-medium">Allowance Amount: </span> {{ generateAllowanceData.allowance_amount }}
                        </div>
                        <div class="p-2 flex gap-2">
                            <span class="text-teal-600 font-medium">Total # of Day(s): </span> {{ generateAllowanceData.total_days }}
                        </div>
                        <div class="p-2 flex gap-2">
                            <span class="text-teal-600 font-medium">Total Amount: </span> {{ generateAllowanceData.total_amount }}
                        </div>
                    </div> -->
                    <HrmsPayrollAllowanceEmployeeTable prop-title="Request for Allowance" :prop-data="generateAllowanceData"/>
                    <div class="w-full">
                        <LayoutApprovalsListView :approvals="generateAllowanceData.approvals" />
                    </div>
                </LayoutBoards>
            </div>
        </Teleport>
    </div>
</template>
