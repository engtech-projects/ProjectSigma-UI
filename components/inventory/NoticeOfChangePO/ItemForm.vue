<script setup>
import { ref, defineModel } from "vue"
import { storeToRefs } from "pinia"
import { useNcpoStore, APPROVALS } from "@/stores/inventory/procurement/ncpo"
import { useApprovalStore } from "@/stores/hrms/setup/approvals"

const mainStore = useNcpoStore()
const { approvalList } = storeToRefs(mainStore)
const form = defineModel({ required: true, type: Object })

const approvals = useApprovalStore()
approvalList.value.list = await approvals.getApprovalByName(APPROVALS)

const selectedItems = ref([
    {
        id: 1,
        item_id: "ITEM001",
        specification: "High quality steel",
        quantity: 10,
        uom: "PCS",
        preferred_brand: "BrandX",
        unit_price: 100,
        net_of_vat: 950,
        input_vat: 50,
        gross_amount: 1000,
    },
    {
        id: 2,
        item_id: "ITEM002",
        specification: "Heavy duty bolts",
        quantity: 25,
        uom: "SET",
        preferred_brand: "BrandY",
        unit_price: 40,
        net_of_vat: 950,
        input_vat: 50,
        gross_amount: 1000,
    }
])
// const changeItems = ref([
//     {
//         item_id: "ITEM001",
//         specification: "Updated Spec A",
//         quantity: 12,
//         uom: "pcs",
//         preferred_brand: "BrandY",
//         unit_price: 105,
//         net_of_vat: 94.5,
//         input_vat: 10.5,
//         gross_amount: 115.5,
//         cancel_item: false,
//     },
// ])

const headers = [
    { name: "ITEM NO.", id: "id" },
    { name: "ITEM DESCRIPTION", id: "item_id" },
    { name: "SPECIFICATION", id: "specification" },
    { name: "QTY", id: "quantity" },
    { name: "UOM", id: "uom" },
    { name: "SUPPLIER", id: "preferred_brand" },
    { name: "UNIT PRICE", id: "unit_price" },
    { name: "NET OF VAT", id: "net_of_vat" },
    { name: "INPUT VAT", id: "input_vat" },
    { name: "GROSS AMOUNT", id: "gross_amount" }
]
const changesHeaders = [
    { name: "CHANGE OF SUPPLIER", id: "preferred_brand" },
    { name: "CHANGE IN ITEM DESCRIPTION/SPECIFICATION", id: "specification" },
    { name: "CHANGE IN QTY", id: "quantity" },
    { name: "CHANGE IN UOM", id: "uom" },
    { name: "CHANGE IN UNIT PRICE", id: "unit_price" },
    { name: "NEW TOTAL", id: "gross_amount" },
    { name: "CHANGE IN BRAND", id: "preferred_brand" },
    { name: "CANCEL ITEM", id: "cancel_item" },
]
const handleChange = (newItems) => {
    console.log("Updated items:", newItems)
}
</script>

<template>
    <div class="text-gray-500 p-2">
        <form>
            <div class="flex flex-col gap-4 w-full">
                <div class="flex flex-col gap-4 mb-5">
                    <div class="flex flex-row justify-between gap-4">
                        <div class="w-full flex flex-col gap-2">
                            <InventoryCommonFormPsFormLabel title="NCPO NO" value="NCPO-001-123456" />
                            <LayoutFormPsTextInput v-model="form.po_number" class="w-full" title="PO NUMBER" />
                            <InventoryCommonFormPsFormLabel title="PO DATE" value="April 25, 2025" />
                            <InventoryCommonFormPsFormLabel title="PROJECT CODE" value="001-2323-232" />
                            <InventoryCommonFormPsFormLabel title="EQUIPMENT NUMBER" value="Equip-923-211" />
                        </div>
                        <div class="w-full flex flex-col gap-2">
                            <InventoryCommonFormPsFormLabel title="DATE" value="April 24, 2025" />
                        </div>
                    </div>

                    <div class="w-full">
                        <InventoryNoticeOfChangePODetailsEntirePo title="DETAILS OF THE ENTIRE PO" :headers="headers" :items="selectedItems" />
                    </div>
                    <div class="w-full">
                        <InventoryNoticeOfChangePOChangesToIndividualLinesPo
                            title="CHANGES TO INDIVIDUAL LINES ON PO"
                            :headers="changesHeaders"
                            :items="selectedItems"
                            :base-items="selectedItems"
                            @change="handleChange"
                        />
                    </div>

                    <div class="flex flex-row justify-between gap-4">
                        <div class="w-full flex flex-col gap-2">
                            <LayoutFormPsTextInput v-model="form.justification" :required="true" class="w-full" title="Justification" />
                        </div>
                    </div>
                </div>

                <div class="flex w-full">
                    <div class="pt-5 w-full mb-2 rounded-lg p-4 bg-slate-100 ">
                        <label for="approved_by" class="block text-sm font-medium text-gray-900 dark:text-white">Approval:</label>
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
                        class="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>
