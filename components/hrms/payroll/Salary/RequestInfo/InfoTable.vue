<script setup lang="ts">
const props = defineProps({
    payrollRequest: {
        type: Object,
        required: true,
    }
})
const totalAdjustments = () => {
    let total = 0
    props.payrollRequest.payroll_details.forEach((element: any) => {
        if (Array.isArray(element.adjustments)) {
            element.adjustments.forEach((adjustment: any) => {
                total += parseFloat(adjustment.amount) || 0
            })
        }
    })
    return total.toFixed(2)
}
// const totalLoansPayroll = () => {
//     let total = 0
//     props.payrollRequest.payroll_details.forEach((element: any) => {
//         const salaryDeduction = element.payroll_records.salary_deduction
//         total += parseFloat(salaryDeduction.cash_advance.total_paid) || 0
//         total += parseFloat(salaryDeduction.loan.total_paid) || 0
//         total += parseFloat(salaryDeduction.other_deductions.total_paid) || 0
//     })
//     return total.toFixed(2)
// }
// const totalCashAdvancePayroll = () => {
//     let total = 0
//     props.payrollRequest.payroll_details.forEach((element: any) => {
//         total += parseFloat(element.payroll_records.salary_deduction.cash_advance)
//     })
//     return total.toFixed(2)
// }
// const totalOtherDeductionsPayroll = () => {
//     let total = 0
//     props.payrollRequest.payroll_details.forEach((element: any) => {
//         if (Array.isArray(element.payroll_records.salary_deduction.other_deductions.other_deduction)) {
//             element.payroll_records.salary_deduction.other_deductions.other_deduction.forEach((otherDed: any) => {
//                 total += parseFloat(otherDed.installment_deduction) || 0
//             })
//         }
//     })
//     return total.toFixed(2)
// }
const totalNetPayPayroll = () => {
    let total = 0
    props.payrollRequest.payroll_details.forEach((element: any) => {
        total += parseFloat(element.net_pay)
    })
    return total.toFixed(2)
}
const totalDeductionPayroll = () => {
    let total = 0
    props.payrollRequest.payroll_details.forEach((element: any) => {
        total += parseFloat(element.total_deduct)
    })
    return total.toFixed(2)
}
const totalEWTCPayroll = () => {
    let total = 0
    props.payrollRequest.payroll_details.forEach((element: any) => {
        total += parseFloat(element.withholdingtax_contribution)
    })
    return total.toFixed(2)
}
const totalHDMFEmployeePayroll = () => {
    let total = 0
    props.payrollRequest.payroll_details.forEach((element: any) => {
        total += parseFloat(element.pagibig_employee_contribution) || 0
    })
    return total.toFixed(2)
}
const totalPHICEmployeePayroll = () => {
    let total = 0
    props.payrollRequest.payroll_details.forEach((element: any) => {
        total += parseFloat(element.philhealth_employee_contribution) || 0
    })
    return total.toFixed(2)
}
const totalSSSContributionEmployeePayroll = () => {
    let total = 0
    props.payrollRequest.payroll_details.forEach((element: any) => {
        total += parseFloat(element.sss_employee_contribution) || 0
    })
    return total.toFixed(2)
}
const totalSSSCompensationEmployeePayroll = () => {
    let total = 0
    props.payrollRequest.payroll_details.forEach((element: any) => {
        total += parseFloat(element.sss_employee_compensation) || 0
    })
    return total.toFixed(2)
}
const totalSSSWispEmployeePayroll = () => {
    let total = 0
    props.payrollRequest.payroll_details.forEach((element: any) => {
        total += parseFloat(element.sss_employee_wisp) || 0
    })
    return total.toFixed(2)
}
const totalGrossPayPayroll = () => {
    let total = 0
    props.payrollRequest.payroll_details.forEach((element: any) => {
        total += parseFloat(element.gross_pay)
    })
    return total.toFixed(2)
}
const totalSpcHolOTPayroll = () => {
    let total = 0
    props.payrollRequest.payroll_details.forEach((element: any) => {
        total += parseFloat(element.special_holiday_ot_pay)
    })
    return total.toFixed(2)
}
const totalRegHolOTPayroll = () => {
    let total = 0
    props.payrollRequest.payroll_details.forEach((element: any) => {
        total += parseFloat(element.regular_holiday_ot_pay)
    })
    return total.toFixed(2)
}
const totalRestDayOTPayroll = () => {
    let total = 0
    props.payrollRequest.payroll_details.forEach((element: any) => {
        total += parseFloat(element.rest_ot_pay)
    })
    return total.toFixed(2)
}
const totalRegOTPayroll = () => {
    let total = 0
    props.payrollRequest.payroll_details.forEach((element: any) => {
        total += parseFloat(element.regular_ot_pay)
    })
    return total.toFixed(2)
}
const totalSpcHolPayroll = () => {
    let total = 0
    props.payrollRequest.payroll_details.forEach((element: any) => {
        total += parseFloat(element.special_holiday_pay) || 0
    })
    return total.toFixed(2)
}
const totalRegHolPayroll = () => {
    let total = 0
    props.payrollRequest.payroll_details.forEach((element: any) => {
        total += parseFloat(element.regular_holiday_pay) || 0
    })
    return total.toFixed(2)
}
const totalRestDayPayroll = () => {
    let total = 0
    props.payrollRequest.payroll_details.forEach((element: any) => {
        total += parseFloat(element.rest_pay) || 0
    })
    return total.toFixed(2)
}
const totalRegHrsPayroll = () => {
    let total = 0
    props.payrollRequest.payroll_details.forEach((element: any) => {
        total += parseFloat(element.regular_pay) || 0
    })
    return total.toFixed(2)
}
const uniqueLoanNames = computed(() => {
    const loanNames = new Set()
    props.payrollRequest.payroll_details.forEach((element: any) => {
        element.deductions.forEach((deduction: { type: string; name: string }) => {
            if (deduction.type === "Loan") {
                loanNames.add(deduction.name)
            }
        })
    })
    return Array.from(loanNames)
})
const uniqueOtherDeductionNames = computed(() => {
    const loanNames = new Set()
    props.payrollRequest.payroll_details.forEach((element: any) => {
        element.deductions.forEach((deduction: { type: string; name: string }) => {
            if (deduction.type === "Other Deduction") {
                loanNames.add(deduction.name)
            }
        })
    })
    return Array.from(loanNames)
})
const uniqueLoanNameTotals = computed(() => {
    const loanNameTotals: any[] = []
    uniqueLoanNames.value.forEach((name: string) => {
        let total = 0
        props.payrollRequest.payroll_details.forEach((element: any) => {
            element.deductions.forEach((deduction: { type: string; name: string; amount: number }) => {
                if (deduction.type === "Loan" && deduction.name === name) {
                    total += deduction.amount
                }
            })
        })
        loanNameTotals[name] = total
    })
    return loanNameTotals
})
const uniqueOtherDeductionNameTotals = computed(() => {
    const loanNameTotals: any[] = []
    uniqueOtherDeductionNames.value.forEach((name: string) => {
        let total = 0
        props.payrollRequest.payroll_details.forEach((element: any) => {
            element.deductions.forEach((deduction: { type: string; name: string; amount: number }) => {
                if (deduction.type === "Other Deduction" && deduction.name === name) {
                    total += deduction.amount
                }
            })
        })
        loanNameTotals[name] = total
    })
    return loanNameTotals
})
const totalCashadvancePayroll = computed(() => {
    let total = 0
    props.payrollRequest.payroll_details.forEach((element: any) => {
        element.deductions.forEach((deduction: { type: string; name: string; amount: number }) => {
            if (deduction.type === "Cash Advance") {
                total += deduction.amount
            }
        })
    })
    return total
})
</script>
<template>
    <div class="details flex flex-cols justify-between p-2 sm:px-2 bg-sky-100 border-b-4 border-red-500">
        <div class="sticky top-0 text-xl leading-6 font-normal text-gray-900 uppercase">
            {{ payrollRequest.release_type.toUpperCase() }}
        </div>
        <div class="sticky top-0 text-xl leading-6 font-normal text-gray-900">
            Payroll
        </div>
    </div>
    <div class="border-t border-gray-200">
        <div class="flex justify-between p-2">
            <div class="text-md leading-6 font-medium text-gray-900">
                {{ payrollRequest.charging_type }}: <strong>{{ payrollRequest.charging_name }}</strong>
            </div>
            <div class="text-md leading-6 font-medium text-gray-900">
                Period Covered: <strong>{{ useFormatDateRange(payrollRequest.cutoff_start, payrollRequest.cutoff_end) }}</strong>
            </div>
        </div>
    </div>
    <table class="w-full text-sm text-center text-gray-50 pb-4">
        <HrmsPayrollSalaryPayrollInfoTableHeader
            :loans="uniqueLoanNames"
            :otherdeductions="uniqueOtherDeductionNames"
        />
        <tbody>
            <HrmsPayrollSalaryRequestInfoTableRow
                v-for="(data,index) in payrollRequest.payroll_details"
                :key="'PayrollRow'+index"
                :employee-payroll-record="data"
                :index="index+1"
                :loans="uniqueLoanNames"
                :otherdeductions="uniqueOtherDeductionNames"
            />
            <!-- Final Row -->
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
                    {{ useFormatCurrency(totalRegHrsPayroll()) }}
                </td>
                <td>
                    {{ useFormatCurrency(totalRestDayPayroll()) }}
                </td>
                <td>
                    {{ useFormatCurrency(totalRegHolPayroll()) }}
                </td>
                <td>
                    {{ useFormatCurrency(totalSpcHolPayroll()) }}
                </td>
                <td>
                    {{ useFormatCurrency(totalRegOTPayroll()) }}
                </td>
                <td>
                    {{ useFormatCurrency(totalRestDayOTPayroll()) }}
                </td>
                <td>
                    {{ useFormatCurrency(totalRegHolOTPayroll()) }}
                </td>
                <td>
                    {{ useFormatCurrency(totalSpcHolOTPayroll()) }}
                </td>
                <td>
                    {{ useFormatCurrency(totalAdjustments()) }}
                </td>
                <td>
                    {{ useFormatCurrency(totalGrossPayPayroll()) }}
                </td>
                <td>
                    {{ totalSSSContributionEmployeePayroll() ? useFormatCurrency(totalSSSContributionEmployeePayroll()) : "-" }}
                </td>
                <td>
                    {{ totalSSSCompensationEmployeePayroll() ? useFormatCurrency(totalSSSCompensationEmployeePayroll()) : "-" }}
                </td>
                <td>
                    {{ totalSSSWispEmployeePayroll() ? useFormatCurrency(totalSSSWispEmployeePayroll()) : "-" }}
                </td>
                <td>
                    {{ useFormatCurrency(totalPHICEmployeePayroll()) ?? "-" }}
                </td>
                <td>
                    {{ useFormatCurrency(totalHDMFEmployeePayroll()) ?? "-" }}
                </td>
                <td>
                    {{ useFormatCurrency(totalEWTCPayroll()) }}
                </td>
                <td>
                    {{ useFormatCurrency(totalCashadvancePayroll) }}
                </td>
                <td v-for="deduction in uniqueLoanNames" :key="deduction">
                    {{ useFormatCurrency(uniqueLoanNameTotals[deduction]) }}
                </td>
                <td v-for="deduction in uniqueOtherDeductionNames" :key="deduction">
                    {{ useFormatCurrency(uniqueOtherDeductionNameTotals[deduction]) }}
                </td>
                <td>
                    <strong>{{ useFormatCurrency(totalDeductionPayroll()) }}</strong>
                </td>
                <td>
                    <strong>{{ useFormatCurrency(totalNetPayPayroll()) }}</strong>
                </td>
                <td />
            </tr>
        </tbody>
    </table>
</template>
