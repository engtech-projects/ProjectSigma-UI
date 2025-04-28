<script setup lang="ts">
import { usePurchaseOrderStore } from "@/stores/inventory/procurement/purchaseorder"
const generateReportstore = usePurchaseOrderStore()
const { itemList } = storeToRefs(generateReportstore)
defineProps({
    title: {
        type: String,
        required: true,
    }
})
const headers = [
    { name: "Item No.", id: "item_no" },
    { name: "Item Description", id: "item_description" },
    { name: "Specification", id: "specification" },
    { name: "QTY", id: "qty" },
    { name: "UNIT", id: "unit" },
    { name: "Actual Purchased Brand/Quarry Source", id: "apqs" },
    { name: "Unit Price", id: "unit_price" },
    { name: "Net of VAT", id: "net_vat" },
    { name: "Input Vat", id: "input_vat" },
    { name: "Net Amount", id: "net_amount" },
]
</script>
<template>
    <div class="text-gray-500 p-2">
        <LayoutPrint>
            <PrintTableFormat />
            <h5 v-if="title" class="text-2xl font-medium mb-8 text-gray-900 text-center p-2">
                {{ title }}
            </h5>
            <div class="flex flex-col justify-center items-center">
                <div class="w-full flex flex-col gap-4 px-2">
                    <div class="flex flex-row gap-4">
                        <div class="flex flex-col w-full">
                            <InventoryCommonFormPsFormLabel :value="itemList.data.date" title="Date" />
                        </div>
                        <div class="flex flex-col w-full">
                            <InventoryCommonFormPsFormLabel :value="itemList.data.po_number" title="PO Number" />
                        </div>
                    </div>
                    <div class="flex flex-row gap-4 w-full">
                        <div class="flex flex-col w-full">
                            <InventoryCommonFormPsFormLabel :value="itemList.data.supplier_name" title="Supplier Name" />
                        </div>
                        <div class="flex flex-col w-full" />
                    </div>
                    <div class="flex flex-row gap-4">
                        <div class="flex flex-col w-full">
                            <InventoryCommonFormPsFormLabel :value="itemList.data.supplier_address" title="Supplier Address" />
                        </div>
                        <div class="flex flex-col w-full">
                            <InventoryCommonFormPsFormLabel :value="itemList.data.rs_no" title="RS No" />
                        </div>
                    </div>
                    <div class="flex flex-row gap-4">
                        <div class="flex flex-col w-full">
                            <InventoryCommonFormPsFormLabel :value="itemList.data.contact_number" title="Contact Number" />
                        </div>
                        <div class="flex flex-col w-full">
                            <InventoryCommonFormPsFormLabel :value="itemList.data.deliver_to" title="Delivered To" />
                        </div>
                    </div>
                    <div class="flex flex-row gap-4">
                        <div class="flex flex-col w-full">
                            <InventoryCommonFormPsFormLabel :value="itemList.data.project_code" title="Project Code" />
                        </div>
                        <div class="flex flex-col w-full">
                            <InventoryCommonFormPsFormLabel :value="itemList.data.equipment_no" title="Equipment No" />
                        </div>
                    </div>
                    <div class="flex flex-row gap-4">
                        <div class="flex flex-col w-full">
                            <InventoryCommonFormPsFormLabel :value="itemList.data.name_on_the_receipt" title="Name on the receipt" />
                        </div>
                        <div class="flex flex-col w-full" />
                    </div>
                    <div class="flex flex-col gap-4 mb-5 mt-4">
                        <table class="printTable table-auto border-collapse border border-gray-500">
                            <thead class="text-black text-md">
                                <tr>
                                    <th
                                        v-for="header in headers"
                                        :key="header.name+'headerRow'"
                                        class="p-1 border-gray-500 border"
                                    >
                                        {{ header.name }}
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="text-sm text-center">
                                <tr v-for="data, index in itemList.data.list" :key="'OvertimeMonitoring' + index" class="h-2">
                                    <td class="border border-gray-500 h-8">
                                        {{ index + 1 }}
                                    </td>
                                    <td class="border border-gray-500 h-8">
                                        {{ data.item_description }}
                                    </td>
                                    <td class="border border-gray-500 h-8">
                                        {{ data.specification }}
                                    </td>
                                    <td class="border border-gray-500 h-8">
                                        {{ data.qty }}
                                    </td>
                                    <td class="border border-gray-500 h-8">
                                        {{ data.unit }}
                                    </td>
                                    <td class="border border-gray-500 h-8">
                                        {{ data.apqs }}
                                    </td>
                                    <td class="border border-gray-500 h-8">
                                        {{ data.unit_price }}
                                    </td>
                                    <td class="border border-gray-500 h-8">
                                        {{ data.net_vat }}
                                    </td>
                                    <td class="border border-gray-500 h-8">
                                        {{ data.input_vat }}
                                    </td>
                                    <td class="border border-gray-500 h-8">
                                        {{ data.net_amount }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="flex flex-row gap-4">
                        <div class="flex flex-col items-end w-full">
                            <InventoryCommonFormPsFormLabel :value="itemList.data.total_amount" title="Total Amount" />
                        </div>
                    </div>
                    <div class="flex flex-row gap-4">
                        <div class="flex flex-col w-full">
                            <InventoryCommonFormPsFormLabel :value="itemList.data.payment_terms" title="Payment Terms" />
                        </div>
                        <div class="flex flex-col w-full" />
                    </div>
                    <div class="flex flex-row gap-4">
                        <div class="flex flex-col w-full">
                            <InventoryCommonFormPsFormLabel :value="itemList.data.availability" title="Availability" />
                        </div>
                        <div class="flex flex-col w-full" />
                    </div>
                    <div class="flex flex-row gap-4">
                        <div class="flex flex-col w-full">
                            <InventoryCommonFormPsFormLabel :value="itemList.data.delivery_terms" title="Delivery Terms" />
                        </div>
                        <div class="flex flex-col w-full" />
                    </div>
                    <div class="flex flex-row gap-4 mb-5">
                        <div id="approvals" class="w-full">
                            <LayoutApprovalsListView :approvals="itemList.data.approvals" />
                        </div>
                    </div>
                </div>
            </div>
        </LayoutPrint>
    </div>
</template>
