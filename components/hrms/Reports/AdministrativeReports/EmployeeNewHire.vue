<script setup>
import { useGenerateReportStore } from "@/stores/hrms/reports/generateReport"
const generateReportstore = useGenerateReportStore()
const { EmployeeNewHire, administrativeReportOption } = storeToRefs(generateReportstore)
watch(EmployeeNewHire.value.params, async () => {
    await generateReportstore.getEmployeeNewHire()
})
const headers = [
    { name: "Employee ID", id: "employee_id" },
    { name: "Name", id: "fullname" },
    { name: "Designation", id: "designation" },
    { name: "Section", id: "section" },
    { name: "Date Hired", id: "date_hired" },
]
</script>
<template>
    <div class="flex flex-col">
        <div class="header flex flex-col mb-8">
            <div class="flex gap-4 flex-row items-center max-w-sm">
                <label class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">DATE FILTER</label>
                <div class="flex-1 justify-center items-center gap-2">
                    <div class="flex justify-start items-center gap-1">
                        <label class="block mb-2 text-[10px] font-normal text-gray-900 dark:text-white italic">FROM:</label>
                        <input v-model="EmployeeNewHire.params.date_from" type="date" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    </div>
                    <div class="flex justify-start items-center gap-1">
                        <label class="block mb-2 text-[10px] font-normal text-gray-900 dark:text-white italic">TO:</label>
                        <input v-model="EmployeeNewHire.params.date_to" type="date" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    </div>
                </div>
            </div>
        </div>
        <LayoutPrint>
            <div class="title flex flex-col justify-center gap-1 mb-12">
                <span v-show="administrativeReportOption.report_type === 'employee-tenureship'" class="text-2xl font-bold text-black text-left">
                    Employee Tenureship Report
                </span>
                <span v-show="administrativeReportOption.report_type === 'employee-masterlist'" class="text-2xl font-bold text-black text-left">
                    Employee Masterlist Report
                </span>
            </div>
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
                <tr v-for="dataValue, index in EmployeeNewHire.list" :key="'EmployeeNewHire' + index" class="h-2">
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
                        {{ dataValue.date_hired }}
                    </td>
                </tr>
            </table>
        </LayoutPrint>
    </div>
</template>
<style scoped>
    .flex-5 {
        flex: 5;
    }
</style>
