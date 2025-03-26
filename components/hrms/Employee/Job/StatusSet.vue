<script setup>
import { STATUS } from "@/stores/hrms/employee/jobapplicant"

const processingChecklist = defineModel("processingChecklist", { required: true })
const remarks = defineModel("remarks", { required: true, type: String })
const hiringStatus = defineModel("hiringStatus", { required: true, type: String })
</script>
<template>
    <div class="flex flex-col gap-4 m-1">
        <div class="flex flex-row">
            <div class="flex flex-col w-full items-start list-none">
                <li v-for="(value, key) in processingChecklist" :key="key">
                    <label>
                        <input v-model="processingChecklist[key]" type="checkbox"> {{ key }}
                    </label>
                </li>
            </div>
            <div class="w-full flex items-center gap-2">
                <textarea v-model="remarks" class="w-full" type="text" />
            </div>
        </div>
        <div class="w-full flex items-center gap-2">
            <select
                v-model="hiringStatus"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-cyan-500 focus:outline-none focus:ring-0 focus:border-cyan-600 peer"
            >
                <option value="select" disabled selected>
                    -- Select --
                </option>
                <option v-for="stat in STATUS" :key="stat" :value="stat">
                    {{ stat }}
                </option>
            </select>
        </div>
    </div>
</template>
