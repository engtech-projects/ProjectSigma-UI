<script lang="ts" setup>
// import { useEmployeeInfo } from "@/stores/hrms/employee"
// const employee = useEmployeeInfo()

// import { useGeneratePayrollStore } from "@/stores/hrms/payroll/generatePayroll"
// const genpayrollstore = useGeneratePayrollStore()

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
interface HeaderColumn {
    name: string,
    id: string,
    style: string
}
defineProps({
    headerColumns: {
        type: Array<HeaderColumn>,
        required: true,
    },
    datas: {
        type: Array<any>,
        required: true,
    },
    actions: {
        type: Object,
        required: true,
    },
})

</script>
<template>
    <!-- <pre>{{ datas }}</pre> -->
    <div class="bg-white w-full shadow overflow-hidden sm:rounded-lg">
        <div class="details flex flex-cols justify-between p-2 sm:px-2 bg-sky-100 border-b-4 border-red-500">
            <div class="sticky top-0 text-xl leading-6 font-normal text-gray-900 uppercase">
                {{ datas[0].release_type.toUpperCase() }}
            </div>
            <div class="sticky top-0 text-xl leading-6 font-normal text-gray-900">
                Payroll
            </div>
        </div>
        <div div class="border-t border-gray-200">
            <div class="flex justify-between p-2">
                <div class="text-md leading-6 font-medium text-gray-900">
                    <!-- {{ datas[0].group_type }}: <strong>{{ datas[0].group_type === 'Department' ? datas[0].department.department_name : datas[0].project.project_code }}</strong> -->
                </div>
                <div class="text-md leading-6 font-medium text-gray-900">
                    Period Covered: <strong>{{ formatDateRange(datas[0].cutoff_start, datas[0].cutoff_end) }}</strong>
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
                                colspan="8"
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
                            <!-- <th
                                scope="col"
                                :colspan="5 + loanTypes.length + cashAdvances.length + otherDeductions.length"
                                class="p-2 border-solid border border-slate-400 bg-sky-200"
                            >
                                Salary Deduction
                            </th> -->
                            <th
                                scope="col"
                                :colspan="6 + datas[0].payroll_details.deductions.length"
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
                                class="px-4 border-solid border border-slate-400"
                                colspan="1"
                            >
                                SSS
                            </th>
                            <th
                                class="px-4 border-solid border border-slate-400"
                                colspan="1"
                            >
                                PHIC
                            </th>
                            <th
                                class="px-4 border-solid border border-slate-400"
                                colspan="1"
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
                                Loans
                            </th>
                            <th
                                v-for="loansType, key in loanTypes"
                                :key="key + 'loanTypesTitles'"
                                rowspan="2"
                                class="px-4 border-solid border border-slate-400"
                            >
                                <!-- {{ loansType }} -->
                            </th>
                            <th
                                v-for="cashAdvance, key in datas[0].payroll_details.deductions"
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
                                <!-- {{ otherDeduction }} -->
                            </th>
                        </tr>
                        <tr>
                            <th
                                class="px-4 border-solid border border-slate-400"
                            >
                                Employee
                            </th>
                            <th
                                class="px-4 border-solid border border-slate-400"
                            >
                                Employee
                            </th>
                            <th
                                class="px-4 border-solid border border-slate-400"
                            >
                                Employee
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="dataValue, index in datas" :key="index">
                            <!-- <pre>{{ dataValue }}</pre> -->
                            <tr class="bg-white border-b text-gray-950">
                                <td class="p-4 border-solid border border-slate-400">
                                    {{ index + 1 }}
                                </td>
                                <td class="p-4 border-solid border border-slate-400">
                                    <pre>{{ dataValue }}</pre>
                                    <!-- <pre>{{ dataValue.payroll_details. }}</pre> -->
                                </td>
                                <td class="p-4 border-solid border border-slate-400">
                                    <!-- {{ dataValue.first_name }} -->
                                </td>
                                <td class="p-4 border-solid border border-slate-400 text-sm">
                                    <!-- {{ data.current_employment.position.name ?? "-" }} -->
                                </td>
                                <td class="p-2 border-solid border border-slate-400">
                                    <!-- SG{{ data.current_employment.employee_salarygrade.salary_grade_level.salary_grade_level ?? "-" }}-{{ data.current_employment.employee_salarygrade.step_name }} -->
                                </td>
                                <td class="p-4 border-solid border border-slate-400">
                                    <!-- {{ data.payroll_records.hours_worked.regular.reg_hrs ?? "-" }} -->
                                </td>
                                <td class="p-4 border-solid border border-slate-400">
                                    <!-- {{ data.payroll_records.hours_worked.rest.reg_hrs ?? "-" }} -->
                                </td>
                                <td class="p-4 border-solid border border-slate-400">
                                    <!-- {{ data.payroll_records.hours_worked.regular_holidays.reg_hrs ?? "-" }} -->
                                </td>
                                <td class="p-4 border-solid border border-slate-400">
                                    <!-- {{ data.payroll_records.hours_worked.special_holidays.reg_hrs ?? "-" }} -->
                                </td>
                                <td class="p-4 border-solid border border-slate-400">
                                    <!-- {{ data.payroll_records.hours_worked.regular.overtime ?? "-" }} -->
                                </td>
                                <td class="p-4 border-solid border border-slate-400">
                                    <!-- {{ data.payroll_records.hours_worked.rest.overtime ?? "-" }} -->
                                </td>
                                <td class="p-4 border-solid border border-slate-400">
                                    <!-- {{ data.payroll_records.hours_worked.regular_holidays.overtime ?? "-" }} -->
                                </td>
                                <td class="p-4 border-solid border border-slate-400">
                                    <!-- {{ data.payroll_records.hours_worked.special_holidays.overtime ?? "-" }} -->
                                </td>
                                <td class="p-4 border-solid border border-slate-400">
                                    {{ dataValue.payroll_details[0].regular_hours }}
                                    <!-- {{ data.payroll_records.gross_pays.regular.regular ?? "-" }} -->
                                </td>
                                <td class="p-4 border-solid border border-slate-400">
                                    {{ dataValue.payroll_details[0].rest_hours }}
                                    <!-- {{ data.payroll_records.gross_pays.rest.regular ?? "-" }} -->
                                </td>
                                <td class="p-4 border-solid border border-slate-400">
                                    {{ dataValue.payroll_details[0].regular_holiday_hours }}
                                    <!-- {{ data.payroll_records.gross_pays.regular_holidays.regular ?? "-" }} -->
                                </td>
                                <td class="p-4 border-solid border border-slate-400">
                                    {{ dataValue.payroll_details[0].special_holiday_hours }}
                                    <!-- {{ data.payroll_records.gross_pays.special_holidays.regular ?? "-" }} -->
                                </td>
                                <td class="p-4 border-solid border border-slate-400">
                                    {{ dataValue.payroll_details[0].regular_overtime }}
                                    <!-- {{ data.payroll_records.gross_pays.regular.overtime ?? "-" }} -->
                                </td>
                                <td class="p-4 border-solid border border-slate-400">
                                    {{ dataValue.payroll_details[0].rest_overtime }}
                                    <!-- {{ data.payroll_records.gross_pays.rest.overtime ?? "-" }} -->
                                </td>
                                <td class="p-4 border-solid border border-slate-400">
                                    {{ dataValue.payroll_details[0].regular_holiday_overtime }}
                                    <!-- {{ data.payroll_records.gross_pays.regular_holidays.overtime ?? "-" }} -->
                                </td>
                                <td class="p-4 border-solid border border-slate-400">
                                    {{ dataValue.payroll_details[0].special_holiday_overtime }}
                                    <!-- {{ data.payroll_records.gross_pays.special_holidays.overtime ?? "-" }} -->
                                </td>
                                <td class="p-4 border-solid border border-slate-400">
                                    {{ dataValue.payroll_details[0].gross_pay }}
                                    <!-- {{ data.payroll_records.total_gross_pay ?? "-" }} -->
                                </td>
                                <td class="p-4 border-solid border border-slate-400">
                                    {{ dataValue.payroll_details[0].sss_employee_compensation }}
                                    <!-- {{ data.payroll_records.salary_deduction.sss.employee_compensation ?? "-" }} -->
                                </td>
                                <td class="p-4 border-solid border border-slate-400">
                                    {{ dataValue.payroll_details[0].philhealth_employee_contribution }}
                                    <!-- {{ data.payroll_records.salary_deduction.phic.employee_compensation ?? "-" }} -->
                                </td>
                                <td class="p-4 border-solid border border-slate-400">
                                    {{ dataValue.payroll_details[0].pagibig_employee_compensation }}
                                    <!-- {{ data.payroll_records.salary_deduction.hmdf.employee_compensation ?? "-" }} -->
                                </td>
                                <td class="p-4 border-solid border border-slate-400">
                                    {{ dataValue.payroll_details[0].withholdingtax_contribution }}
                                    <!-- {{ data.payroll_records.salary_deduction.ewtc ?? "-" }} -->
                                </td>
                                <td class="p-4 border-solid border border-slate-400 text-xs">
                                    {{ dataValue.payroll_details[0].deductions[0] }}
                                    <!-- Loans: {{ data.payroll_records.salary_deduction.loan.total_paid ?? "-" }}

                                    Cash Advance: {{ data.payroll_records.salary_deduction.cash_advance.total_paid ?? "-" }}

                                    Other Deductions: {{ data.payroll_records.salary_deduction.other_deductions.total_paid ?? "-" }} -->
                                </td>
                                <td class="p-4 border border-solid border-slate-400 divide-y-*">
                                    <div class="mb-2">
                                        <!-- <span class="font-bold text-xs">Cash Advance:</span> {{ data.payroll_records.salary_deduction.cash_advance.total_paid ?? "-" }} -->
                                    </div>
                                    <div class="mb-2">
                                        <!-- <span class="font-bold text-xs">Coop Loans:</span> {{ data.payroll_records.salary_deduction.loan.total_paid ?? "-" }} -->
                                    </div>
                                    <div>
                                        <!-- <span class="font-bold text-xs">Other Deductions:</span> {{ data.payroll_records.salary_deduction.other_deductions.total_paid ?? "-" }} -->
                                    </div>
                                </td>

                                <th
                                    v-for="loansType, key in loanTypes"
                                    :key="key + 'loanTypesValues'"
                                    class="p-4 border-solid border border-slate-400"
                                >
                                    <!-- {{ loansType }} -->
                                </th>
                                <th
                                    v-for="cashAdvance, key in cashAdvances"
                                    :key="key + 'cashAdvanceValues'"
                                    class="p-4 border-solid border border-slate-400"
                                >
                                    <!-- {{ cashAdvance }} -->
                                </th>
                                <th
                                    v-for="otherDeduction, key in otherDeductions"
                                    :key="key + 'otherDeductionValues'"
                                    class="p-4 border-solid border border-slate-400"
                                >
                                    <!-- {{ otherDeduction }} -->
                                </th>
                                <td class="p-4 border-solid border border-slate-400">
                                    {{ dataValue.payroll_details[0].total_deduct }}
                                    <!-- {{ data.payroll_records.total_salary_deduction ?? "-" }} -->
                                </td>
                                <td class="p-4 border-solid border border-slate-400">
                                    {{ dataValue.payroll_details[0].net_pay }}
                                    <!-- {{ data.payroll_records.total_net_pay ?? "-" }} -->
                                </td>
                            </tr>
                        </template>
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
                                <!-- {{ genpayrollstore.totalRegHrsPayrollDraft }} -->
                            </td>
                            <td>
                                <!-- {{ genpayrollstore.totalRestDayPayrollDraft }} -->
                            </td>
                            <td>
                                <!-- {{ genpayrollstore.totalRegHolPayrollDraft }} -->
                            </td>
                            <td>
                                <!-- {{ genpayrollstore.totalSpcHolPayrollDraft }} -->
                            </td>
                            <td>
                                <!-- {{ genpayrollstore.totalRegOTPayrollDraft }} -->
                            </td>
                            <td>
                                <!-- {{ genpayrollstore.totalRestDayOTPayrollDraft }} -->
                            </td>
                            <td>
                                <!-- {{ genpayrollstore.totalRegHolOTPayrollDraft }} -->
                            </td>
                            <td>
                                <!-- {{ genpayrollstore.totalSpcHolOTPayrollDraft }} -->
                            </td>
                            <td>
                                <!-- {{ genpayrollstore.totalGrossPayPayrollDraft }} -->
                            </td>
                            <td>
                                <!-- {{ genpayrollstore.totalSSSEmployeePayrollDraft }} -->
                            </td>
                            <td>
                                <!-- {{ genpayrollstore.totalPHICEmployeePayrollDraft }} -->
                            </td>
                            <td>
                                <!-- {{ genpayrollstore.totalHDMFEmployeePayrollDraft }} -->
                            </td>
                            <td>
                                <!-- {{ genpayrollstore.totalEWTCPayrollDraft }} -->
                            </td>
                            <td>
                                <!-- {{ genpayrollstore.totalLoansPayrollDraft }} -->
                            </td>
                            <td>
                                <!-- <strong>{{ genpayrollstore.totalDeductionPayrollDraft }}</strong> -->
                            </td>
                            <td>
                                <!-- <strong>{{ genpayrollstore.totalNetPayPayrollDraft }}</strong> -->
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
</template>
