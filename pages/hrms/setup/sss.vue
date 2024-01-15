<script  setup>
import { storeToRefs } from "pinia"
import { useContributionStore } from "@/stores/sss"

const contributions = useContributionStore()
const { isEdit } = storeToRefs(contributions)
contributions.getContribution()

definePageMeta({
    layout: "default",
})
useHead({
    title: "SSS",
})

</script>

<template>
    <div class="flex flex-col mt-10 md:mt-0 md:flex-row gap-4">
        <HrmsSSSAddContribution v-show="!isEdit" />
        <HrmsSSSEditContribution v-show="isEdit" />
        <HrmsSSSContributionList />
    </div>
</template>
