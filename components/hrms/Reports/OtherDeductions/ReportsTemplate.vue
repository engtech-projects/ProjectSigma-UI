<script setup>
import { useGenerateReportStore } from "@/stores/hrms/reports/generateReport"
const generateReportstore = useGenerateReportStore()
const { otherDeductionReports } = storeToRefs(generateReportstore)
await generateReportstore.getOtherDeductionsCategoryList()
watch(
    () => otherDeductionReports.value.reportResult.params.report_type,
    (newValue, oldValue) => {
        if (newValue !== oldValue) {
            otherDeductionReports.value.reportResult.list = []
        }
    }
)
watch(
    () => otherDeductionReports.value.reportResult.params.loan_type,
    (newValue, oldValue) => {
        if (newValue !== oldValue) {
            otherDeductionReports.value.reportResult.list = []
        }
    }
)
</script>
<template>
    <LayoutBoards title="Other Deductions Reports">
        <div class="flex flex-row gap-4 p-2">
            <div class="w-full">
                <span class="text-lg">
                    Other Deduction Type:
                </span>
                <select
                    v-model="otherDeductionReports.reportResult.params.loan_type"
                    class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                    <option value="" disabled selected>
                        -Select-
                    </option>
                    <option v-for="category in otherDeductionReports.categoryList.list" :key="category.id" :value="category.otherdeduction_name">
                        {{ category.otherdeduction_name }}
                    </option>
                </select>
            </div>
            <div class="w-full">
                <span class="text-lg">
                    Report Type:
                </span>
                <select
                    v-model="otherDeductionReports.reportResult.params.report_type"
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
            <template v-if="otherDeductionReports.reportResult.params.report_type === 'employee'">
                <HrmsReportsOtherDeductionsDefaultReportEmployeeReport
                    v-show="!['MP2'].includes(otherDeductionReports.reportResult.params.loan_type)"
                />
                <HrmsReportsOtherDeductionsMp2EmployeeReport
                    v-show="otherDeductionReports.reportResult.params.loan_type === 'MP2'"
                />
            </template>
            <template v-else>
                <HrmsReportsOtherDeductionsDefaultReportGroupReport
                    v-show="!['MP2'].includes(otherDeductionReports.reportResult.params.loan_type)"
                />
                <HrmsReportsOtherDeductionsMp2GroupReport
                    v-show="otherDeductionReports.reportResult.params.loan_type === 'MP2'"
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
