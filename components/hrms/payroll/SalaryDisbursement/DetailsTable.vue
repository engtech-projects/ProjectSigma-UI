<script setup>
const props = defineProps({
    data: {
        type: Object,
        required: true,
    },
})
const currentMonth = () => {
    return new Date(props.data.payroll_date).getMonth()
}
const totalBasicPay = () => {
    return Object.values(props.data.summary).reduce((accumulator, current) => {
        return accumulator + current.summary.pay_basic
    }, 0)
}
const totalOvertimePay = () => {
    return Object.values(props.data.summary).reduce((accumulator, current) => {
        return accumulator + current.summary.pay_overtime
    }, 0)
}
const totalGrossPay = () => {
    return Object.values(props.data.summary).reduce((accumulator, current) => {
        return accumulator + current.summary.pay_gross
    }, 0)
}
const totalDeductSSS = () => {
    return Object.values(props.data.summary).reduce((accumulator, current) => {
        return accumulator + current.summary.deduct_sss_employee_contribution + current.summary.deduct_sss_employee_compensation + current.summary.deduct_sss_employee_wisp
    }, 0)
}
const totalDeductPhilhealth = () => {
    return Object.values(props.data.summary).reduce((accumulator, current) => {
        return accumulator + current.summary.deduct_phihealth_employee_cotribution
    }, 0)
}
const totalDeductPagibig = () => {
    return Object.values(props.data.summary).reduce((accumulator, current) => {
        return accumulator + current.summary.deduct_pagibig_employee_cotribution
    }, 0)
}
const totalDeductWithholdingtax = () => {
    return Object.values(props.data.summary).reduce((accumulator, current) => {
        return accumulator + current.summary.deduct_withholdingtax
    }, 0)
}
const totalDeductCashadvance = () => {
    return Object.values(props.data.summary).reduce((accumulator, current) => {
        return accumulator + current.summary.deduct_cashadvance
    }, 0)
}
const totalDeductLoan = () => {
    return Object.values(props.data.summary).reduce((accumulator, current) => {
        return accumulator + current.summary.deduct_loan
    }, 0)
}
const totalDeductOtherdeduction = () => {
    return Object.values(props.data.summary).reduce((accumulator, current) => {
        return accumulator + current.summary.deduct_otherdeduction
    }, 0)
}
const totalDeduct = () => {
    return Object.values(props.data.summary).reduce((accumulator, current) => {
        return accumulator + current.summary.deduct_total
    }, 0)
}
const totalNetpay = () => {
    return Object.values(props.data.summary).reduce((accumulator, current) => {
        return accumulator + current.summary.net_pay
    }, 0)
}
</script>
<template>
    <LayoutPrint>
        <div class="flex flex-col">
            <div class="header flex flex-col gap-1">
                <span class="text-md font-bold text-blue-500 text-center">
                    EVENPAR CONSTRUCTION AND DEVELOPMENT CORPORATION
                </span>
            </div>
            <div class="title flex flex-col justify-center gap-1 mb-12">
                <span class="text-md text-black text-center">
                    FOR THE MONTH OF <span class="text-red-600 font-bold underline">{{ useMonthName(currentMonth()) }} 2024</span>
                </span>
            </div>
            <table class="printTable border border-gray-500">
                <thead class="text-md">
                    <tr class="py-4">
                        <th rowspan="3" class="py-4 border-gray-500">
                            OFFICE/PROJECT CODE PAYROLL
                        </th>
                        <th colspan="3" class="border border-gray-500">
                            GROSS AMOUNT
                        </th>
                        <th colspan="7" class="border border-gray-500">
                            DEDUCTIONS
                        </th>
                        <th rowspan="3" colspan="1" class="border border-gray-500">
                            DEDUCTIONS
                        </th>
                        <th rowspan="3" colspan="1" class="border border-gray-500">
                            NET PAY
                        </th>
                        <th rowspan="3" colspan="1" class="border border-gray-500">
                            BANK
                        </th>
                    </tr>
                    <tr>
                        <th colspan="2" class="border border-gray-500">
                            TOTAL
                        </th>
                        <th rowspan="2" class="border border-gray-500">
                            GROSS PAY
                        </th>
                        <!-- <th rowspan="2" class="border border-gray-500">
                            LATE / UNDERTIME
                        </th> -->
                        <th rowspan="2" class="border border-gray-500">
                            SSS EE
                        </th>
                        <th rowspan="2" class="border border-gray-500">
                            PHIC EE
                        </th>
                        <th rowspan="2" class="border border-gray-500">
                            HDMF EE
                        </th>
                        <th rowspan="2" class="border border-gray-500">
                            EWTC
                        </th>
                        <th rowspan="2" class="border border-gray-500">
                            CASH ADVANCE
                        </th>
                        <th rowspan="2" class="border border-gray-500">
                            LOAN
                        </th>
                        <th rowspan="2" class="border border-gray-500">
                            OTHER DEDUCTION
                        </th>
                        <!-- <th rowspan="2" class="border border-gray-500">
                            HDMF MP2
                        </th>
                        <th rowspan="2" class="border border-gray-500">
                            COOP LOAN
                        </th>
                        <th rowspan="2" class="border border-gray-500">
                            HMO
                        </th>
                        <th rowspan="2" class="border border-gray-500">
                            WISP
                        </th>
                        <th rowspan="2" class="border border-gray-500">
                            OTHERS
                        </th> -->
                    </tr>
                    <tr>
                        <th rowspan="2" class="border border-gray-500">
                            BASIC PAY
                        </th>
                        <th rowspan="2" class="border border-gray-500">
                            OVERTIME
                        </th>
                    </tr>
                </thead>
                <tbody class="text-sm">
                    <tr v-for="rowData, key, index in data.summary" :key="'SalaryDisbursementDataRow' + index" class="h-2">
                        <td class="border border-gray-500 h-8 px-2 font-bold text-sm text-center">
                            {{ index + 1 }}. {{ key }}
                        </td>
                        <td class="border border-gray-500 h-8 px-2 font-bold text-sm">
                            {{ useFormatCurrency(rowData.summary.pay_basic) }}
                        </td>
                        <td class="border border-gray-500 h-8 px-2 font-bold text-sm text-center">
                            {{ useFormatCurrency(rowData.summary.pay_overtime) }}
                        </td>
                        <td class="border border-gray-500 h-8 px-2 font-bold text-sm text-right">
                            {{ useFormatCurrency(rowData.summary.pay_gross) }}
                        </td>
                        <!-- <td class="border border-gray-500 h-8 px-2 font-bold text-sm text-right">
                            aa
                        </td> -->
                        <td class="border border-gray-500 h-8 px-2 font-bold text-sm text-center">
                            {{ useFormatCurrency(rowData.summary.deduct_sss_employee_contribution + rowData.summary.deduct_sss_employee_compensation + rowData.summary.deduct_sss_employee_wisp) }}
                        </td>
                        <td class="border border-gray-500 h-8 px-2 font-bold text-sm">
                            {{ useFormatCurrency(rowData.summary.deduct_phihealth_employee_cotribution) }}
                        </td>
                        <td class="border border-gray-500 h-8 px-2 font-bold text-sm text-center">
                            {{ useFormatCurrency(rowData.summary.deduct_pagibig_employee_cotribution) }}
                        </td>
                        <td class="border border-gray-500 h-8 px-2 font-bold text-sm text-right">
                            {{ useFormatCurrency(rowData.summary.deduct_withholdingtax) }}
                        </td>
                        <td class="border border-gray-500 h-8 px-2 font-bold text-sm text-right">
                            {{ useFormatCurrency(rowData.summary.deduct_cashadvance) }}
                        </td>
                        <td class="border border-gray-500 h-8 px-2 font-bold text-sm">
                            {{ useFormatCurrency(rowData.summary.deduct_loan) }}
                        </td>
                        <td class="border border-gray-500 h-8 px-2 font-bold text-sm text-center">
                            {{ useFormatCurrency(rowData.summary.deduct_otherdeduction) }}
                        </td>
                        <!-- <td class="border border-gray-500 h-8 px-2 font-bold text-sm text-center">
                            -
                        </td>
                        <td class="border border-gray-500 h-8 px-2 font-bold text-sm text-right">
                            -
                        </td>
                        <td class="border border-gray-500 h-8 px-2 font-bold text-sm text-right">
                            -
                        </td>
                        <td class="border border-gray-500 h-8 px-2 font-bold text-sm text-center">
                            -
                        </td>
                        <td class="border border-gray-500 h-8 px-2 font-bold text-sm">
                            -
                        </td>
                        <td class="border border-gray-500 h-8 px-2 font-bold text-sm text-center">
                            -
                        </td>
                        <td class="border border-gray-500 h-8 px-2 font-bold text-sm text-right">
                            -
                        </td> -->
                        <td class="border border-gray-500 h-8 px-2 font-bold text-sm text-right">
                            {{ useFormatCurrency(rowData.summary.deduct_total) }}
                        </td>
                        <td class="border border-gray-500 h-8 px-2 font-bold text-sm text-right">
                            {{ useFormatCurrency(rowData.summary.net_pay) }}
                        </td>
                        <td
                            v-if="index === 0"
                            class="border border-gray-500 h-8 px-2 font-bold text-sm text-right"
                            :rowspan="Object.values(data.summary).length"
                        >
                            MAYBANK
                        </td>
                    </tr>
                    <tr height="15px">
                        <td colspan="13" />
                    </tr>
                    <tr>
                        <td class="border border-gray-500 h-8 px-2 font-bold text-sm text-right">
                            Grand Total
                        </td>
                        <td class="border border-gray-500 h-8 px-2 font-bold text-sm">
                            {{ useFormatCurrency(totalBasicPay()) }}
                        </td>
                        <td class="border border-gray-500 h-8 px-2 font-bold text-sm text-center">
                            {{ useFormatCurrency(totalOvertimePay()) }}
                        </td>
                        <td class="border border-gray-500 h-8 px-2 font-bold text-sm text-right">
                            {{ useFormatCurrency(totalGrossPay()) }}
                        </td>
                        <!-- <td class="border border-gray-500 h-8 px-2 font-bold text-sm text-right">
                            -
                        </td> -->
                        <td class="border border-gray-500 h-8 px-2 font-bold text-sm text-center">
                            {{ useFormatCurrency(totalDeductSSS()) }}
                        </td>
                        <td class="border border-gray-500 h-8 px-2 font-bold text-sm">
                            {{ useFormatCurrency(totalDeductPhilhealth()) }}
                        </td>
                        <td class="border border-gray-500 h-8 px-2 font-bold text-sm text-center">
                            {{ useFormatCurrency(totalDeductPagibig()) }}
                        </td>
                        <td class="border border-gray-500 h-8 px-2 font-bold text-sm text-right">
                            {{ useFormatCurrency(totalDeductWithholdingtax()) }}
                        </td>
                        <td class="border border-gray-500 h-8 px-2 font-bold text-sm text-right">
                            {{ useFormatCurrency(totalDeductCashadvance()) }}
                        </td>
                        <td class="border border-gray-500 h-8 px-2 font-bold text-sm">
                            {{ useFormatCurrency(totalDeductLoan()) }}
                        </td>
                        <td class="border border-gray-500 h-8 px-2 font-bold text-sm text-center">
                            {{ useFormatCurrency(totalDeductOtherdeduction()) }}
                        </td>
                        <!-- <td class="border border-gray-500 h-8 px-2 font-bold text-sm text-center">
                            -
                        </td>
                        <td class="border border-gray-500 h-8 px-2 font-bold text-sm text-right">
                            -
                        </td>
                        <td class="border border-gray-500 h-8 px-2 font-bold text-sm text-right">
                            -
                        </td>
                        <td class="border border-gray-500 h-8 px-2 font-bold text-sm text-center">
                            -
                        </td>
                        <td class="border border-gray-500 h-8 px-2 font-bold text-sm">
                            -
                        </td>
                        <td class="border border-gray-500 h-8 px-2 font-bold text-sm text-center">
                            -
                        </td>
                        <td class="border border-gray-500 h-8 px-2 font-bold text-sm text-right">
                            -
                        </td> -->
                        <td class="border border-gray-500 h-8 px-2 font-bold text-sm text-right">
                            {{ useFormatCurrency(totalDeduct()) }}
                        </td>
                        <td class="bg-yellow-200 border border-gray-500 h-8 px-2 font-bold text-sm text-right">
                            {{ useFormatCurrency(totalNetpay()) }}
                        </td>
                        <td class="border border-gray-500 h-8 px-2 font-bold text-sm text-right" />
                    </tr>
                </tbody>
            </table>
            <LayoutApprovalsListView :approvals="data.approvals" />
        </div>
    </LayoutPrint>
</template>

<style scoped>

</style>
