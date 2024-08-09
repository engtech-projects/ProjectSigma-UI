<script setup lang="ts">
import { useGeneratePayrollStore } from "@/stores/hrms/payroll/generatePayroll"
const genpayrollstore = useGeneratePayrollStore()
const snackbar = useSnackbar()
const boardLoading = ref(false)
const { payrollDraft } = storeToRefs(genpayrollstore)

const loanTypes = ref([])
const cashAdvances = ref([])
const otherDeductions = ref([])
const formatDateRange = (start: string, end: string) => {
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]

    const startDate = new Date(start)
    const endDate = new Date(end)

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        return "-"
    }

    const startDay = startDate.getDate()
    const startMonth = months[startDate.getMonth()]

    const endDay = endDate.getDate()
    const endMonth = months[endDate.getMonth()]
    const endYear = endDate.getFullYear()

    if (startMonth === endMonth) {
        return `${startMonth} ${startDay}-${endDay}, ${endYear}`
    } else {
        return `${startMonth} ${startDay}-${endMonth} ${endDay}, ${endYear}`
    }
}

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
        await genpayrollstore.createRequest()
        snackbar.add({
            type: "success",
            text: "Successfully Saved Payroll Request"
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
const closeViewModal = () => {
    showEditModal.value = false
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
                    Period Covered: <strong>{{ formatDateRange(payrollDraft.cutoff_start, payrollDraft.cutoff_end) }}</strong>
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
                <table class="w-full text-sm text-center text-gray-50 pb-4">
                    <thead
                        class="text-xs text-black uppercase bg-sky-50 dark:bg-gray-950"
                    >
                        <tr>
                            <th
                                scope="col"
                                rowspan="3"
                                class="p-2 border-solid border border-slate-400"
                            >
                                No
                            </th>
                            <th
                                scope="col"
                                colspan="2"
                                class="p-2 border-solid border border-slate-400 bg-sky-200"
                            >
                                Name
                            </th>
                            <th
                                scope="col"
                                rowspan="3"
                                class="p-2 border-solid border border-slate-400 bg-sky-200"
                            >
                                Designation
                            </th>
                            <th
                                scope="col"
                                rowspan="3"
                                class="p-4 border-solid border border-slate-400 bg-sky-200"
                            >
                                Salary Grade
                            </th>
                            <th
                                scope="col"
                                colspan="8"
                                class="p-2 border-solid border border-slate-400 bg-sky-200"
                            >
                                Hrs. Worked
                            </th>
                            <th
                                scope="col"
                                :colspan="9"
                                class="p-2 border-solid border border-slate-400 bg-sky-200"
                            >
                                Gross Pay
                            </th>
                            <th
                                scope="col"
                                rowspan="3"
                                class="px-6 border-solid border border-slate-400 bg-sky-200"
                            >
                                Total Gross Pay
                            </th>
                            <th
                                scope="col"
                                :colspan="6 + loanTypes.length + cashAdvances.length + otherDeductions.length"
                                class="p-2 border-solid border border-slate-400 bg-sky-200"
                            >
                                Salary Deduction
                            </th>
                            <th
                                scope="col"
                                rowspan="3"
                                class="px-2 py-3 border-solid border border-slate-400 bg-sky-200"
                            >
                                Total Deduction
                            </th>
                            <th
                                scope="col"
                                rowspan="3"
                                class="px-6 py-3 border-solid border border-slate-400 bg-sky-200"
                            >
                                Total Net Pay
                            </th>
                            <th
                                scope="col"
                                rowspan="1"
                                class="bg-white"
                            />
                        </tr>
                        <tr>
                            <th
                                rowspan="2"
                                class="px-8 border-solid border border-slate-400 text-xs"
                            >
                                Last Name
                            </th>
                            <th
                                rowspan="2"
                                class="px-8 border-solid border border-slate-400"
                            >
                                First Name
                            </th>
                            <th
                                rowspan="2"
                                class="px-4 border-solid border border-slate-400"
                            >
                                Reg. Hrs
                            </th>
                            <th
                                rowspan="2"
                                class="px-4 border-solid border border-slate-400"
                            >
                                Rest Day/Sunday
                            </th>
                            <th
                                rowspan="2"
                                class="px-4 border-solid border border-slate-400"
                            >
                                Reg. Hol.
                            </th>
                            <th
                                rowspan="2"
                                class="px-4 border-solid border border-slate-400"
                            >
                                Spc. Hol.
                            </th>
                            <th
                                rowspan="2"
                                class="px-4 border-solid border border-slate-400"
                            >
                                Reg O.T
                            </th>
                            <th
                                rowspan="2"
                                class="px-4 border-solid border border-slate-400"
                            >
                                Rest Day. O.T
                            </th>
                            <th
                                rowspan="2"
                                class="px-4 border-solid border border-slate-400"
                            >
                                Reg. Hol. O.T
                            </th>
                            <th
                                rowspan="2"
                                class="px-4 border-solid border border-slate-400"
                            >
                                Spc. Hol. O.T
                            </th>
                            <th
                                rowspan="2"
                                class="px-4 border-solid border border-slate-400"
                            >
                                Reg.
                            </th>
                            <th
                                rowspan="2"
                                class="px-4 border-solid border border-slate-400"
                            >
                                Rest Day/Sun
                            </th>
                            <th
                                rowspan="2"
                                class="px-4 border-solid border border-slate-400"
                            >
                                Reg.Hol
                            </th>
                            <th
                                rowspan="2"
                                class="px-4 border-solid border border-slate-400"
                            >
                                Spc. Hol.
                            </th>
                            <th
                                rowspan="2"
                                class="px-4 border-solid border border-slate-400"
                            >
                                Reg. O.T.
                            </th>
                            <th
                                rowspan="2"
                                class="px-4 border-solid border border-slate-400"
                            >
                                Rest Day O.T
                            </th>
                            <th
                                rowspan="2"
                                class="px-4 border-solid border border-slate-400"
                            >
                                Reg.Hol. O.T
                            </th>
                            <th
                                rowspan="2"
                                class="px-4 border-solid border border-slate-400"
                            >
                                Spc.Hol. O.T
                            </th>
                            <th
                                rowspan="2"
                                class="px-4 border-solid border border-slate-400"
                            >
                                Adjustments
                            </th>
                            <th
                                class="px-4 border-solid border border-slate-400"
                                colspan="2"
                            >
                                SSS
                            </th>
                            <th
                                class="px-4 border-solid border border-slate-400"
                                rowspan="2"
                            >
                                PHIC
                            </th>
                            <th
                                class="px-4 border-solid border border-slate-400"
                                rowspan="2"
                            >
                                HMDF
                            </th>
                            <th
                                rowspan="2"
                                class="px-4 border-solid border border-slate-400"
                            >
                                EWTC
                            </th>
                            <th
                                rowspan="2"
                                class="px-4 border-solid border border-slate-400"
                            >
                                Other Deductions
                            </th>
                            <th
                                v-for="loansType, key in loanTypes"
                                :key="key + 'loanTypesTitles'"
                                rowspan="2"
                                class="px-4 border-solid border border-slate-400"
                            >
                                {{ loansType }}
                            </th>
                            <th
                                v-for="cashAdvance, key in cashAdvances"
                                :key="key + 'cashAdvanceTitles'"
                                rowspan="2"
                                class="px-4 border-solid border border-slate-400"
                            >
                                {{ cashAdvance }}
                            </th>
                            <th
                                v-for="otherDeduction, key in otherDeductions"
                                :key="key + 'otherDeductionTitles'"
                                rowspan="2"
                                class="px-4 border-solid border border-slate-400"
                            >
                                {{ otherDeduction }}
                            </th>
                        </tr>
                        <tr>
                            <th
                                class="px-4 border-solid border border-slate-400"
                            >
                                Employee Contribution
                            </th>
                            <th
                                class="px-4 border-solid border border-slate-400"
                            >
                                Employee Compensation
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(data, index) in payrollDraft.payroll" :key="index" class="bg-white border-b text-gray-950">
                            <td class="p-4 border-solid border border-slate-400">
                                {{ index + 1 }}
                            </td>
                            <td class="p-4 border-solid border border-slate-400">
                                {{ data.family_name }}
                            </td>
                            <td class="p-4 border-solid border border-slate-400">
                                {{ data.first_name }}
                            </td>
                            <td class="p-4 border-solid border border-slate-400 text-sm">
                                {{ data.current_employment.position.name ?? "-" }}
                            </td>
                            <td class="p-2 border-solid border border-slate-400">
                                SG{{ data.current_employment.employee_salarygrade.salary_grade_level.salary_grade_level ?? "-" }}-{{ data.current_employment.employee_salarygrade.step_name }}
                            </td>
                            <td class="p-4 border-solid border border-slate-400">
                                {{ formatCurrency(data.payroll_records.hours_worked.regular.reg_hrs) ?? "-" }}
                            </td>
                            <td class="p-4 border-solid border border-slate-400">
                                {{ formatCurrency(data.payroll_records.hours_worked.rest.reg_hrs) ?? "-" }}
                            </td>
                            <td class="p-4 border-solid border border-slate-400">
                                {{ formatCurrency(data.payroll_records.hours_worked.regular_holidays.reg_hrs) ?? "-" }}
                            </td>
                            <td class="p-4 border-solid border border-slate-400">
                                {{ formatCurrency(data.payroll_records.hours_worked.special_holidays.reg_hrs) ?? "-" }}
                            </td>
                            <td class="p-4 border-solid border border-slate-400">
                                {{ formatCurrency(data.payroll_records.hours_worked.regular.overtime) ?? "-" }}
                            </td>
                            <td class="p-4 border-solid border border-slate-400">
                                {{ formatCurrency(data.payroll_records.hours_worked.rest.overtime) ?? "-" }}
                            </td>
                            <td class="p-4 border-solid border border-slate-400">
                                {{ formatCurrency(data.payroll_records.hours_worked.regular_holidays.overtime) ?? "-" }}
                            </td>
                            <td class="p-4 border-solid border border-slate-400">
                                {{ formatCurrency(data.payroll_records.hours_worked.special_holidays.overtime) ?? "-" }}
                            </td>
                            <td class="p-4 border-solid border border-slate-400">
                                {{ formatCurrency(data.payroll_records.gross_pays.regular.regular) ?? "-" }}
                            </td>
                            <td class="p-4 border-solid border border-slate-400">
                                {{ formatCurrency(data.payroll_records.gross_pays.rest.regular) ?? "-" }}
                            </td>
                            <td class="p-4 border-solid border border-slate-400">
                                {{ formatCurrency(data.payroll_records.gross_pays.regular_holidays.regular) ?? "-" }}
                            </td>
                            <td class="p-4 border-solid border border-slate-400">
                                {{ formatCurrency(data.payroll_records.gross_pays.special_holidays.regular) ?? "-" }}
                            </td>
                            <td class="p-4 border-solid border border-slate-400">
                                {{ formatCurrency(data.payroll_records.gross_pays.regular.overtime) ?? "-" }}
                            </td>
                            <td class="p-4 border-solid border border-slate-400">
                                {{ formatCurrency(data.payroll_records.gross_pays.rest.overtime) ?? "-" }}
                            </td>
                            <td class="p-4 border-solid border border-slate-400">
                                {{ formatCurrency(data.payroll_records.gross_pays.regular_holidays.overtime) ?? "-" }}
                            </td>
                            <td class="p-4 border-solid border border-slate-400">
                                {{ formatCurrency(data.payroll_records.gross_pays.special_holidays.overtime) ?? "-" }}
                            </td>
                            <td class="p-4 border-solid border border-slate-400 divide-y">
                                <div v-for="(adjust, index1) in data.payroll_records.gross_pays.adjustments" :key="index1">
                                    <strong>{{ adjust.adjustment_name }}:</strong> {{ formatCurrency(adjust.adjustment_amount) }}
                                </div>
                            </td>
                            <td class="p-4 border-solid border border-slate-400">
                                {{ formatCurrency(data.payroll_records.total_gross_pay) ?? "-" }}
                            </td>
                            <td class="p-4 border-solid border border-slate-400">
                                {{ data.payroll_records.salary_deduction.sss.employee_contribution ? formatCurrency(data.payroll_records.salary_deduction.sss.employee_contribution) : "-" }}
                            </td>
                            <td class="p-4 border-solid border border-slate-400">
                                {{ data.payroll_records.salary_deduction.sss.employee_compensation ? formatCurrency(data.payroll_records.salary_deduction.sss.employee_compensation) : "-" }}
                            </td>
                            <td class="p-4 border-solid border border-slate-400">
                                {{ data.payroll_records.salary_deduction.phic.employee_compensation ? formatCurrency(data.payroll_records.salary_deduction.phic.employee_compensation) : "-" }}
                            </td>
                            <td class="p-4 border-solid border border-slate-400">
                                {{ data.payroll_records.salary_deduction.hmdf.employee_compensation ? formatCurrency(data.payroll_records.salary_deduction.hmdf.employee_compensation) : "-" }}
                            </td>
                            <td class="p-4 border-solid border border-slate-400">
                                {{ formatCurrency(data.payroll_records.salary_deduction.ewtc) ?? "-" }}
                            </td>
                            <td class="p-2 border-solid border border-slate-400">
                                <div class="divide-y">
                                    <div>
                                        <strong>Loans:</strong>
                                        {{ formatCurrency(data.payroll_records.salary_deduction.loan.total_paid) ?? "-" }}
                                        <div v-for="(loan, index1) in data.payroll_records.salary_deduction.loan.loans" :key="'loanName'+index1">
                                            {{ loan.id }}: {{ formatCurrency(loan.installment_deduction) ?? "-" }}
                                        </div>
                                    </div>
                                    <div>
                                        <strong>CA:</strong>
                                        {{ formatCurrency(data.payroll_records.salary_deduction.cash_advance.total_paid) ?? "-" }}
                                        <div v-for="(cAdv, index1) in data.payroll_records.salary_deduction.cash_advance.cash_advance" :key="'cAdvName'+index1">
                                            {{ cAdv.id }}: {{ formatCurrency(cAdv.installment_deduction) ?? "-" }}
                                        </div>
                                    </div>
                                    <div>
                                        <strong>Other Deductions:</strong>
                                        {{ formatCurrency(data.payroll_records.salary_deduction.other_deductions.total_paid) ?? "-" }}
                                        <div v-for="(otherDeduct, index1) in data.payroll_records.salary_deduction.other_deductions.other_deduction" :key="'oDed'+index1">
                                            {{ otherDeduct.otherdeduction_name }}:{{ formatCurrency(otherDeduct.installment_deduction) ?? "-" }}
                                        </div>
                                    </div>
                                    <div>
                                        <strong>HMO:</strong>
                                    </div>
                                </div>
                            </td>
                            <th
                                v-for="loansType, key in loanTypes"
                                :key="key + 'loanTypesValues'"
                                class="p-4 border-solid border border-slate-400"
                            >
                                {{ formatCurrency(loansType) }}
                            </th>
                            <th
                                v-for="cashAdvance, key in cashAdvances"
                                :key="key + 'cashAdvanceValues'"
                                class="p-4 border-solid border border-slate-400"
                            >
                                {{ formatCurrency(cashAdvance) }}
                            </th>
                            <th
                                v-for="otherDeduction, key in otherDeductions"
                                :key="key + 'otherDeductionValues'"
                                class="p-4 border-solid border border-slate-400"
                            >
                                {{ formatCurrency(otherDeduction) ?? "-" }}
                            </th>
                            <td class="p-4 border-solid border border-slate-400">
                                {{ formatCurrency(data.payroll_records.total_salary_deduction) ?? "-" }}
                            </td>
                            <td class="p-4 border-solid border border-slate-400">
                                {{ formatCurrency(data.payroll_records.total_net_pay) ?? "-" }}
                            </td>
                        </tr>
                        <tr class="bg-white text-gray-950">
                            <th
                                scope="col"
                                colspan="5"
                                class="p-4"
                            />
                            <td>
                                {{ " " }}
                            </td>
                            <td>
                                {{ " " }}
                            </td>
                            <td>
                                {{ " " }}
                            </td>
                            <td>
                                {{ " " }}
                            </td>
                            <td>
                                {{ " " }}
                            </td>
                            <td>
                                {{ " " }}
                            </td>
                            <td>
                                {{ " " }}
                            </td>
                            <td>
                                {{ " " }}
                            </td>
                            <td>
                                {{ formatCurrency(genpayrollstore.totalRegHrsPayrollDraft) }}
                            </td>
                            <td>
                                {{ formatCurrency(genpayrollstore.totalRestDayPayrollDraft) }}
                            </td>
                            <td>
                                {{ formatCurrency(genpayrollstore.totalRegHolPayrollDraft) }}
                            </td>
                            <td>
                                {{ formatCurrency(genpayrollstore.totalSpcHolPayrollDraft) }}
                            </td>
                            <td>
                                {{ formatCurrency(genpayrollstore.totalRegOTPayrollDraft) }}
                            </td>
                            <td>
                                {{ formatCurrency(genpayrollstore.totalRestDayOTPayrollDraft) }}
                            </td>
                            <td>
                                {{ formatCurrency(genpayrollstore.totalRegHolOTPayrollDraft) }}
                            </td>
                            <td>
                                {{ formatCurrency(genpayrollstore.totalSpcHolOTPayrollDraft) }}
                            </td>
                            <td>
                                {{ formatCurrency(genpayrollstore.totalAdjustments) }}
                            </td>
                            <td>
                                {{ formatCurrency(genpayrollstore.totalGrossPayPayrollDraft) }}
                            </td>
                            <td>
                                {{ " " }}
                            </td>
                            <td>
                                {{ genpayrollstore.totalSSSEmployeePayrollDraft ? formatCurrency(genpayrollstore.totalSSSEmployeePayrollDraft) : "-" }}
                            </td>
                            <td>
                                {{ formatCurrency(genpayrollstore.totalPHICEmployeePayrollDraft) ?? "-" }}
                            </td>
                            <td>
                                {{ formatCurrency(genpayrollstore.totalHDMFEmployeePayrollDraft) ?? "-" }}
                            </td>
                            <td>
                                {{ formatCurrency(genpayrollstore.totalEWTCPayrollDraft) }}
                            </td>
                            <td />
                            <td>
                                <strong>{{ formatCurrency(genpayrollstore.totalDeductionPayrollDraft) }}</strong>
                            </td>
                            <td>
                                <strong>{{ formatCurrency(genpayrollstore.totalNetPayPayrollDraft) }}</strong>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- <div class="signatures grid md:grid-cols-4 gap-6 pt-5 p-4">
                <div>
                    Prepared by:
                    <div class="indent-8">
                        -
                    </div>
                    <div class="indent-8">
                        PAYROLL CLERK
                    </div>
                </div>
                <div>
                    Check by:
                    <div class="indent-8">
                        -
                    </div>
                    <div class="indent-8">
                        HR
                    </div>
                </div>
                <div>
                    Noted by:
                    <div class="indent-8">
                        -
                    </div>
                    <div class="indent-8">
                        PROJECT MANAGER
                    </div>
                </div>
                <div>
                    Approved by:
                    <div class="indent-8">
                        <label class="items-center space-x-2 uppercase underline underline-offset-1">
                            ENGR. ANGEL A. ABRAU
                        </Label>
                    </div>
                    <div class="indent-8">
                        PRESIDENT
                    </div>
                </div>
            </div> -->
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
        <div v-if="showEditModal" :loading="boardLoading">
            <Teleport to="body">
                <div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70">
                    <div class="bg-white p-4 w-4/5 h-4/5 mt-10 ml-64 gap-2 rounded-md overflow-auto absolute">
                        <div class="flex gap-2 justify-end ml-auto p-2 ">
                            <button
                                title="Close"
                                @click="closeViewModal"
                            >
                                <Icon name="cil:x" class="w-5 h-5 hover:bg-red-400 hover:rounded-sm hover:text-white" />
                            </button>
                        </div>
                        <div class="p-2">
                            <HrmsPayrollEditGeneratepayrollInformation />
                        </div>
                    </div>
                </div>
            </Teleport>
        </div>
    </div>
</template>
