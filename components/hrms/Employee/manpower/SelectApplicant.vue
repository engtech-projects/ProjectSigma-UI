<script lang="ts" setup>
import { storeToRefs } from "pinia"
import { useJobapplicantStore } from "@/stores/hrms/employee/jobapplicant"
const jobApplicant = useJobapplicantStore()
const { allApplicantList } = storeToRefs(jobApplicant)
onMounted(() => {
    if (!allApplicantList.value.isLoaded) {
        jobApplicant.getJobApplicants()
    }
})
const compId = useId()
const model = defineModel({ required: true, type: String, default: null })
</script>
<template>
    <div v-if="allApplicantList.isLoaded" class="PsSelectInput">
        <select
            :id="compId"
            v-model="model"
            class="w-[120px] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block"
        >
            <option
                v-for="option, i in allApplicantList.list"
                :key="i"
                :value="option.id"
            >
                {{ option.fullname_last }}
            </option>
        </select>
    </div>
    <div v-else class="PsSelectInput">
        <select
            v-model="model"
            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block"
        >
            <option>
                No Data
            </option>
        </select>
    </div>
</template>
