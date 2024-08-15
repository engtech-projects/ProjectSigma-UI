<script setup lang="ts">
import { useGeneratePayrollStore } from "@/stores/hrms/payroll/generatePayroll"
const genpayrollstore = useGeneratePayrollStore()
const snackbar = useSnackbar()
const { payrollDraft } = storeToRefs(genpayrollstore)

const payrollTemplateRef = ref<HTMLElement | null>(null)
const printDraft = () => {
    if (payrollTemplateRef.value) {
        const printWindow = window.open("", "", "height=600,width=800")
        printWindow.document.write("<html><head><title>Print Payroll Draft</title>")
        printWindow.document.write("<style>")
        printWindow.document.write(`
            @media print {
                body { font-family: Arial, sans-serif; }
                table { width: 100%; border-collapse: collapse; }
                th, td { border: 1px solid black; padding: 8px; text-align: center; }
                .text-gray-900 { color: #111827; }
                .text-gray-800 { color: #1f2937; }
                .text-gray-950 { color: #1e293b; }
                .header { text-align: center; margin-bottom: 20px; }
                .details { margin-top: 40px; display: flex; justify-content: start; }
                .details div { flex: 1; text-align: left; }
                .signatures { margin-top: 40px; display: flex; justify-content: space-between; }
                .signatures div { flex: 1; text-align: center; }
                .print\\:hidden { display: none; }
            }
        `)
        printWindow.document.write("</style>")
        printWindow.document.write("</head><body>")
        printWindow.document.write(`
            <div class="header">
                <h1>EVENPAR CONSTRUCTION AND DEVELOPMENT CORPORATION</h1>
                <div class="details">
            </div>
            ${payrollTemplateRef.value.outerHTML}
            <div class="signatures">
        `)
        printWindow.document.write("</body></html>")
        printWindow.document.close()
        printWindow.print()
    }
}

const savePayroll = async () => {
    try {
        await genpayrollstore.createPayrollRequest()
        snackbar.add({
            type: "success",
            text: "Successfully saved payroll request."
        })
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
    <div ref="payrollTemplateRef" class="bg-white w-full shadow overflow-hidden sm:rounded-lg">
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
            <div class="relative overflow-x-auto shadow-md">
                <HrmsPayrollSalaryPayrollInfoTable :payroll-request="payrollDraft" />
            </div>
            <div class="relative overflow-x-auto shadow-md">
                <HrmsPayrollSalaryChargingTable :payroll-request="payrollDraft" />
            </div>
        </div>
    </div>
    <div class="mt-2">
        <div class="flex flex-row justify-end gap-2">
            <div>
                <button type="submit" class="text-white bg-yellow-400 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-yellow-300 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800" @click="printDraft">
                    Print Draft
                </button>
            </div>
            <div>
                <button
                    type="submit"
                    class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    @click="savePayroll()"
                >
                    Submit
                </button>
            </div>
        </div>
        <PsModal v-model:show-modal="showEditModal">
            <template #body>
                <HrmsPayrollEditGeneratepayrollInformation />
            </template>
        </PsModal>
    </div>
</template>
