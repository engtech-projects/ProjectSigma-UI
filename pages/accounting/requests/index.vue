<script lang="ts" setup>
import { usePostingPeriodStore } from "~/stores/accounting/postingperiod"

const postingPeriodStore = usePostingPeriodStore()
await postingPeriodStore.getPostingPeriods()
definePageMeta({
    layout: "default",
})
useHead({
    title: "Document Series",
})
</script>

<template>
    <div class="flex flex-col gap-2">
        <p>Requests Page</p>
    </div>
</template>

<style>
    .flex-2 {
        flex: 2;
    }
</style>
