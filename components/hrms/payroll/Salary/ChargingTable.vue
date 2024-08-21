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
                            {{ data.fullname_last }}
                        </td>
                        <td class="p-4 border-solid border border-slate-400">
                            <p v-for="(charge, chargeIndex) in data.payroll_records.chargings" :key="index+'_charge_'+chargeIndex">
                                {{ charge.name }} ({{ charge.charging_name ?? "No Name Found" }}): {{ charge.amount }}
                            </p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
