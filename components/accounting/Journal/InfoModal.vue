<script setup>

defineProps({
    type: {
        type: String,
        required: false,
        default: "info"
    },
    entryData: {
        type: Object,
        required: false,
        default: null
    },
    fillable: {
        type: Boolean,
        required: false,
        default: false
    }
})

const ribbonTypes = ref({
    open: "info",
    unposted: "warning",
    posted: "success",
    void: "error"
})

const showModal = defineModel("showModal", { required: false, type: Boolean })
</script>

<template>
    <PsModal v-model:show-modal="showModal" :is-loading="boardLoading" title="">
        <template #body>
            <AccountingStatusRibbon :type="ribbonTypes[entryData?.status.toLowerCase()]" position="top-left" :status="entryData?.status" class="z-[999]" />
            <AccountingCommonInfoModalTemplateJournalEntryInfo :entry-data="entryData" :type="type" />
        </template>
    </PsModal>
</template>
