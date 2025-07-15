<script setup lang="ts">
import { usePriceQuotationStore } from "~/stores/inventory/procurement/pricequotation"

const mainStore = usePriceQuotationStore()
const { editRequest, priceQuotation } = storeToRefs(mainStore)

const snackbar = useSnackbar()
const emit = defineEmits(["submit-success"])
const itemOptions = ref<any>([])
const rsIsConsoType = ref(false)

onMounted(() => {
    if (editRequest.value.details?.requisition_slip) {
        editRequest.value.form.date = new Date().toISOString().split("T")[0]
        editRequest.value.form.conso_reference_no = editRequest.value.details.requisition_slip?.reference_no || ""
        itemOptions.value = editRequest.value.details.requisition_slip.items || []
        rsIsConsoType.value = editRequest.value.details.requisition_slip.remarks?.toLowerCase().includes("consolidated")
    }
})

watch(
    () => editRequest.value.details,
    (newDetails) => {
        if (newDetails?.requisition_slip) {
            editRequest.value.form.date = new Date().toISOString().split("T")[0]
            editRequest.value.form.conso_reference_no = editRequest.value.details.requisition_slip?.reference_no || ""
            itemOptions.value = newDetails.requisition_slip.items || []
            rsIsConsoType.value = newDetails.requisition_slip.remarks?.toLowerCase().includes("consolidated")
        }
    },
    { deep: true }
)

const isSubmitting = ref(false)

const submitForm = async () => {
    try {
        if (!priceQuotation.value.details.items.length) {
            snackbar.add({
                type: "warning",
                text: "No items to update.",
            })
            return
        }

        isSubmitting.value = true
        mainStore.clearMessages()

        await Promise.all(priceQuotation.value.details.items.map(item =>
            mainStore.updatePriceQuotationItem(item.id, {
                actual_brand: item.brand,
                unit_price: item.price,
                remarks_during_canvass: item.remarks
            })
        ))

        snackbar.add({
            type: "success",
            text: "Price Quotation updated successfully."
        })
        emit("submit-success")
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error.message || "Failed to update"
        })
    } finally {
        isSubmitting.value = false
    }
}

// const submitForm = async () => {
//     try {
//         if (!priceQuotation.value.details.items.length) {
//             snackbar.add({
//                 type: "warning",
//                 text: "No items to update.",
//             })
//             return
//         }

//         for (const item of priceQuotation.value.details.items) {
//             await mainStore.updatePriceQuotationItem(item.id, {
//                 actual_brand: item.brand,
//                 unit_price: item.price,
//                 remarks_during_canvass: item.remarks
//             })
//         }

//         snackbar.add({
//             type: "success",
//             text: "Price Quotation updated successfully."
//         })
//         emit("submit-success")
//     } catch (error) {
//         snackbar.add({
//             type: "error",
//             text: error.message || "Failed to update"
//         })
//     }
// }

</script>

<template>
    <div class="text-gray-500 p-2">
        <form @submit.prevent="submitForm">
            <div class="flex flex-col gap-4 pt-4 w-full">
                <div class="basis-[10%] grow-1 shrink-0 flex items-center justify-center rounded-t mb-4">
                    <h3 class="pl-4 text-xl font-bold text-gray-900 p-4 tracking-wide">
                        Edit Price Quotation
                    </h3>
                </div>
                <div class="flex flex-col gap-4 mb-5">
                    <div class="flex flex-row justify-between gap-4">
                        <div class="w-full flex flex-col gap-2">
                            <div class="w-full">
                                <div class="grid grid-cols w-full gap-y-2 mb-2 mt-1">
                                    <label class="text-sm font-medium text-gray-600">Quotation Date:</label>
                                    <div class="border p-2 rounded-md">
                                        {{ priceQuotation.details?.quotation_date }}
                                    </div>
                                </div>
                                <div class="grid grid-cols w-full gap-y-2 mb-2 mt-1">
                                    <label class="text-sm font-medium text-gray-600">Supplier:</label>
                                    <div class="border p-2 rounded-md">
                                        {{ priceQuotation.details?.supplier_name }}
                                    </div>
                                </div>
                                <div class="grid grid-cols w-full gap-y-2 mb-2 mt-1">
                                    <label class="text-sm font-medium text-gray-600">Address:</label>
                                    <div class="border p-2 rounded-md">
                                        {{ priceQuotation.details?.supplier_address }}
                                    </div>
                                </div>
                                <div class="grid grid-cols w-full gap-y-2 mb-2 mt-1">
                                    <label class="text-sm font-medium text-gray-600">Contact Person:</label>
                                    <div class="border p-2 rounded-md">
                                        {{ priceQuotation.details?.supplier_contact_person }}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="w-full flex flex-col gap-2">
                            <div class="grid grid-cols w-full gap-y-2 mb-2 mt-1">
                                <label class="text-sm font-medium text-gray-600">Quotation Number:</label>
                                <div class="border p-2 rounded-md">
                                    {{ priceQuotation.details?.quotation_no }}
                                </div>
                            </div>
                            <div class="grid grid-cols w-full gap-y-2 mb-2 mt-1">
                                <label class="text-sm font-medium text-gray-600">Reference No.:</label>
                                <div class="border p-2 rounded-md">
                                    {{ priceQuotation.details?.reference_no }}
                                </div>
                            </div>
                            <div class="grid grid-cols w-full gap-y-2 mb-2 mt-1">
                                <label class="text-sm font-medium text-gray-600">Contact Number:</label>
                                <div class="border p-2 rounded-md">
                                    {{ priceQuotation.details?.supplier_contact_person_number }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="w-full">
                        <InventoryPriceQuotationItemListEdit
                            v-model="priceQuotation.details.items"
                        />
                    </div>
                    <div class="w-full p-4 bg-white rounded-lg">
                        <p class="text-sm font-medium text-gray-900">
                            Your promptness in giving us the price quotation of the above mentioned items is highly
                            appreciated.
                        </p>
                    </div>
                    <div class="flex w-full justify-end items-center gap-4 no-print">
                        <!-- <button
                            type="submit"
                            class="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                        >
                            Submit
                        </button> -->
                        <button
                            type="submit"
                            :disabled="isSubmitting"
                            class="flex items-center justify-center gap-2 text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span v-if="isSubmitting">
                                <Icon name="mdi:loading" class="animate-spin h-5 w-5" />
                            </span>
                            <span>{{ isSubmitting ? 'Submitting...' : 'Submit' }}</span>
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
