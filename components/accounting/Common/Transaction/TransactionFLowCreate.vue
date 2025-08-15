<script setup>
const props = defineProps({
    transactionFlowModelList: {
        type: Array,
        default: () => [],
    },
})
</script>
<template>
    <!-- Create Flow -->
    <div class="p-2">
        <div class="space-y-4">
            <div
                v-for="(transactionFlowModel, index) in props.transactionFlowModelList"
                :key="index"
                class="relative group transition-all duration-300 hover:transform hover:scale-[1.02]"
            >
                <!-- Card -->
                <div
                    :class="[
                        'relative z-10 rounded-xl p-2 border-1 transition-all duration-300',
                        index === 0
                            ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 shadow-md'
                            : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                    ]"
                >
                    <div class="flex items-center gap-4">
                        <div class="flex-1">
                            <!-- Status Badge -->
                            <div v-if="index === 0" class="mb-2">
                                <span
                                    class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800"
                                >
                                    <div class="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                                    In Progress
                                </span>
                            </div>
                            <!-- Step Name -->
                            <p class="text-md font-semibold text-black leading-relaxed">
                                {{ transactionFlowModel.name ? transactionFlowModel.name.toUpperCase() : "NO NAME" }}
                            </p>
                            <p class="text-xs font-semibold text-gray-500 leading-relaxed">
                                User Assignee:
                            </p>
                            <p class="text-xs font-semibold text-gray-500 leading-relaxed">
                                {{ transactionFlowModel.user_name ? transactionFlowModel.user_name.toUpperCase() : "NO ASSIGN" }}
                            </p>
                        </div>
                        <AccountingCommonTransactionProgressIndicator
                            :indicator-status-type="index === 0 ? AccountingProgressIndicatorTypeStatus.IN_PROGRESS : AccountingProgressIndicatorTypeStatus.PENDING"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
