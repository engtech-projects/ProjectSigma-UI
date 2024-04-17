<script  setup>
import { storeToRefs } from "pinia"
import { usePhilhealthStore } from "@/stores/hrms/setup/philhealth"

const contributions = usePhilhealthStore()
const { isEdit } = storeToRefs(contributions)
contributions.getContribution()

useHead({
    title: "PhilHealth",
})

</script>

<template>
    <div class="flex flex-col mt-10 md:mt-0 md:flex-row gap-4">
        <HrmsPhilhealthAddContribution v-show="!isEdit" />
        <HrmsPhilhealthEditContribution v-show="isEdit" />
        <HrmsPhilhealthContributionList />
    </div>
</template>
