<script setup>
const { data: userData } = useAuth()
const props = defineProps({
    transactionOption: {
        type: String,
        default: "create",
    },
    transactionFlowModelList: {
        type: Array,
        default: () => [],
    },
})
const emit = defineEmits(["closeModal"])
</script>
<template>
    <div class="w-full max-w-4xl mx-auto border-t-4 border-t-green-600 shadow-lg">
        <AccountingCommonTransactionFlowHeader
            title="PRF Transaction Flow"
        />
        <!-- Content Container -->
        <div class="bg-white rounded-b-xl shadow-lg overflow-hidden">
            <AccountingCommonTransactionFLowCreate
                v-if="transactionOption === 'create'"
                :transaction-flow-model-list="transactionFlowModelList"
            />
            <!-- Management/Viewing Flow - Updated to match create flow style -->
            <div v-else class="p-2">
                <div class="space-y-4">
                    <AccountingCommonTransactionFLowCard
                        v-for="(transactionFlowModel, index) in transactionFlowModelList"
                        :key="index"
                        :transaction-flow-model="transactionFlowModel"
                        :user-data="userData"
                        @close-modal="emit('closeModal')"
                    />
                </div>
            </div>
        </div>
        <AccountingCommonTransactionProgress
            :transaction-flow-model-list="transactionFlowModelList"
            :transaction-option="props.transactionOption"
        />
    </div>
</template>

<style scoped>
/* Custom animations */
@keyframes pulse {
    0%, 100% {
        opacity: 1;
    }
    50% {
        opacity: 0.5;
    }
}

.animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

* {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 300ms;
}
.group:hover .group-hover\:scale-105 {
    transform: scale(1.05);
}
</style>
