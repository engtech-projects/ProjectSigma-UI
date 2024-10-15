<script setup>
import { usePersonelActionNotice } from "@/stores/hrms/pan"
const pan = usePersonelActionNotice()

pan.personelActionNotice.type_of_termination = "Voluntary"
pan.personelActionNotice.reasons_for_termination = "Violation"
pan.personelActionNotice.eligible_for_rehire = "No"
</script>
<template>
    <tr class="border border-slate-300 p-2">
        <td colspan="4">
            <label
                for="small-input"
                class="flex justify-center text-md font-medium text-blue-700 dark:text-white"
            >
                TERMINATION DATA
            </label>
        </td>
    </tr>
    <tr>
        <td colspan="2" class="border border-slate-300 p-2">
            <div>
                <label
                    for="transferDepartment"
                    class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white"
                >Termination Type</label>
                <HrmsCommonEmploymentTerminationTypeSelector v-model="pan.personelActionNotice.type_of_termination" />
            </div>
        </td>
        <td colspan="2" class="border border-slate-300 p-2">
            <div>
                <label
                    for="transferDepartment"
                    class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white"
                >Termination Reason</label>
                <HrmsCommonEmploymentTerminationReasonSelector v-model="pan.personelActionNotice.reasons_for_termination" />
            </div>
        </td>
    </tr>
    <tr>
        <td colspan="2" class="border border-slate-300 p-2">
            <div>
                <label
                    for="small-input"
                    class="inline mb-2 text-[11px] font-medium text-gray-900 dark:text-white"
                >Eligible for Rehire:</label>

                <div class="space-x-2">
                    <input id="yes" v-model="pan.personelActionNotice.eligible_for_rehire" type="radio" value="Yes">
                    <label
                        for="yes"
                        class="mr-4 text-xs text-gray-900 dark:text-gray-300"
                    >Yes</label>
                    <input id="no" v-model="pan.personelActionNotice.eligible_for_rehire" type="radio" value="No">
                    <label
                        for="no"
                        class="mr-4 text-xs text-gray-900 dark:text-gray-300"
                    >No</label>
                </div>
            </div>
        </td>
        <td colspan="2" class="border border-slate-300 p-2">
            <div>
                <label
                    for="small-input"
                    class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white"
                >Last Day Worked:</label>
                <input
                    id="small-input"
                    v-model="pan.personelActionNotice.last_day_worked"
                    type="date"
                    class="block w-full p-2 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
            </div>
        </td>
    </tr>
</template>
