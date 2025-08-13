<template>
    <div class="w-full max-w-4xl mx-auto border-t-4 border-t-green-600 shadow-lg">
        <!-- Header -->
        <div class="bg-white text-gray-500 px-2 shadow-lg py-2">
            <div class="flex items-center gap-3">
                <h2 class="text-md font-bold text-center">
                    PRF Transaction Flow
                </h2>
            </div>
        </div>

        <!-- Content Container -->
        <div class="bg-white rounded-b-xl shadow-lg overflow-hidden">
            <!-- Create Flow -->
            <div v-if="transactionOption === 'create'" class="p-2">
                <div class="space-y-4">
                    <div
                        v-for="(transactionFlowModel, index) in transactionFlowModelList"
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
                                    :is-in-progress="index === 0"
                                    :is-pending="index != 0"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Management/Viewing Flow - Updated to match create flow style -->
            <div v-else class="p-2">
                <div class="space-y-4">
                    <div
                        v-for="(transactionFlowModel, index) in transactionFlowModelList"
                        :key="index"
                        class="relative group transition-all duration-300 hover:transform hover:scale-[1.02]"
                    >
                        <!-- Card -->
                        <div
                            :class="[
                                'relative z-10 rounded-xl p-2 border-1 transition-all duration-300',
                                transactionFlowModel.status === 'in_progress'
                                    ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 shadow-md'
                                    : getStepClasses(transactionFlowModel.status)
                            ]"
                        >
                            <div class="flex items-center gap-4">
                                <div class="flex-1">
                                    <!-- Status Badge -->
                                    <div v-if="transactionFlowModel.status" class="mb-2">
                                        <span
                                            :class="[
                                                'inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium',
                                                getStatusBadgeClasses(transactionFlowModel.status)
                                            ]"
                                        >
                                            <div
                                                v-if="transactionFlowModel.status === 'in_progress'"
                                                class="w-2 h-2 bg-current rounded-full animate-pulse"
                                            />
                                            {{ formatStatus(transactionFlowModel.status) }}
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
                                    :is-pending="transactionFlowModel.status === 'pending'"
                                    :is-complete="transactionFlowModel.status === 'done'"
                                    :is-in-progress="transactionFlowModel.status === 'in_progress'"
                                />
                            </div>
                            <div v-show="transactionFlowModel.status === 'in_progress' && transactionFlowModel.user_id === userData?.employee?.id" class="w-full flex justify-end pt-2">
                                <button
                                    class="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                                    :disabled="isLoading"
                                    @click="handleTransactionFlowUpdate(transactionFlowModel.id, userData?.employee?.id)"
                                >
                                    {{ isLoading ? "Loading..." : "Mark as done" }}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Progress Bar -->
        <div
            v-if="transactionFlowModelList.length > 0"
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
                    {{ getCompletedCount() }} of {{ transactionFlowModelList.length }}
                </span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useTransactionFlowStore } from "~/stores/accounting/setup/transactionFlowModel"
import { usePaymentRequestStore } from "@/stores/accounting/requests/paymentrequest"
const transactionFlowStore = useTransactionFlowStore()
const paymentRequestStore = usePaymentRequestStore()
const isLoading = ref(false)
const { data: userData } = useAuth()
const snackbar = useSnackbar()
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

const getStepClasses = (status) => {
    switch (status) {
    case "done":
        return "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 shadow-md"
    case "pending":
    default:
        return "bg-gray-50 border-gray-200 hover:border-gray-300"
    }
}

const getStatusBadgeClasses = (status) => {
    switch (status) {
    case "done":
        return "bg-green-100 text-green-800"
    case "in_progress":
        return "bg-yellow-100 text-yellow-800"
    case "pending":
    default:
        return "bg-gray-100 text-gray-700"
    }
}

const formatStatus = (status) => {
    switch (status) {
    case "done":
        return "Done"
    case "in_progress":
        return "In Progress"
    case "pending":
    default:
        return "Pending"
    }
}

const getCompletedCount = () => {
    if (props.transactionOption === "create") {
        return 1
    }
    return props.transactionFlowModelList.filter(item => item.status === "done").length
}

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
const handleTransactionFlowUpdate = async (flowId, userId) => {
    isLoading.value = true
    try {
        await transactionFlowStore.updateTransactionFlowStatus(flowId, userId)
        snackbar.add({
            type: "success",
            text: transactionFlowStore.successMessage
        })
        paymentRequestStore.getAllRequests()
        emit("closeModal")
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error || "something went wrong."
        })
    } finally {
        isLoading.value = false
    }
}
</script>

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
