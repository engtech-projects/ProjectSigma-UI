<script lang="ts" setup>
defineProps({
    data: {
        type: Object,
        required: true,
    }
})
const showModal = defineModel("showModal", { required: false, type: Boolean })
const closeViewModal = () => {
    showModal.value = false
}
</script>
<template>
    <PsModal v-model:show-modal="showModal" title="Cash Advance Details">
        <template #body>
            <HrmsCashadvanceDetails :data="data" @close-modal="closeViewModal" />
        </template>
    </PsModal>
</template>
