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
        return accumulator + current.summary.charging_pay_basic
    }, 0)
}
const totalOvertimePay = () => {
    return Object.values(props.data.summary).reduce((accumulator, current) => {
        return accumulator + current.summary.charging_pay_overtime
    }, 0)
}
const totalGrossPay = () => {
    return Object.values(props.data.summary).reduce((accumulator, current) => {
        return accumulator + current.summary.charging_pay_gross
    }, 0)
}
const totalDeductSSS = () => {
    return Object.values(props.data.summary).reduce((accumulator, current) => {
        return accumulator + current.summary.deduct_sss_employee_contribution + current.summary.deduct_sss_employee_compensation
    }, 0)
}
const totalDeductPhilhealth = () => {
    return Object.values(props.data.summary).reduce((accumulator, current) => {
        return accumulator + current.summary.deduct_philhealth_employee_contribution
    }, 0)
}
const totalDeductPagibig = () => {
    return Object.values(props.data.summary).reduce((accumulator, current) => {
        return accumulator + current.summary.deduct_pagibig_employee_contribution
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
const totalDeductSSSWisp = () => {
    return Object.values(props.data.summary).reduce((accumulator, current) => {
        return accumulator + current.summary.deduct_sss_employee_wisp
    }, 0)
}
const totalDeduct = () => {
    return Object.values(props.data.summary).reduce((accumulator, current) => {
        return accumulator + current.summary.deduct_total
    }, 0)
}
const totalNetpay = () => {
    return Object.values(props.data.summary).reduce((accumulator, current) => {
        return accumulator + current.summary.charging_net_pay
    }, 0)
}
const uniqueOtherDeductionNames = computed(() => {
    const names = new Set()
    Object.values(props.data.summary).forEach((element) => {
        element.data.details.forEach((details) => {
            details.other_deduction_payments.forEach((payment) => {
                names.add(payment.deduction.otherdeduction.otherdeduction_name)
                // names.add(payment.name)
            })
        })
    })
    return Array.from(names)
})
const flattenOtherDeductions = (details, name) => {
    const flatPayments = []
    details.forEach((detail) => {
        detail.other_deduction_payments.forEach((payment) => {
            if (payment.deduction.otherdeduction.otherdeduction_name === name) {
                flatPayments.push(payment)
            }
        })
    })
    return flatPayments
}
const uniqueOtherDeductionNameTotals = computed(() => {
    const deductionTotals = []
    uniqueOtherDeductionNames.value.forEach((name) => {
        let total = 0
        Object.values(props.data.summary).forEach((element) => {
            element.data.details.forEach((details) => {
                details.other_deduction_payments.forEach((payment) => {
                    if (payment.deduction.otherdeduction.otherdeduction_name === name) {
                        total += payment.amount
                    }
                })
            })
        })
        deductionTotals[name] = total
    })
    return deductionTotals
})
const uniqueLoanNames = computed(() => {
    const names = new Set()
    Object.values(props.data.summary).forEach((element) => {
        element.data.details.forEach((details) => {
            details.loan_payments.forEach((payment) => {
                names.add(payment.deduction.loan.name)
                // names.add(payment.name)
            })
        })
    })
    return Array.from(names)
})
const flattenLoans = (details, name) => {
    const flatPayments = []
    details.forEach((detail) => {
        detail.loan_payments.forEach((payment) => {
            if (payment.deduction.loan.name === name) {
                flatPayments.push(payment)
            }
        })
    })
    return flatPayments
}
const uniqueLoanNameTotals = computed(() => {
    const loanTotals = []
    uniqueLoanNames.value.forEach((name) => {
        let total = 0
        Object.values(props.data.summary).forEach((element) => {
            element.data.details.forEach((details) => {
                details.loan_payments.forEach((payment) => {
                    if (payment.deduction.loan.name === name) {
                        total += payment.amount
                    }
                })
            })
        })
        loanTotals[name] = total
    })
    return loanTotals
})
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
                    FOR THE MONTH OF <span class="text-red-600 font-bold underline">{{ useMonthName(currentMonth() + 1) }} 2025</span>
                </span>
            </div>
            <table class="printTable border border-gray-500">
                <thead class="text-md">
                    <tr class="py-4">
                        <th
                            rowspan="3"
                            class="py-4 border-gray-500"
                        >
                            OFFICE/PROJECT CODE PAYROLL
                        </th>
                        <th
                            colspan="3"
                            class="border border-gray-500"
                        >
                            GROSS AMOUNT
                        </th>
                        <th
                            :colspan="6 + (uniqueOtherDeductionNames.length || 1) + (uniqueLoanNames.length || 1)"
                            class="border border-gray-500"
                        >
                            DEDUCTIONS
                        </th>
                        <th
                            rowspan="3"
                            colspan="1"
                            class="border border-gray-500"
                        >
                            TOTAL DEDUCTIONS
                        </th>
                        <th
                            rowspan="3"
                            colspan="1"
                            class="border border-gray-500"
                        >
                            NET PAY
                        </th>
                        <th
                            rowspan="3"
                            colspan="1"
                            class="border border-gray-500"
                        >
                            BANK
                        </th>
                    </tr>
                    <tr>
                        <th
                            colspan="2"
                            class="border border-gray-500"
                        >
                            TOTAL
                        </th>
                        <th
                            rowspan="2"
                            class="border border-gray-500"
                        >
                            GROSS PAY
                        </th>
                        <th
                            rowspan="2"
                            class="border border-gray-500"
                        >
                            SSS EE
                        </th>
                        <th
                            rowspan="2"
                            class="border border-gray-500"
                        >
                            WISP EE
                        </th>
                        <th
                            rowspan="2"
                            class="border border-gray-500"
                        >
                            PHIC EE
                        </th>
                        <th
                            rowspan="2"
                            class="border border-gray-500"
                        >
                            HDMF EE
                        </th>
                        <th
                            rowspan="2"
                            class="border border-gray-500"
                        >
                            EWTC
                        </th>
                        <th
                            rowspan="2"
                            class="border border-gray-500"
                        >
                            CASH ADVANCE
                        </th>
                        <th
                            rowspan="1"
                            :colspan="uniqueLoanNames.length"
                            class="border border-gray-500"
                        >
                            LOAN
                        </th>
                        <th
                            rowspan="1"
                            :colspan="uniqueOtherDeductionNames.length"
                            class="border border-gray-500"
                        >
                            OTHER DEDUCTION
                        </th>
                    </tr>
                    <tr>
                        <th class="border border-gray-500">
                            BASIC PAY
                        </th>
                        <th class="border border-gray-500">
                            OVERTIME
                        </th>
                        <th
                            v-if="uniqueLoanNames.length === 0"
                            class="border border-gray-500"
                        >
                            -
                        </th>
                        <th
                            v-for="name, key in uniqueLoanNames"
                            :key="key"
                            class="border border-gray-500"
                        >
                            {{ name }}
                        </th>
                        <th
                            v-if="uniqueOtherDeductionNames.length === 0"
                            class="border border-gray-500"
                        >
                            -
                        </th>
                        <th
                            v-for="name, key in uniqueOtherDeductionNames"
                            :key="key"
                            class="border border-gray-500"
                        >
                            {{ name }}
                        </th>
                    </tr>
                </thead>
                <tbody class="text-sm">
                    <tr v-for="rowData, key, index in data.summary" :key="'SalaryDisbursementDataRow' + index" class="h-2">
                        <td
                            class="border border-gray-500 h-8 px-2 font-bold text-sm text-center"
                        >
                            {{ index + 1 }}. {{ key }}
                        </td>
                        <td
                            class="border border-gray-500 h-8 px-2 font-bold text-sm"
                        >
                            {{ useFormatCurrency(rowData.summary.charging_pay_basic) }}
                        </td>
                        <td
                            class="border border-gray-500 h-8 px-2 font-bold text-sm text-center"
                        >
                            {{ useFormatCurrency(rowData.summary.charging_pay_overtime) }}
                        </td>
                        <td
                            class="border border-gray-500 h-8 px-2 font-bold text-sm text-right"
                        >
                            {{ useFormatCurrency(rowData.summary.charging_pay_gross) }}
                        </td>
                        <td
                            class="border border-gray-500 h-8 px-2 font-bold text-sm text-center"
                        >
                            {{ useFormatCurrency(rowData.summary.deduct_sss_employee_contribution + rowData.summary.deduct_sss_employee_compensation) }}
                        </td>
                        <td
                            class="border border-gray-500 h-8 px-2 font-bold text-sm"
                        >
                            {{ useFormatCurrency(rowData.summary.deduct_sss_employee_wisp) }}
                        </td>
                        <td
                            class="border border-gray-500 h-8 px-2 font-bold text-sm"
                        >
                            {{ useFormatCurrency(rowData.summary.deduct_philhealth_employee_contribution) }}
                        </td>
                        <td
                            class="border border-gray-500 h-8 px-2 font-bold text-sm text-center"
                        >
                            {{ useFormatCurrency(rowData.summary.deduct_pagibig_employee_contribution) }}
                        </td>
                        <td
                            class="border border-gray-500 h-8 px-2 font-bold text-sm text-right"
                        >
                            {{ useFormatCurrency(rowData.summary.deduct_withholdingtax) }}
                        </td>
                        <td
                            class="border border-gray-500 h-8 px-2 font-bold text-sm text-right"
                        >
                            {{ useFormatCurrency(rowData.summary.deduct_cashadvance) }}
                        </td>
                        <td
                            v-if="uniqueLoanNames.length === 0"
                            class="border border-gray-500 h-8 px-2 font-bold text-sm"
                        >
                            -
                        </td>
                        <td
                            v-for="name, lKey in uniqueLoanNames"
                            :key="lKey"
                            class="border border-gray-500 h-8 px-2 font-bold text-sm"
                        >
                            {{ flattenLoans(rowData.data.details, name) ? useFormatCurrency(flattenLoans(rowData.data.details, name).reduce((a, b) => a + b.amount, 0)) : 0.00 }}
                        </td>
                        <td
                            v-if="uniqueOtherDeductionNames.length === 0"
                            class="border border-gray-500 h-8 px-2 font-bold text-sm text-center"
                        >
                            -
                        </td>
                        <td
                            v-for="name, odKey in uniqueOtherDeductionNames"
                            :key="odKey"
                            class="border border-gray-500 h-8 px-2 font-bold text-sm text-center"
                        >
                            {{ flattenOtherDeductions(rowData.data.details, name) ? useFormatCurrency(flattenOtherDeductions(rowData.data.details, name).reduce((a, b) => a + b.amount, 0)) : 0.00 }}
                        </td>
                        <td
                            class="border border-gray-500 h-8 px-2 font-bold text-sm text-right"
                        >
                            {{ useFormatCurrency(rowData.summary.deduct_total) }}
                        </td>
                        <td
                            class="border border-gray-500 h-8 px-2 font-bold text-sm text-right"
                        >
                            {{ useFormatCurrency(rowData.summary.charging_net_pay) }}
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
                        <td
                            class="border border-gray-500 h-8 px-2 font-bold text-sm text-right"
                        >
                            Grand Total
                        </td>
                        <td
                            class="border border-gray-500 h-8 px-2 font-bold text-sm"
                        >
                            {{ useFormatCurrency(totalBasicPay()) }}
                        </td>
                        <td
                            class="border border-gray-500 h-8 px-2 font-bold text-sm text-center"
                        >
                            {{ useFormatCurrency(totalOvertimePay()) }}
                        </td>
                        <td
                            class="border border-gray-500 h-8 px-2 font-bold text-sm text-right"
                        >
                            {{ useFormatCurrency(totalGrossPay()) }}
                        </td>
                        <td
                            class="border border-gray-500 h-8 px-2 font-bold text-sm text-center"
                        >
                            {{ useFormatCurrency(totalDeductSSS()) }}
                        </td>
                        <td
                            class="border border-gray-500 h-8 px-2 font-bold text-sm"
                        >
                            {{ useFormatCurrency(totalDeductSSSWisp()) }}
                        </td>
                        <td
                            class="border border-gray-500 h-8 px-2 font-bold text-sm"
                        >
                            {{ useFormatCurrency(totalDeductPhilhealth()) }}
                        </td>
                        <td
                            class="border border-gray-500 h-8 px-2 font-bold text-sm text-center"
                        >
                            {{ useFormatCurrency(totalDeductPagibig()) }}
                        </td>
                        <td
                            class="border border-gray-500 h-8 px-2 font-bold text-sm text-right"
                        >
                            {{ useFormatCurrency(totalDeductWithholdingtax()) }}
                        </td>
                        <td
                            class="border border-gray-500 h-8 px-2 font-bold text-sm text-right"
                        >
                            {{ useFormatCurrency(totalDeductCashadvance()) }}
                        </td>
                        <td
                            v-if="uniqueLoanNames.length === 0"
                            class="border border-gray-500 h-8 px-2 font-bold text-sm text-center"
                        >
                            -
                        </td>
                        <td
                            v-for="name, lKey in uniqueLoanNames"
                            :key="lKey"
                            class="border border-gray-500 h-8 px-2 font-bold text-sm"
                        >
                            {{ useFormatCurrency(uniqueLoanNameTotals[name]) }}
                        </td>
                        <td
                            v-if="uniqueOtherDeductionNames.length === 0"
                            class="border border-gray-500 h-8 px-2 font-bold text-sm text-center"
                        >
                            -
                        </td>
                        <td
                            v-for="name, odKey in uniqueOtherDeductionNames"
                            :key="odKey"
                            class="border border-gray-500 h-8 px-2 font-bold text-sm text-center"
                        >
                            {{ useFormatCurrency(uniqueOtherDeductionNameTotals[name]) }}
                        </td>
                        <td
                            class="border border-gray-500 h-8 px-2 font-bold text-sm text-right"
                        >
                            {{ useFormatCurrency(totalDeduct()) }}
                        </td>
                        <td
                            class="bg-yellow-200 border border-gray-500 h-8 px-2 font-bold text-sm text-right"
                        >
                            {{ useFormatCurrency(totalNetpay()) }}
                        </td>
                        <td
                            class="border border-gray-500 h-8 px-2 font-bold text-sm text-right"
                        />
                    </tr>
                </tbody>
            </table>
            <LayoutApprovalsListView :approvals="data.approvals" />
        </div>
    </LayoutPrint>
</template>

<style scoped>

</style>
