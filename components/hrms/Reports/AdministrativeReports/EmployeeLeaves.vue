<script setup>
import { useGenerateReportStore } from "@/stores/hrms/reports/generateReport"
const generateReportstore = useGenerateReportStore()
const { administrativeReports } = storeToRefs(generateReportstore)
const headers = [
    { name: "NO", id: "" },
    { name: "Employee ID", id: "employee_id" },
    { name: "Name", id: "fullname" },
    { name: "Designation", id: "designation" },
    { name: "Section", id: "section" },
    { name: "Total Days Leaves", id: "total_days_leaves" },
]
</script>
<template>
    <div class="flex flex-col">
        <div class="header flex flex-col">
            <div class="w-max flex flex-row gap-4 mb-12">
                <HrmsReportsAdministrativeReportsAllDepartmentProjectSelector
                    v-model:select-type="administrativeReports.params.group_type"
                    v-model:department-id="administrativeReports.params.department_id"
                    v-model:project-id="administrativeReports.params.project_id"
                    title="Category:"
                />
                <div class="flex gap-4 flex-col max-w-sm">
                    <label class="block text-sm font-medium text-gray-900">Date Filter:</label>
                    <div class="flex flex-row gap-4">
                        <div class="flex justify-start items-center gap-2">
                            <label class="block mb-2 text-[12px] font-normal text-gray-900 dark:text-white italic">FROM:</label>
                            <input v-model="administrativeReports.params.date_from" type="date" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                        <div class="flex justify-start items-center gap-2">
                            <label class="block mb-2 text-[12px] font-normal text-gray-900 dark:text-white italic">TO:</label>
                            <input v-model="administrativeReports.params.date_to" type="date" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <LayoutPrint>
            <LayoutLoadingContainer :loading="administrativeReports.isLoading">
                <table class="printTable table-auto w-full border-collapse border border-gray-500 mb-20">
                    <thead class="text-blue-600 text-md">
                        <tr class="py-4">
                            <th
                                v-for="header in headers"
                                :key="header.name+'headerRow'"
                                class="px-2 py-4 border-gray-500 border"
                                :class="header.style ?? ''"
                            >
                                {{ header.name }}
                            </th>
                        </tr>
                    </thead>
                    <tr v-for="dataValue, index in administrativeReports.list" :key="'EmployeeNewHire' + index" class="h-2">
                        <td class="border border-gray-500 h-8 py-1 px-2 text-sm text-center">
                            {{ index + 1 }}
                        </td>
                        <td class="border border-gray-500 h-8 py-1 px-2 text-sm text-center">
                            {{ dataValue.employee_id }}
                        </td>
                        <td class="border border-gray-500 h-8 py-1 px-2 text-sm text-center">
                            {{ dataValue.fullname }}
                        </td>
                        <td class="border border-gray-500 h-8 py-1 px-2 text-sm text-center">
                            {{ dataValue.designation }}
                        </td>
                        <td class="border border-gray-500 h-8 py-1 px-2 text-sm text-center">
                            {{ dataValue.section }}
                        </td>
                        <td class="border border-gray-500 h-8 py-1 px-2 text-sm text-center">
                            {{ dataValue.total_days_leaves }}
                        </td>
                    </tr>
                </table>
            </LayoutLoadingContainer>
        </LayoutPrint>
    </div>
</template>
<style scoped>
    .flex-5 {
        flex: 5;
    }
</style>
