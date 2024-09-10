<script setup lang="ts">
import { useGeneratePayrollStore } from "@/stores/hrms/payroll/generatePayroll"
const showModal = defineModel("showModal", { required: false, type: Boolean })
const genpayrollstore = useGeneratePayrollStore()
const snackbar = useSnackbar()
const { payrollDraft } = storeToRefs(genpayrollstore)

const savePayroll = async () => {
    try {
        await genpayrollstore.createPayrollRequest()
        snackbar.add({
            type: "success",
            text: "Successfully saved payroll request."
        })
        showModal.value = false
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error
        })
    }
}

const showEditModal = ref(false)
const showEdit = () => {
    showEditModal.value = true
}

</script>
<template>
    <div class="bg-white w-full shadow overflow-hidden sm:rounded-lg">
        <LayoutPrint print-button-title="Print Draft">
            <div class="details flex flex-cols justify-between p-2 sm:px-2 bg-sky-100 border-b-4 border-red-500">
                <div class="sticky top-0 text-xl leading-6 font-normal text-gray-900 uppercase">
                    {{ payrollDraft.release_type.toUpperCase() }}
                </div>
                <div class="sticky top-0 text-xl leading-6 font-normal text-gray-900">
                    Payroll
                </div>
            </div>
            <div class="border-t border-gray-200">
                <div class="flex justify-between p-2">
                    <div class="text-md leading-6 font-medium text-gray-900">
                        {{ payrollDraft.group_type }}: <strong>{{ payrollDraft.group_type === 'Department' ? payrollDraft.department.department_name : payrollDraft.project.project_code }}</strong>
                    </div>
                    <div class="text-md leading-6 font-medium text-gray-900">
                        Period Covered: <strong>{{ useFormatDateRange(payrollDraft.cutoff_start, payrollDraft.cutoff_end) }}</strong>
                    </div>
                    <div class="hover:text-slate-400 print:hidden" hidden @click="showEdit">
                        <button
                            title="Edit Draft"
                            type="submit"
                            class="flex-auto justify-center gap-2 shadow-sm text-sm"
                        >
                            <Icon name="material-symbols:edit-square-outline-rounded" class="h-7 w-7 text-green-500 hover:text-green-400" />
                        </button>
                    </div>
                </div>
            </div>
            <div>
                <div class="relative print:overflow-visible overflow-x-auto shadow-md">
                    <HrmsPayrollSalaryPayrollInfoTable :payroll-request="payrollDraft" />
                </div>
            </div>
        </LayoutPrint>
    </div>
    <div class="relative overflow-x-auto shadow-md">
        <HrmsPayrollSalaryChargingTable :payroll-request="payrollDraft" />
    </div>
    <div class="mt-2">
        <div class="flex flex-row justify-end gap-2">
            <button
                type="submit"
                class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                @click="savePayroll()"
            >
                Submit
            </button>
        </div>
    </div>
</template>
