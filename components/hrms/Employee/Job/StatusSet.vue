<script setup>
import { STATUS } from "@/stores/employee/jobapplicant"

const status = defineModel("status", { required: true, type: String })
const remarks = defineModel("remarks", { required: true, type: String })
</script>
<template>
    <div class="flex  gap-3">
        <div class="flex items-center gap-2">
            <label for="">Status:</label>
            <select
                v-model="status"
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
        <div class="flex items-center gap-2">
            <label for="">Remarks:</label>
            <textarea v-model="remarks" type="text" />
        </div>
    </div>
</template>
