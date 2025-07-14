<script setup lang="ts">
import { usePriceQuotationStore } from "~/stores/inventory/procurement/pricequotation"
import { useSupplierStore } from "~/stores/inventory/suppliers"
import { useProcurementRequestStore } from "~/stores/inventory/procurement/request"

const mainStore = usePriceQuotationStore()
const supplierStore = useSupplierStore()
const procurementRequestStore = useProcurementRequestStore()

const { createRequest } = storeToRefs(mainStore)
const { viewRequests } = storeToRefs(procurementRequestStore)
const snackbar = useSnackbar()
const emit = defineEmits(["submit-success"])
const itemOptions = ref<any>([])
const rsIsConsoType = ref(false)
onMounted(() => {
    if (viewRequests.value.details?.requisition_slip) {
        createRequest.value.form.date = new Date().toISOString().split("T")[0]
        createRequest.value.form.conso_reference_no = viewRequests.value.details.requisition_slip?.reference_no || ""
        itemOptions.value = viewRequests.value.details.requisition_slip.items || []
        rsIsConsoType.value = viewRequests.value.details.requisition_slip.remarks?.toLowerCase().includes("consolidated")
    }
})
watch(
    () => viewRequests.value.details,
    (newDetails) => {
        if (newDetails?.requisition_slip) {
            createRequest.value.form.date = new Date().toISOString().split("T")[0]
            createRequest.value.form.conso_reference_no = viewRequests.value.details.requisition_slip?.reference_no || ""
            itemOptions.value = viewRequests.value.details.requisition_slip.items || []
            rsIsConsoType.value = viewRequests.value.details.requisition_slip.remarks?.toLowerCase().includes("consolidated")
        }
    },
    { deep: true }
)
const selectedItems = computed(() => {
    return itemOptions.value.filter((item: { selected: boolean }) => item.selected === true) || []
})

const submitForm = async () => {
    try {
        if (selectedItems.value.length === 0) {
            snackbar.add({
                type: "warning",
                text: "Please add items before submitting the request.",
            })
            return
        }
        if (!createRequest.value.form.supplier_id) {
            snackbar.add({
                type: "warning",
                text: "A supplier is required to submit the request.",
            })
            return
        }
        createRequest.value.form.items = selectedItems.value
        await mainStore.storeRequest(viewRequests.value.details.id)
        snackbar.add({
            type: "success",
            text: createRequest.value.successMessage || "Price Quotation created successfully.",
        })
        emit("submit-success")
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error || "An unexpected error occurred",
        })
    }
}
const handleSupplierChange = async (supplierId: number | null) => {
    if (!supplierId) {
        createRequest.value.form.address = ""
        createRequest.value.form.contact_person = ""
        createRequest.value.form.contact_no = ""
        return
    }
    try {
        const { data: supplier } = await supplierStore.getOne(supplierId)
        if (supplier) {
            createRequest.value.form.address = supplier.company_address
            createRequest.value.form.contact_person = supplier.contact_person_name
            createRequest.value.form.contact_no = supplier.contact_person_number
        }
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error || "Failed to load supplier details"
        })
    }
}
</script>
<template>
    <div class="text-gray-500 p-2">
        <form @submit.prevent="submitForm">
            <div class="flex flex-col gap-4 pt-4 w-full">
                <div class="basis-[10%] grow-1 shrink-0 flex items-center justify-center rounded-t mb-4">
                    <h3 v-if="title" class="pl-4 text-xl font-bold text-gray-900 p-4 tracking-wide">
                        Create Price Quotation
                    </h3>
                </div>
                <div class="flex flex-col gap-4 mb-5">
                    <div class="flex flex-row justify-between gap-4">
                        <div class="w-full flex flex-col gap-2">
                            <div class="w-full">
                                <div class="flex flex-row items-center gap-2">
                                    <LayoutFormPsDateInput
                                        v-model="createRequest.form.date"
                                        :disabled="true"
                                        :required="false"
                                        class="w-full"
                                        title="Date"
                                    />
                                </div>
                                <div class="grid grid-cols w-full gap-y-2 mb-2 mt-1">
                                    <label class="text-sm font-medium text-gray-600">Supplier:</label>
                                    <InventoryCommonSearchSupplierSelector
                                        v-model="createRequest.form.supplier_id"
                                        title="Supplier Name"
                                        @supplier-selected="handleSupplierChange"
                                    />
                                </div>
                                <div class="flex flex-row items-center gap-2">
                                    <LayoutFormPsTextInput
                                        v-model="createRequest.form.address"
                                        :disabled="true"
                                        :required="false"
                                        class="w-full"
                                        title="Address"
                                    />
                                </div>
                                <div class="flex flex-row items-center gap-2">
                                    <LayoutFormPsTextInput
                                        v-model="createRequest.form.contact_person"
                                        :disabled="true"
                                        :required="false"
                                        class="w-full"
                                        title="Contact Person"
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="w-full flex flex-col gap-2">
                            <LayoutFormPsTextInput
                                v-model="createRequest.form.quotation_no"
                                :disabled="true"
                                :required="false"
                                class="w-full"
                                title="Quotation Number"
                                placeholder="Generated after submission"
                            />
                            <LayoutFormPsTextInput
                                v-model="createRequest.form.conso_reference_no"
                                :disabled="true"
                                :required="false"
                                class="w-full"
                                :title="(rsIsConsoType ? 'Conso' : '') + 'Reference No.'"
                            />
                            <LayoutFormPsTextInput
                                v-model="createRequest.form.contact_no"
                                :disabled="true"
                                :required="false"
                                class="w-full"
                                title="Contact No."
                            />
                        </div>
                    </div>
                    <div class="w-full">
                        <InventoryPriceQuotationItemList v-model="itemOptions" />
                    </div>
                    <div class="w-full p-4 bg-white rounded-lg">
                        <p class="text-sm font-medium text-gray-900">
                            Your promptness in giving us the price quotation of the above mentioned items is highly
                            appreciated.
                        </p>
                    </div>
                    <div class="flex w-full justify-end items-center gap-4 no-print">
                        <button
                            type="submit"
                            class=" text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>
<style scoped>
@media print {
    .no-print {
        display: none !important;
    }
}
</style>
