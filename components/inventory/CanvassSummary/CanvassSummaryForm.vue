<script setup>
import { useCanvassSummaryStore, TERMS, AVAILABILITY, DELIVERY_TERMS } from "~/stores/inventory/procurement/canvassSummary"

const mainStore = useCanvassSummaryStore()
// mainStore.fetchQuotations()

const form = defineModel({ required: true, type: Object })

const snackbar = useSnackbar()

const storeForm = async () => {
    try {
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
const supplierId = defineModel("supplierId", { required: false, type: Number })

const suppliers = [
    {
        id: 1,
        name: "ABC Hardware Supply",
        address: "123 Main St, Metro City",
        contactPerson: "John Smith",
        contactNumber: "555-1234"
    },
    {
        id: 2,
        name: "XYZ Building Materials",
        address: "456 Oak Ave, Capital City",
        contactPerson: "Sarah Johnson",
        contactNumber: "555-5678"
    },
    {
        id: 3,
        name: "MegaTools Enterprises",
        address: "789 Pine Blvd, Bay City",
        contactPerson: "Mike Wilson",
        contactNumber: "555-9012"
    }
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
        supplier1_unit_price: 850,
        supplier1_total: 8500,
        supplier1_remarks: "In stock, 3-day delivery",
        supplier2_unit_price: 875,
        supplier2_total: 8750,
        supplier2_remarks: "2-week lead time",
        supplier3_unit_price: 840,
        supplier3_total: 8400,
        supplier3_remarks: "Immediate availability"
    },
    {
        id: 2,
        itemDescription: "Cement",
        specification: "Portland, 40kg bag",
        qty: 50,
        unit: "BAGS",
        supplier1_unit_price: 255,
        supplier1_total: 12750,
        supplier1_remarks: "Free delivery",
        supplier2_unit_price: 250,
        supplier2_total: 12500,
        supplier2_remarks: "Bulk discount applied",
        supplier3_unit_price: 265,
        supplier3_total: 13250,
        supplier3_remarks: "High quality import"
    },
    {
        id: 3,
        itemDescription: "Electrical Wire",
        specification: "12 AWG, copper, 100m roll",
        qty: 5,
        unit: "ROLLS",
        supplier1_unit_price: 2200,
        supplier1_total: 11000,
        supplier1_remarks: "With certification",
        supplier2_unit_price: 2150,
        supplier2_total: 10750,
        supplier2_remarks: "Local manufacturer",
        supplier3_unit_price: 2300,
        supplier3_total: 11500,
        supplier3_remarks: "Premium quality"
    },
]

// Calculate total amount (sum of the lowest prices for each item)
const totalAmount = computed(() => {
    const total = canvassItems.reduce((sum, item) => {
        const lowestPrice = Math.min(item.supplier1_total, item.supplier2_total, item.supplier3_total)
        return sum + lowestPrice
    }, 0)
    return new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(total)
})

const selectType = ref("department")
</script>
<template>
    <div class="text-gray-500 p-2">
        <form @submit.prevent="storeForm">
            <div class="flex flex-col gap-4 pt-4 w-full">
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
                                    <LayoutFormPsTextInput v-model="form.rs_no" :required="true" class="w-full" title="RS No." />
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
                                    <LayoutFormPsInput v-model="form.equipment_no" :required="true" class="w-full" title="Equipment No." />
                                </div>
                            </div>
                        </div>
                        <div class="w-full flex flex-col gap-2">
                            <LayoutFormPsTextInput v-model="form.quotation_no" :required="true" class="w-full" title="CS Number" />
                            <LayoutFormPsTextInput v-model="form.conso_reference_no" :required="true" class="w-full" title="Conso Reference No." />
                            <LayoutFormPsTextInput v-model="form.contact_no" :required="true" class="w-full" title="Project Address" />
                            <LayoutFormPsInput v-model="form.proj_address" :required="true" class="w-full" title="Project Address" />
                        </div>
                    </div>
                    <!-- items table -->
                    <div class="w-full">
                        <table class="w-full table-auto border border-gray-300 text-sm text-gray-600">
                            <thead class="bg-gray-100">
                                <tr>
                                    <th class="border px-2 py-1 text-center bg-gray-50" colspan="5">
                                        REQUESTED ITEM(S) / SERVICE(S)
                                    </th>
                                    <th v-for="(supplier, index) in suppliers" :key="index" class="border p-4 text-center bg-gray-50" colspan="3">
                                        <div class="flex flex-col items-center gap-1">
                                            <div class="text-lg font-semibold text-gray-700">
                                                {{ supplier.name }}
                                            </div>
                                            <div class="text-sm text-gray-600">
                                                {{ supplier.address }}
                                            </div>
                                            <div class="text-sm text-gray-600">
                                                {{ supplier.contactPerson }}
                                            </div>
                                            <div class="text-sm text-gray-600">
                                                {{ supplier.contactNumber }}
                                            </div>
                                        </div>
                                    </th>
                                </tr>
                                <tr>
                                    <th v-for="col in supplierColumns" :key="col.key" class="border px-2 py-1 text-center text-sm">
                                        {{ col.name }}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(row, index) in canvassItems" :key="index" class="text-center">
                                    <td v-for="col in supplierColumns" :key="col.key" class="border px-2 py-1 text-center">
                                        <template v-if="col.key.includes('unit_price')">
                                            ₱{{ row[col.key].toLocaleString() }}
                                        </template>
                                        <template v-else-if="col.key.includes('total')">
                                            ₱{{ row[col.key].toLocaleString() }}
                                        </template>
                                        <template v-else>
                                            {{ row[col.key] }}
                                        </template>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <div class="flex flex-col gap-4 mt-4">
                            <div class="flex font-bold">
                                <span class="pr-2">Total Amount:</span>
                                <span class="text-lg">{{ totalAmount }}</span>
                            </div>

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
