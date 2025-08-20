<script setup>
import { useTransactionFlowStore } from "@/stores/accounting/setup/transactionFlowModel"
const transactionFlow = useTransactionFlowStore()
const snackbar = useSnackbar()
const isEdit = ref(false)
const editId = ref(null)
onMounted(async () => {
    await transactionFlow.getTransactionFlow()
})
const handleAssigneeEdit = (id) => {
    isEdit.value = !isEdit.value
    editId.value = id
}
const handleAssigneeSave = async (id) => {
    try {
        isEdit.value = !isEdit.value
        editId.value = id
        await transactionFlow.updateTransactionFlow(id)
        await transactionFlow.getTransactionFlow()
        snackbar.add({
            type: "success",
            text: "Transaction Flow Successfully Updated",
        })
    } catch (error) {
        snackbar.add({
            type: "error",
            text: "Transaction Flow Failed to Update",
        })
    }
}
useHead({
    title: "Accounting Transaction Flow",
})
</script>

<template>
    <div class="w-full flex justify-center">
        <div class="w-1/2 bg-white">
            <div class="flex justify-center flex-col gap-2">
                <h1 class="font-bold text-xl rounded-t-sm py-2">
                    Transaction Flow Setup
                </h1>
                <p class="text-gray-400 text-sm py-2">
                    Manage transaction flow for accounting transactions
                </p>
            </div>
            <div class="text-black rounded-b-sm grid grid-cols-1 gap-2">
                <div
                    v-for="(flow, index) in transactionFlow.TransactionFlowList"
                    :key="index"
                    class="px-4 py-4 rounded-sm shadow-md border-green-800 border-t-2"
                    :class="flow.is_assignable ? 'bg-gray-300' : 'bg-yellow-200'"
                >
                    <div class="flex items-between gap-2">
                        <div class="rounded-full bg-gray-400 p-2 h-14 w-14 my-auto">
                            <p class="text-white text-center text-2xl font-bold">
                                {{ index + 1 }}
                            </p>
                        </div>
                        <div>
                            <h1 class="text-xl p-2 font-bold">
                                {{ flow.name.toUpperCase() }}
                            </h1>
                            <p v-if="flow.is_assignable" class="text-sm px-2">
                                <span class="font-bold text-gray-400">
                                    USER :
                                </span>
                                {{ flow.user_name || "NO ASSIGN" }}
                            </p>
                            <p v-else class="text-sm px-2">
                                NOT ASSIGNABLE
                            </p>
                        </div>
                    </div>
                    <div class="flex justify-end gap-2 py-2 mt-2">
                        <HrmsCommonUserEmployeeSelector
                            v-show="isEdit && flow.id === editId"
                            id="users_list"
                            v-model="transactionFlow.selectedId"
                            :form="index + 'approvform'"
                            class="w-full"
                        />
                        <button
                            v-show="isEdit && flow.id === editId"
                            :disabled="!transactionFlow.selectedId"
                            class="bg-green-600 text-white p-2 px-4 rounded-md hover:bg-green-700 transition-all duration-300"
                            @click="handleAssigneeSave(flow.id)"
                        >
                            Save
                        </button>
                        <button
                            v-if="flow.is_assignable"
                            class="bg-yellow-600 text-white py-2 px-4 rounded-md hover:bg-yellow-700 transition-all duration-300"
                            @click="handleAssigneeEdit(flow.id)"
                        >
                            {{ isEdit && flow.id === editId ? "Cancel" : "Edit" }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
