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
