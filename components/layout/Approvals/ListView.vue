<script setup>
defineProps({
    approvals: {
        type: Object,
        required: true,
    },
    signatureView: {
        type: Boolean,
        required: false,
        default: false,
    }
})
</script>
<template>
    <div class="LayoutApprovalListView p-2 w-full">
        <template v-if="signatureView">
            <div class="flex gap-8 flex-1">
                <LayoutApprovalsSignatoryApprovalItem v-for="(apprItem, index) in approvals" :key="index" :approval-item="apprItem" />
            </div>
        </template>
        <template v-else>
            <p class="text-blue-700 text-center font-medium text-lg">
                Approvals
            </p>
            <LayoutApprovalsSystemApprovalItem v-for="(apprItem, index) in approvals" :key="index" :approval-item="apprItem" />
        </template>
    </div>
</template>
