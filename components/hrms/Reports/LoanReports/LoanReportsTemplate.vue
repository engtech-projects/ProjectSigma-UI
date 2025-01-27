<script setup>
import {
    useGenerateReportStore,
    LOAN_REPORTS,
    LOAN_HDMF_MPL,
    LOAN_HDMF_MPL_LOAN,
    LOAN_COOP,
    LOAN_SSS,
    LOAN_CALAMITY
} from "@/stores/hrms/reports/generateReport"
const generateReportstore = useGenerateReportStore()
const { loanReports } = storeToRefs(generateReportstore)
await generateReportstore.getLoanCategoryList()
watch(
    () => loanReports.value.reportResult.params.report_type,
    (newValue, oldValue) => {
        if (newValue !== oldValue) {
            loanReports.value.reportResult.list = []
        }
    }
)
watch(
    () => loanReports.value.reportResult.params.loan_type,
    (newValue, oldValue) => {
        if (newValue !== oldValue) {
            loanReports.value.reportResult.list = []
        }
    }
)
</script>
<template>
    <LayoutBoards title="Loan Reports">
        <div class="flex flex-row gap-4 p-2">
            <div class="w-full">
                <span class="text-lg">
                    Loan Type:
                </span>
                <select
                    v-model="loanReports.reportResult.params.loan_type"
                    class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                    <option value="" disabled selected>
                        -Select-
                    </option>
                    <option v-for="category in loanReports.categoryList.list" :key="category.id" :value="category.name">
                        {{ category.name }}
                    </option>
                </select>
            </div>
            <div class="w-full">
                <span class="text-lg">
                    Report Type:
                </span>
                <select
                    v-model="loanReports.reportResult.params.report_type"
                    class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                    <option value="employee">
                        Employee
                    </option>
                    <option value="summary-with-group">
                        Summary with Group
                    </option>
                </select>
            </div>
        </div>
        <div class="p-2">
            <template v-if="loanReports.reportResult.params.report_type === 'employee'">
                <HrmsReportsLoanReportsDefaultReportEmployee
                    v-if="!LOAN_REPORTS.includes(loanReports.reportResult.params.loan_type)"
                />
                <HrmsReportsLoanReportsSssLoanEmployeePayment
                    v-if="loanReports.reportResult.params.loan_type === LOAN_SSS"
                />
                <HrmsReportsLoanReportsHdmfLoanEmployeePayment
                    v-if="loanReports.reportResult.params.loan_type === LOAN_HDMF_MPL
                        || loanReports.reportResult.params.loan_type === LOAN_HDMF_MPL_LOAN"
                />
                <HrmsReportsLoanReportsCoopLoanEmployeePayment
                    v-if="loanReports.reportResult.params.loan_type === LOAN_COOP"
                />
                <HrmsReportsLoanReportsHdmfCalamityLoanEmployee
                    v-if="loanReports.reportResult.params.loan_type === LOAN_CALAMITY"
                />
            </template>
            <template v-else>
                <HrmsReportsLoanReportsDefaultReportGroup
                    v-if="!LOAN_REPORTS.includes(loanReports.reportResult.params.loan_type)"
                />
                <HrmsReportsLoanReportsSssLoanEmployeeSummaryWithGroup
                    v-if="loanReports.reportResult.params.loan_type === LOAN_SSS"
                />
                <HrmsReportsLoanReportsHdmfLoanEmployeeSummaryWithGroup
                    v-if="loanReports.reportResult.params.loan_type === LOAN_HDMF_MPL
                        || loanReports.reportResult.params.loan_type === LOAN_HDMF_MPL_LOAN"
                />
                <HrmsReportsLoanReportsCoopLoanEmployeeSummaryWithGroup
                    v-if="loanReports.reportResult.params.loan_type === LOAN_COOP"
                />
                <HrmsReportsLoanReportsHdmfCalamityLoanGroup
                    v-if="loanReports.reportResult.params.loan_type === LOAN_CALAMITY"
                />
            </template>
        </div>
    </LayoutBoards>
</template>

<style scoped>
    .flex-3 {
        flex: 3;
    }
</style>
