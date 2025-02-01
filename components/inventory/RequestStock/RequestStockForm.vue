<script setup>
import { useRequestStockStore, APPROVALS } from "@/stores/inventory/requeststock"
import { useApprovalStore } from "@/stores/hrms/setup/approvals"

const mainStore = useRequestStockStore()
const { approvalList } = storeToRefs(mainStore)
mainStore.fetchRs()

const form = defineModel({ required: true, type: Object })

const approvals = useApprovalStore()
approvalList.value.list = await approvals.getApprovalByName(APPROVALS)

const snackbar = useSnackbar()

const storeRequestForm = async () => {
    try {
        form.value.items = mainStore.requestStock.items

        if (!form.value.items || form.value.items.length === 0) {
            snackbar.add({
                type: "error",
                text: "Please add items before submitting the request.",
            })
            return
        }

        form.value.approvals = approvalList.value.list
        await mainStore.storeRequest()

        if (mainStore.errorMessage !== "") {
            snackbar.add({
                type: "error",
                text: mainStore.errorMessage,
            })
        } else {
            snackbar.add({
                type: "success",
                text: mainStore.successMessage,
            })
        }
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error.message || error,
        })
    }
}
const headers = [
    { name: "QTY", id: "quantity" },
    { name: "UNIT", id: "unit" },
    { name: "Item Description", id: "item_id" },
    { name: "Specification", id: "specification" },
    { name: "Preferred Brand", id: "preferred_brand" },
    { name: "Reason For Request", id: "reason" },
    { name: "Location of Item (IF AVAILABLE)", id: "location" },
    { name: "QTY", id: "location_qty" },
    { name: "Approve/Reject", id: "is_approved" },
]

</script>
<template>
    <div class="text-gray-500 p-2">
        <form @submit.prevent="storeRequestForm">
            <div class="flex flex-col gap-4 pt-4 w-full">
                <div class="flex flex-col gap-4 mb-5">
                    <div class="flex flex-row justify-between gap-4">
                        <div class="w-full flex flex-col gap-2">
                            <div class="w-full flex flex-cols-2 gap-2">
                                <InventoryWarehouseSelector
                                    v-model="form.warehouse_id"
                                />
                            </div>
                            <LayoutFormPsTextInput v-model="form.request_for" :required="true" class="w-full" title="Request For" />
                            <div class="w-full flex gap-2">
                                <div class="w-full">
                                    <label
                                        class="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Office/Project
                                    </label>
                                    <HrmsCommonProjectSelector v-model="form.office_project" />
                                </div>
                                <div class="w-full">
                                    <LayoutFormPsTextInput v-model="form.office_project_address" :required="true" class="w-full" title="Address" />
                                </div>
                            </div>
                        </div>
                        <div class="w-full flex flex-col gap-2">
                            <!-- <div class="w-full">
                                <label
                                    for="reference_no"
                                    class="text-sm italic"
                                >Reference No.</label>
                                <input
                                    id="reference_no"
                                    type="text"
                                    disabled
                                    class="w-full rounded-lg"
                                    :value="referenceNo"
                                >
                            </div> -->
                            <LayoutFormPsDateInput v-model="form.date_prepared" :required="true" class="w-full" title="Date Prepared" />
                            <LayoutFormPsDateInput v-model="form.date_needed" :required="true" class="w-full" title="Date Needed" />
                            <LayoutFormPsTextInput v-model="form.equipment_no" :required="true" class="w-full" title="Equipment No." />
                        </div>
                    </div>
                    <div>
                        <InventoryRequestStockItemTable title="Item List" :header-columns="headers" :data-columns="form.items" />
                    </div>
                    <div class="flex flex-row justify-between gap-4">
                        <div class="w-full flex flex-col gap-2">
                            <LayoutFormPsTextInput v-model="form.type_of_request" :required="false" class="w-full" title="Type of Request" />
                            <LayoutFormPsNumberInput v-model="form.contact_no" :required="false" class="w-full" title="Contact Number" />
                        </div>
                        <div class="w-full flex flex-col gap-2">
                            <div class="w-full">
                                <label
                                    class="block mb-1 text-sm font-medium text-gray-900"
                                >
                                    Remarks
                                </label>
                                <InventoryCommonFormPsTextAreaCommon v-model="form.remarks" title="Remarks" />
                            </div>
                        </div>
                        <div class="w-full flex flex-col gap-2">
                            <label
                                class="block mb-1 text-sm font-medium text-gray-900"
                            >
                                Equipment SMR
                            </label>
                            <div class="flex">
                                <div class="w-1/2 pr-2">
                                    <LayoutFormPsTextInput v-model="form.current_smr" :required="false" class="w-full" title="Current SMR" />
                                </div>
                                <div class="w-1/2 pl-2">
                                    <LayoutFormPsTextInput v-model="form.unused_smr" :required="false" class="w-full" title="Unused SMR" />
                                </div>
                            </div>
                            <div class="flex mt-2">
                                <div class="w-1/2 pr-2">
                                    <LayoutFormPsTextInput v-model="form.previous_smr" :required="false" class="w-full" title="Previous SMR" />
                                </div>
                                <div class="w-1/2 pl-2">
                                    <LayoutFormPsTextInput v-model="form.next_smr" :required="false" class="w-full" title="Next SMR" />
                                </div>
                            </div>
                        </div>
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
