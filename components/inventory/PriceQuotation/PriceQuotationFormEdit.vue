<script setup lang="ts">
import { usePriceQuotationStore } from "~/stores/inventory/procurement/pricequotation"

const mainStore = usePriceQuotationStore()
const { editRequest, priceQuotation } = storeToRefs(mainStore)

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
                        <div class="overflow-x-auto rounded-lg shadow-md bg-white">
                            <table class="min-w-full text-sm text-left border border-gray-200">
                                <thead class="bg-gray-100">
                                    <tr>
                                        <th class="p-3 border-b font-medium">
                                            Item Description
                                        </th>
                                        <th class="p-3 border-b font-medium">
                                            Specification
                                        </th>
                                        <th class="p-3 border-b font-medium">
                                            QTY
                                        </th>
                                        <th class="p-3 border-b font-medium">
                                            UOM
                                        </th>
                                        <th class="p-3 border-b font-medium">
                                            Preferred Brand
                                        </th>
                                        <th class="p-3 border-b font-medium">
                                            Actual Brand
                                        </th>
                                        <th class="p-3 border-b font-medium">
                                            Unit Price
                                        </th>
                                        <th class="p-3 border-b font-medium">
                                            Remarks
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <InventoryPriceQuotationItemListEdit
                                        v-for="(_item, index) in priceQuotation.details?.items"
                                        :key="index+'pq-item'"
                                        v-model="priceQuotation.details.items[index]"
                                    />
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="w-full p-4 bg-white rounded-lg">
                        <p class="text-sm font-medium text-gray-900">
                            Your promptness in giving us the price quotation of the above mentioned items is highly
                            appreciated.
                        </p>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>
