<script setup>
import {
    useGenerateReportStore,
    EMPLOYEE_MASTERLIST,
    EMPLOYEE_NEWHIRE,
    EMPLOYEE_TENURESHIP
} from "@/stores/hrms/reports/generateReport"
const generateReportstore = useGenerateReportStore()
const { administrativeReports } = storeToRefs(generateReportstore)
watch(administrativeReports.value.params, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        administrativeReports.value.list = []
    }
})
</script>
<template>
    <LayoutBoards title="Administrative Reports">
        <div class="flex flex-row gap-4 p-2">
            <div class="w-full">
                <span class="text-lg">
                    Report Type:
                </span>
                <select
                    v-model="administrativeReports.params.report_type"
                    class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                    <option :value="EMPLOYEE_TENURESHIP">
                        Employee Tenureship
                    </option>
                    <option :value="EMPLOYEE_MASTERLIST">
                        Employee Masterlist
                    </option>
                    <option :value="EMPLOYEE_NEWHIRE">
                        Employee New Hires
                    </option>
                </select>
            </div>
        </div>
        <div class="p-2">
            <HrmsReportsAdministrativeReportsEmployeeTenureship
                v-show="administrativeReports.params.report_type === EMPLOYEE_TENURESHIP"
            />
            <HrmsReportsAdministrativeReportsEmployeeMasterList
                v-show="administrativeReports.params.report_type === EMPLOYEE_MASTERLIST"
            />
            <HrmsReportsAdministrativeReportsEmployeeNewHire
                v-show="administrativeReports.params.report_type === EMPLOYEE_NEWHIRE"
            />
        </div>
    </LayoutBoards>
</template>

<style scoped>
    .flex-3 {
        flex: 3;
    }
</style>
