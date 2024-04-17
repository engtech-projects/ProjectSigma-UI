<script setup>
import { usePersonelActionNotice } from "@/stores/hrms/pan"
const pan = usePersonelActionNotice()

pan.personelActionNotice.type_of_termination = "Voluntary"
pan.personelActionNotice.reasons_for_termination = "Violation"
pan.personelActionNotice.eligible_for_rehire = "No"
</script>
<template>
    <tr>
        <td colspan="4">
            <label
                for="small-input"
                class="flex text-md font-medium text-blue-700 dark:text-white p-2"
            >EMPLOYEE TERMINATION DATA </label>
        </td>
    </tr>
    <tr>
        <td colspan="4" class="border border-slate-300 p-2">
            <div class="md:flex gap-2 space-x-2 p-2">
                <input id="terminationVoluntary" v-model="pan.personelActionNotice.type_of_termination" class="" type="radio" value="Voluntary">
                <label
                    for="terminationVoluntary"
                    class="mr-4 text-xs text-gray-900 dark:text-gray-300"
                >VOLUNTARY</label>
                <input id="terminationInvoluntary" v-model="pan.personelActionNotice.type_of_termination" class="" type="radio" value="Involuntary">
                <label
                    for="terminationInvoluntary"
                    class="mr-4 text-xs text-gray-900 dark:text-gray-300"
                >INVOLUNTARY</label>
            </div>
        </td>
    </tr>
    <tr>
        <td colspan="4">
            <label
                for="small-input"
                class="flex text-md font-medium text-blue-700 dark:text-white p-2"
            >REASONS FOR TERMINATION <span class="text-gray-700">{{ pan.personelActionNotice.reasons_for_termination }}</span></label>
        </td>
    </tr>
    <tr>
        <td colspan="4" class="border border-slate-300 p-2">
            <div class="md:flex gap-2 space-x-2 p-2">
                <input id="noticeForReasonViolation" v-model="pan.personelActionNotice.reasons_for_termination" class="" type="radio" value="Violation">
                <label
                    for="noticeForReasonViolation"
                    class="mr-4 text-xs text-gray-900 dark:text-gray-300"
                >VIOLATION</label>
                <input id="noticeForReasonSanctions" v-model="pan.personelActionNotice.reasons_for_termination" class="" type="radio" value="Sanctions">
                <label
                    for="noticeForReasonSanctions"
                    class="mr-4 text-xs text-gray-900 dark:text-gray-300"
                >SANCTIONS</label>
                <input id="noticeForReasonForceResign" v-model="pan.personelActionNotice.reasons_for_termination" class="" type="radio" value="Force Resign">
                <label
                    for="noticeForReasonForceResign"
                    class="mr-4 text-xs text-gray-900 dark:text-gray-300"
                >FORCED RESIGN</label>
            </div>
        </td>
    </tr>
    <tr>
        <td colspan="2" class="border border-slate-300 p-2">
            <div>
                <label
                    for="small-input"
                    class="inline mb-2 text-[11px] font-medium text-gray-900 dark:text-white"
                >Eligible for Rehire: {{ pan.personelActionNotice.eligible_for_rehire }}</label>

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
