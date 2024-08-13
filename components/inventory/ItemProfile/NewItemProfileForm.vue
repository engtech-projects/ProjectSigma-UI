<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useTravelorderStore } from "@/stores/hrms/travelorder"
import { useApprovalStore, APPROVAL_TRAVELORDER } from "@/stores/hrms/setup/approvals"

const approvals = useApprovalStore()

const travels = useTravelorderStore()
const { travel, errorMessage, successMessage } = storeToRefs(travels)

travel.value.approvals = await approvals.getApprovalByName(APPROVAL_TRAVELORDER)

const snackbar = useSnackbar()
const boardLoading = ref(false)

const submitForm = async () => {
    try {
        boardLoading.value = true
        await travels.createRequest()
        if (travels.errorMessage !== "") {
            snackbar.add({
                type: "error",
                text: travels.errorMessage
            })
            travels.$reset()
            travel.value.approvals = await approvals.getApprovalByName(APPROVAL_TRAVELORDER)
        } else {
            snackbar.add({
                type: "success",
                text: travels.successMessage
            })
        }
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error
        })
    } finally {
        travels.clearMessages()
        boardLoading.value = false
        travel.value.approvals = formApproval
    }
}
</script>

<template>
    <LayoutBoards title="New Item Profile" class="w-full" :loading="boardLoading">
        <div class="text-gray-500">
            <form @submit.prevent="submitForm">
                <div class="grid grid-cols-2 gap-2 mt-2">
                    <div class="flex-1 flex-col gap-4 p-2 mb-2">
                        <LayoutFormPsTextInput v-model="travel.destination" title="SKU" />
                    </div>
                    <div class="flex-1 flex-col gap-4 p-2 mb-2">
                        <label
                            for="description"
                            class="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            QR Code
                        </label>
                    </div>
                </div>
                <div class="grid grid-cols-1">
                    <div class="flex-1 flex-col gap-4 p-2 mb-2">
                        <label
                            for="description"
                            class="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Item Description
                        </label>
                        <textarea
                            id="description"
                            v-model="travel.destination"
                            rows="5"
                            type="text"
                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            required
                        />
                    </div>
                </div>
                <div class="grid grid-cols-4 gap-2">
                    <div class="flex-1 flex-col gap-4 p-2">
                        <div class="mb-2">
                            <LayoutFormPsTextInput v-model="travel.destination" title="Thickness" />
                        </div>
                    </div>
                    <div class="flex-1 flex-col gap-4 p-2">
                        <div class="mb-2">
                            <LayoutFormPsTextInput v-model="travel.destination" title="Length" />
                        </div>
                    </div>
                    <div class="flex-1 flex-col gap-4 p-2">
                        <div class="mb-2">
                            <LayoutFormPsTextInput v-model="travel.destination" title="Width" />
                        </div>
                    </div>
                    <div class="flex-1 flex-col gap-4 p-2">
                        <div class="mb-2">
                            <LayoutFormPsTextInput v-model="travel.destination" title="Height" />
                        </div>
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-2">
                    <div class="flex-1 flex-col gap-4 p-2">
                        <div class="mb-2">
                            <LayoutFormPsTextInput v-model="travel.destination" title="Outside Diameter" />
                        </div>
                    </div>
                    <div class="flex-1 flex-col gap-4 p-2">
                        <div class="mb-2">
                            <LayoutFormPsTextInput v-model="travel.destination" title="Inside Diameter" />
                        </div>
                    </div>
                </div>
                <div class="grid grid-cols-3 gap-2">
                    <div class="flex-1 flex-col gap-4 p-2">
                        <div class="mb-2">
                            <LayoutFormPsTextInput v-model="travel.destination" title="Specification" />
                        </div>
                    </div>
                    <div class="flex-1 flex-col gap-4 p-2">
                        <div class="mb-2">
                            <LayoutFormPsTextInput v-model="travel.destination" title="Grade" />
                        </div>
                    </div>
                    <div class="flex-1 flex-col gap-4 p-2">
                        <div class="mb-2">
                            <LayoutFormPsTextInput v-model="travel.destination" title="Color" />
                        </div>
                    </div>
                </div>
                <div class="grid grid-cols-3 gap-2">
                    <div class="flex-1 flex-col gap-4 p-2">
                        <div class="mb-2">
                            <LayoutFormPsTextInput v-model="travel.destination" title="Item Group" />
                        </div>
                    </div>
                    <div class="flex-1 flex-col gap-4 p-2">
                        <div class="mb-2">
                            <LayoutFormPsTextInput v-model="travel.destination" title="Sub Item group" />
                        </div>
                    </div>
                    <div class="flex-1 flex-col gap-4 p-2">
                        <div class="mb-2">
                            <LayoutFormPsTextInput v-model="travel.destination" title="Item Type" />
                        </div>
                    </div>
                </div>
                <div class="grid grid-cols-3 gap-2">
                    <div class="flex-1 flex-col gap-4 p-2">
                        <div class="mb-2">
                            <LayoutFormPsTextInput v-model="travel.destination" title="Unit of Measurements" />
                        </div>
                    </div>
                    <div class="flex-1 flex-col gap-4 p-2">
                        <div class="mb-2">
                            <LayoutFormPsTextInput v-model="travel.destination" title="Convertions" />
                        </div>
                    </div>
                    <div class="flex-1 flex-col gap-4 p-2">
                        <div class="mb-2">
                            <LayoutFormPsTextInput v-model="travel.destination" title="Status" />
                        </div>
                    </div>
                </div>
                <div class="grid grid-cols-3 gap-2">
                    <div class="flex-1 flex-col gap-4 p-2">
                        <HrmsCommonRequestedBy title="Prepared by" />
                    </div>
                    <div class="flex-1 flex-col gap-4 p-2">
                        <HrmsCommonRequestedBy title="Verified by" />
                    </div>
                    <div class="flex-1 flex-col gap-4 p-2">
                        <HrmsCommonRequestedBy title="Noted by" />
                    </div>
                </div>
                <div class="w-full rounded-lg p-4 bg-slate-100 ">
                    <label for="approved_by" class="block text-sm font-medium text-gray-900 dark:text-white">Recommending Approval:</label>
                    <HrmsSetupApprovalsList
                        v-for="(approv, apr) in travel.approvals"
                        :key="'hrmsetupapprovallist'+apr"
                        v-model="travel.approvals[apr]"
                    />
                </div>
                <div class="flex justify-end">
                    <button type="submit" class="flex-1 text-white p-2 rounded-lg bg-teal-600 content-center mt-5">
                        Submit Form
                    </button>
                </div>
            </form>
            <p
                hidden
                class=" text-red-600 text-center font-semibold mt-2 italic"
                :class="{ 'fade-out': !errorMessage }"
            >
                {{ errorMessage }}
            </p>
            <p
                v-show="successMessage"
                hidden
                class=" text-green-600 text-center font-semibold italic transition-opacity delay-1000"
            >
                {{ successMessage }}
            </p>
        </div>
    </LayoutBoards>
</template>

<style scoped>
.error-message,
.success-message {
    transition: opacity 1s ease;
}

.error-message.fade-out,
.success-message.fade-out {
    animation-duration: 1s;
    opacity: 0;
}
</style>
