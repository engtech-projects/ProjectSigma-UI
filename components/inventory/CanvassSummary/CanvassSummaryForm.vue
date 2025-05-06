<script setup>
import { useCanvassSummaryStore, TERMS, AVAILABILITY, DELIVERY_TERMS } from "~/stores/inventory/procurement/canvassSummary"

const mainStore = useCanvassSummaryStore()
// mainStore.fetchQuotations()

const form = defineModel({ required: true, type: Object })

const snackbar = useSnackbar()

const storeForm = async () => {
    try {
        // Prepare the payload with form data and selected items/suppliers
        const payload = {
            ...form.value,
            supplierId: supplierId.value,
            selectedItems: Object.keys(selectedItems.value).filter(key => selectedItems.value[key] === true)
                .map(key => parseInt(key)),
            selectedSuppliers: Object.entries(selectedSuppliers.value)
                .filter(([_, value]) => value !== null)
                .reduce((acc, [key, value]) => {
                    acc[key] = value
                    return acc
                }, {}),
            activeSupplier: activeSupplier.value
        }

        // Pass the payload to the store method
        await mainStore.storeRequest(payload)

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
const supplierId = defineModel("supplierId", { required: false, type: Number })

const suppliers = [
    {
        id: 1,
        name: "ABC Hardware Supply",
        address: "123 Main St, Metro City",
        contactPerson: "John Smith",
        contactNumber: "555-1234",
        items: [
            { unit_price: 850, total: 8500, remarks: "In stock" },
            { unit_price: 900, total: 9000, remarks: "In stock" },
            { unit_price: 950, total: 9500, remarks: "In stock" },
            { unit_price: 1000, total: 10000, remarks: "In stock" },
            { unit_price: 1050, total: 10500, remarks: "In stock" },
            { unit_price: 1050, total: 10500, remarks: "In stock" },
        ]
    },
    {
        id: 2,
        name: "XYZ Building Materials",
        address: "456 Oak Ave, Capital City",
        contactPerson: "Sarah Johnson",
        contactNumber: "555-5678",
        items: [
            { unit_price: 900, total: 9000, remarks: "2-week lead time" },
            { unit_price: 875, total: 8750, remarks: "Immediate availability" },
            { unit_price: 950, total: 9500, remarks: "3-day delivery" },
            { unit_price: 1000, total: 10000, remarks: "In stock" },
            { unit_price: 1050, total: 10500, remarks: "In stock" },
            { unit_price: 1100, total: 11000, remarks: "In stock" }
        ]
    },
    {
        id: 3,
        name: "MegaTools Enterprises",
        address: "789 Pine Blvd, Bay City",
        contactPerson: "Mike Wilson",
        contactNumber: "555-9012",
        items: [
            { unit_price: 850, total: 8500, remarks: "In stock, 3-day delivery" },
            { unit_price: 900, total: 9000, remarks: "2-week lead time" },
            { unit_price: 950, total: 9500, remarks: "Immediate availability" },
            { unit_price: 1000, total: 10000, remarks: "In stock" },
            { unit_price: 1050, total: 10500, remarks: "In stock" },
            { unit_price: 1100, total: 11000, remarks: "In stock" }
        ]
    },
]

const supplierColumns = [
    { name: "ITEM NO.", key: "id" },
    { name: "ITEM DESCRIPTION", key: "itemDescription" },
    { name: "SPECIFICATION", key: "specification" },
    { name: "QTY", key: "qty" },
    { name: "UNIT OF MEASUREMENT", key: "unit" },
    ...[1, 2, 3].flatMap(i => [
        { name: "UNIT PRICE", key: `supplier${i}_unit_price` },
        { name: "TOTAL", key: `supplier${i}_total` },
        { name: "REMARKS", key: `supplier${i}_remarks` }
    ])
]

const canvassItems = [
    {
        id: 1,
        itemDescription: "Steel Pipe",
        specification: "2-inch diameter, galvanized",
        qty: 10,
        unit: "PCS",
    },
    {
        id: 2,
        itemDescription: "Cement",
        specification: "Portland, 40kg bag",
        qty: 50,
        unit: "BAGS",
    },
    {
        id: 3,
        itemDescription: "Electrical Wire",
        specification: "12 AWG, copper, 100m roll",
        qty: 5,
        unit: "ROLLS",
    },
    {
        id: 4,
        itemDescription: "PVC Pipe",
        specification: "1-inch diameter, 3m length",
        qty: 20,
        unit: "PCS",
    },
    {
        id: 5,
        itemDescription: "Steel Bar",
        specification: "10mm diameter, 6m length",
        qty: 20,
        unit: "PCS",
    },
    {
        id: 6,
        itemDescription: "Concrete Nails",
        specification: "3 inch",
        qty: 50,
        unit: "BOXES",
    },
]
defineProps({
    title: {
        type: String,
        required: true,
    },
})
const selectType = ref("department")
</script>
<template>
    <div class="text-gray-500 p-2">
        <form @submit.prevent="storeForm">
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
                                <div class="flex flex-row items-center gap-2">
                                    <div class="w-full">
                                        <HrmsCommonDepartmentProjectSelector
                                            v-model:select-type="selectType"
                                            v-model:department-id="supplierId"
                                            v-model:project-id="supplierId"
                                            title="Department/Project"
                                        />
                                    </div>
                                </div>
                                <div class="flex flex-row items-center gap-2">
                                    <LayoutFormPsTextInput v-model="form.rs_no" :required="true" class="w-full" title="Conso/RS Reference No." />
                                </div>
                            </div>
                        </div>
                        <div class="w-full flex flex-col gap-2">
                            <LayoutFormPsTextInput v-model="form.cs_no" :required="true" class="w-full" title="CS Number" />
                        </div>
                    </div>
                    <!-- items table -->
                    <div class="w-full">
                        <InventoryCanvassSummaryItemList
                            :items="canvassItems"
                            :suppliers="suppliers"
                            :columns="supplierColumns"
                            @select-supplier="(i) => selectedSupplierIndex = i"
                        />

                        <div class="flex flex-col gap-4 mt-4">
                            <div class="w-1/4">
                                <label class="font-medium">Terms and Conditions:</label>
                                <select v-model="form.terms" class="w-full border rounded px-2 py-1">
                                    <option v-for="terms, i in TERMS" :key="i" :value="terms">
                                        {{ terms }}
                                    </option>
                                </select>
                            </div>
                            <div class="w-1/4">
                                <label class="font-medium">Availability:</label>
                                <select v-model="form.availability" class="w-full border rounded px-2 py-1">
                                    <option v-for="availability, i in AVAILABILITY" :key="i" :value="availability">
                                        {{ availability }}
                                    </option>
                                </select>
                            </div>
                            <div class="w-1/4">
                                <label class="font-medium">Delivery Terms:</label>
                                <select v-model="form.delivery_terms" class="w-full border rounded px-2 py-1">
                                    <option v-for="delivery_terms, i in DELIVERY_TERMS" :key="i" :value="delivery_terms">
                                        {{ delivery_terms }}
                                    </option>
                                </select>
                            </div>
                        </div>

                        <div class="mt-4">
                            <label class="font-medium">Remarks:</label>
                            <textarea v-model="form.remarks" class="w-full border rounded px-2 py-1" rows="3" />
                        </div>
                    </div>
                    <div class="flex w-full justify-end no-print">
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
