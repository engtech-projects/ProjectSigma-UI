<script setup lang="ts">
defineProps({
    payrollRequest: {
        type: Object,
        required: true,
    },
})
</script>
<template>
    <div class="mt-4 details flex flex-cols justify-between p-2 sm:px-2 bg-sky-100 border-b-4 border-red-500">
        <div class="sticky top-0 text-xl leading-6 font-normal text-gray-900 uppercase">
            Charging
        </div>
    </div>
    <div class="border-t border-gray-200">
        <div class="flex justify-between p-2">
            <div class="text-md leading-6 font-medium text-gray-900" />
            <div class="text-md leading-6 font-medium text-gray-900">
                Period Covered: <strong>{{ useFormatDateRange(payrollRequest.cutoff_start, payrollRequest.cutoff_end) }}</strong>
            </div>
        </div>
    </div>
    <div>
        <div class="relative overflow-x-auto shadow-md">
            <table class="w-full text-sm text-center text-gray-50 pb-4">
                <thead
                    class="text-xs text-black uppercase bg-sky-50 dark:bg-gray-950"
                >
                    <tr>
                        <th
                            scope="col"
                            class="p-2 border-solid border border-slate-400"
                        >
                            No
                        </th>
                        <th
                            scope="col"
                            class="p-2 border-solid border border-slate-400 bg-sky-200"
                        >
                            Name
                        </th>
                        <th
                            scope="col"
                            class="p-2 border-solid border border-slate-400 bg-sky-200"
                        >
                            Chargings
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(data, index) in payrollRequest.payroll_details" :key="index" class="bg-white border-b text-gray-950">
                        <td class="p-4 border-solid border border-slate-400">
                            {{ index + 1 }}
                        </td>
                        <td class="p-4 border-solid border border-slate-400">
                            {{ data.fullname_last || data.employee.fullname_last }}
                        </td>
                        <td class="p-4 border-solid border border-slate-400 ">
                            <template v-if="data.payroll_records?.chargings">
                                <div v-for="(charge, chargeIndex) in data.payroll_records.chargings" :key="index+'_charge_'+chargeIndex" class="flex flex-col">
                                    {{ charge.name }}
                                    <template v-if="useCheckAccessibility([AccessibilityTypes.hrms_payroll_salary_generate_payroll_change_of_charging])">
                                        <div class="flex flex-row gap-4 justify-center items-center mt-4 mb-4">
                                            <HrmsReportsAdministrativeReportsAllDepartmentProjectSelector
                                                v-model:select-type="data.payroll_records.chargings[chargeIndex].charge_type"
                                                v-model:department-id="data.payroll_records.chargings[chargeIndex].charge_id"
                                                v-model:project-id="data.payroll_records.chargings[chargeIndex].charge_id"
                                                :use-class-charge-type="true"
                                                title="Category:"
                                            />
                                            {{ useFormatCurrency(charge.amount) }}
                                        </div>
                                    </template>
                                    <template v-else>
                                        <p class="mt-4">
                                            ( {{ charge.charging_name ?? "No Name Found" }} ): {{ useFormatCurrency(charge.amount) }}
                                        </p>
                                    </template>
                                </div>
                            </template>
                            <template v-else>
                                <p v-for="(charge, chargeIndex) in data.charges" :key="index+'_charge_'+chargeIndex" class="mt-4">
                                    {{ charge.name }} ({{ charge.charging_name ?? "No Name Found" }}): {{ useFormatCurrency(charge.amount) }}
                                </p>
                            </template>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
