<script setup>
import { useGenerateReportStore } from "@/stores/hrms/reports/generateReport"
const generateReportstore = useGenerateReportStore()
const { loanReportOption } = storeToRefs(generateReportstore)

</script>
<template>
    <LayoutBoards title="Loan Reports">
        <div class="flex flex-row gap-4 p-2">
            <div class="w-full">
                <span class="text-lg">
                    Loan Type:
                </span>
                <select
                    v-model="loanReportOption.loan_type"
                    class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                    <option value="" disabled selected>
                        -Select-
                    </option>
                    <option value="SSS LOAN">
                        SSS Loans
                    </option>
                    <option value="HDMF MPL">
                        HDMF Loans
                    </option>
                    <option value="COOP LOAN">
                        Coop Loans
                    </option>
                    <option value="HDMF CALAMITY LOAN">
                        HDMF CALAMITY LOAN
                    </option>
                </select>
            </div>
            <div class="w-full">
                <span class="text-lg">
                    Group Type:
                </span>
                <select
                    v-model="loanReportOption.group_type"
                    class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                    <option value="" disabled selected>
                        -Select-
                    </option>
                    <option value="individual">
                        By Employee
                    </option>
                    <option value="group">
                        By Group
                    </option>
                </select>
            </div>
            <div class="w-full">
                <span class="text-lg">
                    Report Type:
                </span>
                <select
                    v-model="loanReportOption.report_type"
                    class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                    <option value="payment-loan">
                        Payments Loan
                    </option>
                    <option value="loan-payment-summary">
                        Loan Payments Summary
                    </option>
                </select>
            </div>
        </div>
        <div class="p-2">
            <HrmsReportsLoanReportsSssLoanEmployeePayment
                v-show="loanReportOption.loan_type === 'SSS LOAN'
                    && loanReportOption.group_type === 'individual'
                    && loanReportOption.report_type === 'payment-loan'"
            />
            <HrmsReportsLoanReportsSssLoanEmployeePaymentSummary
                v-show="loanReportOption.loan_type === 'SSS LOAN'
                    && loanReportOption.group_type === 'individual'
                    && loanReportOption.report_type === 'loan-payment-summary'"
            />
            <HrmsReportsLoanReportsSssLoanGroupPayment
                v-show="loanReportOption.loan_type === 'SSS LOAN'
                    && loanReportOption.group_type === 'group'
                    && loanReportOption.report_type === 'payment-loan'"
            />
            <HrmsReportsLoanReportsSssLoanGroupPaymentSummary
                v-show="loanReportOption.loan_type === 'SSS LOAN'
                    && loanReportOption.group_type === 'group'
                    && loanReportOption.report_type === 'loan-payment-summary'"
            />
            <HrmsReportsLoanReportsHdmfLoanEmployeePayment
                v-show="loanReportOption.loan_type === 'HDMF MPL'
                    && loanReportOption.group_type === 'individual'
                    && loanReportOption.report_type === 'payment-loan'"
            />
            <HrmsReportsLoanReportsHdmfLoanEmployeePayment
                v-show="loanReportOption.loan_type === 'HDMF MPL'
                    && loanReportOption.group_type === 'individual'
                    && loanReportOption.report_type === 'loan-payment-summary'"
            />
            <HrmsReportsLoanReportsHdmfLoanGroupPayment
                v-show="loanReportOption.loan_type === 'HDMF MPL'
                    && loanReportOption.group_type === 'group'
                    && loanReportOption.report_type === 'payment-loan'"
            />
            <HrmsReportsLoanReportsHdmfLoanGroupPaymentSummary
                v-show="loanReportOption.loan_type === 'HDMF MPL'
                    && loanReportOption.group_type === 'group'
                    && loanReportOption.report_type === 'loan-payment-summary'"
            />
        </div>
    </LayoutBoards>
</template>

<style scoped>
    .flex-3 {
        flex: 3;
    }
</style>
