<script  setup>
import { storeToRefs } from "pinia"
import { usePagibigStore } from "@/stores/pagibig"

const contributions = usePagibigStore()
const { isEdit } = storeToRefs(contributions)
contributions.getContribution()

useHead({
    title: "Pag-IBIG",
})

</script>

<template>
    <div class="flex flex-col mt-10 md:mt-0 md:flex-row gap-4">
        <HrmsPagibigAddContribution v-show="!isEdit" />
        <HrmsPagibigEditContribution v-show="isEdit" />
        <HrmsPagibigContributionList />
    </div>
</template>
