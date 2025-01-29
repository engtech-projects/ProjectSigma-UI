<script setup>
import { useGenerateReportStore } from "@/stores/hrms/reports/generateReport"
const generateReportstore = useGenerateReportStore()
const { administrativeReports } = storeToRefs(generateReportstore)
</script>
<template>
    <div class="flex flex-col">
        <div class="w-max mb-12">
            <HrmsReportsAdministrativeReportsAllDepartmentProjectSelector
                v-model:select-type="administrativeReports.params.group_type"
                v-model:department-id="administrativeReports.params.department_id"
                v-model:project-id="administrativeReports.params.project_id"
                title="Category:"
            />
        </div>
        <LayoutPrint>
            <LayoutLoadingContainer :loading="administrativeReports.isLoading">
                <table class="printTable border border-gray-500 mb-20">
                    <thead class="text-blue-600 text-md">
                        <tr class="py-4">
                            <th rowspan="2" class="py-4 border-gray-500 border">
                                NO.
                            </th>
                            <th rowspan="2" class="py-4 border-gray-500 border">
                                NAME
                            </th>
                            <th class="border border-gray-500">
                                DATE HIRED
                            </th>
                            <th class="border border-gray-500">
                                DESIGNATION
                            </th>
                            <th class="border border-gray-500">
                                TERNURE (ECDC)
                            </th>
                        </tr>
                    </thead>
                    <tbody class="text-sm">
                        <tr v-for="reportData, index in administrativeReports.list" :key="'EmployeeTenureship' + index" class="h-2">
                            <td class="border border-gray-500 = h-8 px-2 text-sm text-center">
                                {{ index + 1 }}
                            </td>
                            <td class="border border-gray-500 = h-8 px-2 text-sm">
                                {{ reportData.employee_name }}
                            </td>
                            <td class="border border-gray-500 = h-8 px-2 text-sm text-center">
                                {{ reportData.date_hired }}
                            </td>
                            <td class="border border-gray-500 = h-8 px-2 text-sm text-right">
                                {{ reportData.designation }}
                            </td>
                            <td class="border border-gray-500 = h-8 px-2 text-sm text-right">
                                {{ reportData.ternure_ecdc }}
                            </td>
                        </tr>
                    </tbody>
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
