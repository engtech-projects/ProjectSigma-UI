<script setup>
import { storeToRefs } from "pinia"
import { useContributionStore } from "@/stores/hrms/setup/sss"

const contributions = useContributionStore()
const { isEdit } = storeToRefs(contributions)
contributions.getContribution()

useHead({
    title: "SSS",
})

</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.hrms_setup_sss,
        ])"
    >
        <div class="flex flex-col mt-10 md:mt-0 md:flex-row gap-4">
            <HrmsSSSAddContribution v-show="!isEdit" />
            <HrmsSSSEditContribution v-show="isEdit" />
            <HrmsSSSContributionList />
        </div>
    </LayoutAcessContainer>
</template>
