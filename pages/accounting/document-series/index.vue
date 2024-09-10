<script lang="ts" setup>
import { useDocumentSeriesStore } from "~/stores/accounting/documentseries"

const documentSeriesStore = useDocumentSeriesStore()
await documentSeriesStore.getSeries()

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
                <AccountingDocumentEditSeries v-if="documentSeriesStore.isEdit" />
                <AccountingDocumentNewSeries v-else />
            </div> -->
            <AccountingDocumentSeriesList class="flex-2" />
        </div>
    </div>
</template>

<style>
    .flex-2 {
        flex: 2;
    }
</style>
