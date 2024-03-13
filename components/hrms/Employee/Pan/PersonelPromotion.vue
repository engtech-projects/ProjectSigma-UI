<script setup>
import { usePersonelActionNotice } from "@/stores/hrms/pan"
const pan = usePersonelActionNotice()
</script>
<template>
    <tr>
        <td colspan="4">
            <label
                for="small-input"
                class="flex text-md font-medium text-blue-700 dark:text-white p-2"
            >EMPLOYEE STATUS: </label>
        </td>
    </tr>
    <tr>
        <td colspan="4" class="border border-slate-300 p-2">
            <div class="md:flex gap-2 space-x-2 p-2">
                <input id="probationary" v-model="pan.personelActionNotice.new_employment_status" class="" type="radio" value="Probationary">
                <label
                    for="probationary"
                    class="mr-4 text-xs text-gray-900 dark:text-gray-300"
                >PROBATIONARY</label>
                <input id="regularization" v-model="pan.personelActionNotice.new_employment_status" class="" type="radio" value="Regularization">
                <label
                    for="regularization"
                    class="mr-4 text-xs text-gray-900 dark:text-gray-300"
                >REGULARIZATION</label>
                <input id="weekly" v-model="pan.personelActionNotice.new_employment_status" class="" type="radio" value="Project Base">
                <label
                    for="weekly"
                    class="text-xs text-gray-900 dark:text-gray-300"
                >WEEKLY</label>
                <input id="projectBased" v-model="pan.personelActionNotice.new_employment_status" type="radio" value="projectBased">
                <label
                    for="projectBased"
                    class="text-xs text-gray-900 dark:text-gray-300"
                >PROJECT BASED</label>
            </div>
        </td>
    </tr>
</template>
