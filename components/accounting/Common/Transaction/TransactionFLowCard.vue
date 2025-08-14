<script setup>
import { useTransactionFlowStore } from "~/stores/accounting/setup/transactionFlowModel"
import { usePaymentRequestStore } from "@/stores/accounting/requests/paymentrequest"
const transactionFlowStore = useTransactionFlowStore()
const paymentRequestStore = usePaymentRequestStore()
const isLoading = ref(false)
const snackbar = useSnackbar()
defineProps({
    transactionFlowModel: {
        type: Object,
        default: () => {},
    },
    userData: {
        type: Object,
        default: () => {},
    },
})

const emit = defineEmits(["closeModal"])

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
</script>
<template>
    <div
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
</template>
