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
        <div class="flex gap-4">
            <!-- <div class="flex-1">
                <AccountingPostingPeriodNew v-if="!postingPeriodStore.isEdit" class="flex-1" />
                <AccountingPostingPeriodEdit v-else class="flex-1" />
            </div> -->
            <AccountingPostingPeriodList class="flex-2" />
        </div>
    </div>
</template>

<style>
    .flex-2 {
        flex: 2;
    }
</style>
