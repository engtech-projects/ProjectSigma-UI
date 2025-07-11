<script setup lang="ts">
import { usePriceQuotationStore } from "~/stores/inventory/procurement/pricequotation"
import { useSupplierStore } from "~/stores/inventory/suppliers"
import { useProcurementRequestStore } from "~/stores/inventory/procurement/request"

const mainStore = usePriceQuotationStore()
const supplierStore = useSupplierStore()
const procurementRequestStore = useProcurementRequestStore()

const form = defineModel({ required: true, type: Object })
defineProps({
    title: {
        type: String,
        required: true,
    },
})
const snackbar = useSnackbar()
const selectedItems = computed(() => {
    return form.value.items?.filter(item => item.selected === true) || []
})
const emit = defineEmits(["submit-success"])

const submitForm = async () => {
    try {
        if (selectedItems.value.length === 0) {
            snackbar.add({
                type: "warning",
                text: "Please add items before submitting the request.",
            })
            return
        }
        if (!form.value.supplier_id) {
            snackbar.add({
                type: "warning",
                text: "A supplier is required to submit the request.",
            })
            return
        }

        mainStore.createRequest.form = {
            supplier_id: form.value.supplier_id,
            date: form.value.date,
            address: form.value.address,
            contact_person: form.value.contact_person,
            contact_no: form.value.contact_no,
            conso_reference_no: form.value.conso_reference_no,
            quotation_no: form.value.quotation_no,
            items: selectedItems.value
        }
        await mainStore.storeRequest(form.value.id)

        const messageType = mainStore.errorMessage ? "error" : "success"
        const messageText = mainStore.errorMessage || mainStore.successMessage

        snackbar.add({
            type: messageType,
            text: messageText,
        })

        if (!mainStore.errorMessage) {
            Object.assign(form.value, {
                supplier_id: null,
                date: "",
                address: "",
                contact_person: "",
                contact_no: "",
                conso_reference_no: "",
                quotation_no: "",
                items: []
            })

            emit("submit-success")
        }
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error.message || "An unexpected error occurred",
        })
    }
}
const handleSupplierChange = async (supplierId: number | null) => {
    if (!supplierId) {
        Object.assign(form.value, {
            address: "",
            contact_person: "",
            contact_no: ""
        })
        return
    }
    try {
        const { data: supplier } = await supplierStore.getOne(supplierId)
        if (supplier) {
            Object.assign(form.value, {
                address: supplier.company_address,
                contact_person: supplier.contact_person_name,
                contact_no: supplier.contact_person_number
            })
        }
    } catch (error) {
        snackbar.add({
            type: "error",
            text: "Failed to load supplier details"
        })
    }
}
watch(
    () => procurementRequestStore.viewRequests.details.requisition_slip?.reference_no,
    (newRefNo) => {
        if (newRefNo) {
            form.value.conso_reference_no = newRefNo
        }
    },
    { immediate: true }
)
</script>
<template>
    <div class="text-gray-500 p-2">
        <form @submit.prevent="submitForm">
            <div class="flex flex-col gap-4 pt-4 w-full">
                <div class="basis-[10%] grow-1 shrink-0 flex items-center justify-center rounded-t mb-4">
                    <h3 v-if="title" class="pl-4 text-xl font-bold text-gray-900 p-4 tracking-wide">
                        {{ title }}
                    </h3>
                </div>
                <div class="flex flex-col gap-4 mb-5">
                    <div class="flex flex-row justify-between gap-4">
                        <div class="w-full flex flex-col gap-2">
                            <div class="w-full">
                                <div class="flex flex-row items-center gap-2">
                                    <LayoutFormPsDateInput
                                        v-model="form.date"
                                        :required="true"
                                        class="w-full"
                                        title="Date"
                                    />
                                </div>
                                <div class="grid grid-cols w-full gap-y-2 mb-2 mt-1">
                                    <label class="text-sm font-medium text-gray-600">Supplier:</label>
                                    <InventoryCommonSearchSupplierSelector
                                        v-model="form.supplier_id"
                                        title="Supplier Name"
                                        @supplier-selected="handleSupplierChange"
                                    />
                                </div>
                                <div class="flex flex-row items-center gap-2">
                                    <LayoutFormPsTextInput
                                        v-model="form.address"
                                        :disabled="true"
                                        :required="true"
                                        class="w-full"
                                        title="Address"
                                    />
                                </div>
                                <div class="flex flex-row items-center gap-2">
                                    <LayoutFormPsTextInput
                                        v-model="form.contact_person"
                                        :disabled="true"
                                        :required="true"
                                        class="w-full"
                                        title="Contact Person"
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="w-full flex flex-col gap-2">
                            <LayoutFormPsTextInput
                                v-model="form.quotation_no"
                                :disabled="true"
                                :required="false"
                                class="w-full"
                                title="Quotation Number"
                                placeholder="Generated after submission"
                            />
                            <LayoutFormPsTextInput
                                v-model="form.conso_reference_no"
                                :disabled="true"
                                :required="true"
                                class="w-full"
                                title="Conso Reference No."
                            />
                            <LayoutFormPsTextInput
                                v-model="form.contact_no"
                                :disabled="true"
                                :required="true"
                                class="w-full"
                                title="Contact No."
                            />
                        </div>
                    </div>
                    <div class="w-full">
                        <InventoryPriceQuotationItemList v-model="form.items" />
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
                            Submit ({{ selectedItems.length }} selected)
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
