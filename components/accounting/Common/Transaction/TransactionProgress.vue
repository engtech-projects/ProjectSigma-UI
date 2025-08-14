<script setup>
const props = defineProps({
    transactionFlowModelList: {
        type: Array,
        default: () => [],
    },
    transactionOption: {
        type: String,
        default: "create",
    },
})
const calculateProgress = () => {
    if (props.transactionFlowModelList.length === 0) {
        return 0
    }
    if (props.transactionOption === "create") {
        return (1 / props.transactionFlowModelList.length) * 100
    }
    const completedCount = getCompletedCount()
    return (completedCount / props.transactionFlowModelList.length) * 100
}
const getCompletedCount = () => {
    if (props.transactionOption === "create") {
        return 1
    }
    return props.transactionFlowModelList.filter(item => item.status === "done").length
}
</script>
<template>
    <!-- Progress Bar -->
    <div
        v-if="props.transactionFlowModelList.length > 0"
        class="mt-4 bg-white rounded-lg shadow-md p-4"
    >
        <div class="flex items-center gap-3">
            <span class="text-sm font-medium text-gray-600">Progress:</span>
            <div class="flex-1 bg-gray-200 rounded-full h-2">
                <div
                    class="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                    :style="{ width: `${calculateProgress()}%` }"
                />
            </div>
            <span class="text-sm font-medium text-gray-600">
                {{ getCompletedCount() }} of {{ props.transactionFlowModelList.length }}
            </span>
        </div>
    </div>
</template>
