<script setup>
import { useRequestStockStore, APPROVALS } from "@/stores/inventory/requeststock"
import { useApprovalStore } from "@/stores/hrms/setup/approvals"
const mainStore = useRequestStockStore()
const { approvalList } = storeToRefs(mainStore)

const form = defineModel({ required: true, type: Object })

const approvals = useApprovalStore()
approvalList.value.list = await approvals.getApprovalByName(APPROVALS)

const snackbar = useSnackbar()

const storeRequestForm = async () => {
    try {
        form.value.approvals = approvalList.value.list
        await mainStore.storeRequest()
        if (mainStore.errorMessage !== "") {
            snackbar.add({
                type: "error",
                text: mainStore.errorMessage
            })
        } else {
            snackbar.add({
                type: "success",
                text: mainStore.successMessage
            })
        }
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error
        })
    }
}

const headers = [
    { name: "Quantity", id: "quantity" },
    { name: "Unit", id: "unit" },
    { name: "SKU", id: "sku" },
    { name: "Item Description", id: "item_description" },
    { name: "Specification", id: "specification" },
    { name: "Preferred Brand", id: "preferred_brand" },
    { name: "Reason For Requests", id: "reason_for_requests" },
    { name: "Turn Over (IF AVAILABLE)", id: "turn_over" },
]

</script>
<template>
    <div class="text-gray-500 p-2">
        <form @submit.prevent="storeRequestForm">
            <div class="flex flex-col gap-4 pt-4 w-full">
                <div class="flex flex-col gap-4 mb-5">
                    <div class="flex flex-row justify-between gap-4">
                        <div class="w-full flex flex-col gap-2">
                            <LayoutFormPsTextInput v-model="form.request_to" :required="true" class="w-full" title="Request To" />
                            <LayoutFormPsTextInput v-model="form.office_project" :required="true" class="w-full" title="Office/Project" />
                            <LayoutFormPsTextInput v-model="form.project_address" :required="true" class="w-full" title="Project Address" />
                        </div>
                        <div class="w-full flex flex-col gap-2">
                            <LayoutFormPsTextInput v-model="form.deliver_to" :required="true" class="w-full" title="Deliver To" />
                            <LayoutFormPsDateInput v-model="form.date_needed" :required="true" class="w-full" title="Date Needed" />
                        </div>
                    </div>
                    <div>
                        <InventoryRequestStockItemTable title="Item List" :header-columns="headers" :data-columns="form.list" />
                    </div>
                    <div class="flex flex-row gap-4">
                        <LayoutFormPsTextInput v-model="form.conso_period" :required="true" class="w-full" title="Conso Period" />
                        <LayoutFormPsTextInput v-model="form.contact_number" :required="true" class="w-full" title="Contact Number" />
                        <LayoutFormPsTextInput v-model="form.smr" :required="true" class="w-full" title="SMR" />
                    </div>
                    <div class="w-full">
                        <label
                            class="block mb-1 text-sm font-medium text-gray-900"
                        >
                            Remarks
                        </label>
                        <InventoryCommonFormPsTextAreaCommon v-model="form.remarks" title="Remarks" />
                    </div>
                </div>
                <div class="flex w-full">
                    <div class="pt-5 w-full mb-2 rounded-lg p-4 bg-slate-100 ">
                        <label for="approved_by" class="block text-sm font-medium text-gray-900 dark:text-white"> Approval:</label>
                        <HrmsSetupApprovalsList
                            v-for="(approv, apr) in approvalList.list"
                            :key="'hrmsetupapprovallist' + approv"
                            v-model="approvalList.list[apr]"
                        />
                    </div>
                </div>
                <div class="flex w-full items-center gap-4">
                    <button
                        type="submit"
                        class=" text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>
