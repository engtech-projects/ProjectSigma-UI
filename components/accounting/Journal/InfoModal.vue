<script setup>
import { storeToRefs } from "pinia"
import { useJournalStore } from "@/stores/accounting/journals/journal"

defineProps({
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

const { data: userData } = useAuth()
const showModal = defineModel("showModal", { required: false, type: Boolean })

const journalStore = useJournalStore()
const { remarks } = storeToRefs(journalStore)

const snackbar = useSnackbar()
const boardLoading = ref(false)

const closeViewModal = () => {
    showModal.value = false
}

const approvedRequest = async (id) => {
    try {
        boardLoading.value = true
        await journalStore.approveApprovalForm(id)
        snackbar.add({
            type: "success",
            text: journalStore.successMessage
        })
        closeViewModal()
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error || "something went wrong."
        })
    } finally {
        boardLoading.value = false
    }
}

const denyRequest = async (id) => {
    try {
        boardLoading.value = true
        await journalStore.denyApprovalForm(id)
        snackbar.add({
            type: "success",
            text: journalStore.successMessage
        })
        closeViewModal()
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error || "something went wrong."
        })
    } finally {
        boardLoading.value = false
    }
}
</script>

<template>
    <PsModal v-model:show-modal="showModal" :is-loading="boardLoading" title="">
        <template #body>
            <div class="grid gap-2 md:justify-between">
                <div class="p-2 flex gap-2">
                    <span class="text-gray-900 text-4xl">Journal Entry</span>
                </div>
            </div>
            <div class="grid md:grid-cols-3 gap-2 md:justify-between">
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light">Journal No.: </span>
                    <span class="text-gray-900">{{ entryData?.journal_no }}</span>
                </div>
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light">Reference No.: </span>
                    {{ entryData?.reference_no }}
                </div>
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light">Status: </span>
                    {{ entryData?.status }}
                </div>
            </div>
            <div class="grid md:grid-cols-3 gap-2 md:justify-between">
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light">Created by: </span>
                    {{ entryData?.created_by_user }}
                </div>
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light">Journal Date: </span>
                    {{ entryData?.journal_date }}
                </div>
            </div>
            <div class="grid md:grid-cols-3 gap-2 md:justify-between">
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light">Description: </span>
                    {{ entryData?.description }}
                </div>
            </div>
            <div class="p-2 border border-gray-200 rounded-lg">
                <h2 class="text-xl text-gray-800 tex-center font-bold p-2">
                    Journal Entry Details
                </h2>
                <div class="overflow-x-auto">
                    <div class="min-w-full overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg">
                        <table class="min-w-full divide-y border border-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Account Title
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Subsidiary
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Debit
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Credit
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr v-for="detail in entryData?.details" :key="detail.id">
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm text-gray-900">
                                            {{ detail?.account?.name }}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm text-gray-900">
                                            {{ detail?.subsidiary?.name }}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm text-gray-900">
                                            {{ detail?.debit }}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm text-gray-900">
                                            {{ detail?.credit }}
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="w-full">
                <LayoutApprovalsListView :approvals="entryData?.approvals" />
            </div>
        </template>
        <template #footer>
            <div v-if="entryData?.next_approval?.user_id === userData.id" class="flex gap-2 p-2 justify-end relative">
                <HrmsCommonApprovalDenyButton
                    v-model:deny-remarks="remarks"
                    :request-id="entryData.id"
                    @approve="approvedRequest"
                    @deny="denyRequest"
                />
            </div>
        </template>
    </PsModal>
</template>
