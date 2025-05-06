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
        supplier_id: "BrandX",
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
        supplier_id: "BrandY",
        unit_price: 40,
        net_of_vat: 950,
        input_vat: 50,
        gross_amount: 1000,
    }
])

const headers = [
    { name: "ITEM NO.", id: "id" },
    { name: "ITEM DESCRIPTION", id: "item_id" },
    { name: "SPECIFICATION", id: "specification" },
    { name: "QTY", id: "quantity" },
    { name: "UOM", id: "uom" },
    { name: "SUPPLIER", id: "supplier_id" },
    { name: "UNIT PRICE", id: "unit_price" },
    { name: "NET OF VAT", id: "net_of_vat" },
    { name: "INPUT VAT", id: "input_vat" },
    { name: "GROSS AMOUNT", id: "gross_amount" }
]
const changesHeaders = [
    { name: "CHANGE OF SUPPLIER", id: "supplier_id" },
    { name: "CHANGE IN ITEM DESCRIPTION/SPECIFICATION", id: "specification" },
    { name: "CHANGE IN QTY", id: "quantity" },
    { name: "CHANGE IN UOM", id: "uom" },
    { name: "CHANGE IN UNIT PRICE", id: "unit_price" },
    { name: "NEW TOTAL", id: "gross_amount" },
    { name: "CHANGE IN BRAND", id: "supplier_id" },
    { name: "CANCEL ITEM", id: "cancel_item" },
]
const dummyPOs = ref([
    {
        po_number: "PO-001",
        po_date: "April 25, 2025",
        project_code: "001-2323-232",
        equipment_number: "Equip-923-211",
        date: "April 24, 2025",
        items: [
            {
                id: 1,
                item_id: "ITEM001",
                specification: "Steel",
                quantity: 10,
                uom: "PCS",
                supplier_id: "BrandX",
                unit_price: 100,
                net_of_vat: 950,
                input_vat: 50,
                gross_amount: 1000,
            }
        ]
    },
    {
        po_number: "PO-002",
        po_date: "May 2, 2025",
        project_code: "001-4545-232",
        equipment_number: "Equip-111-999",
        date: "May 1, 2025",
        items: [
            {
                id: 2,
                item_id: "ITEM999",
                specification: "Alloy",
                quantity: 5,
                uom: "BOX",
                supplier_id: "BrandY",
                unit_price: 200,
                net_of_vat: 190,
                input_vat: 10,
                gross_amount: 200,
            }
        ]
    }
])
const selectedPO = ref(dummyPOs.value[0].po_number)
watch(selectedPO, (newVal) => {
    const selected = dummyPOs.value.find(po => po.po_number === newVal)
    if (selected) {
        form.value.po_number = selected.po_number
        form.value.po_date = selected.po_date
        form.value.project_code = selected.project_code
        form.value.equipment_number = selected.equipment_number
        form.value.date = selected.date
        selectedItems.value = selected.items
    }
}, { immediate: true })

</script>

<template>
    <div class="text-gray-500 p-2">
        <form>
            <div class="flex flex-col gap-4 w-full">
                <div class="flex flex-col gap-4 mb-5">
                    <div class="flex flex-row justify-between gap-4">
                        <div class="w-full flex flex-col gap-2">
                            <InventoryCommonFormPsFormLabel title="NCPO NO" value="NCPO-001-123456" />
                            <div class="flex flex-row items-center gap-4">
                                <label for="poSelect" class="w-full flex flex-col text-sm uppercase font-medium text-gray-900">
                                    PO NUMBER
                                </label>
                                <label>
                                    :
                                </label>
                                <select id="poSelect" v-model="selectedPO" class="w-full block">
                                    <option v-for="po in dummyPOs" :key="po.po_number" :value="po.po_number">
                                        {{ po.po_number }}
                                    </option>
                                </select>
                            </div>
                            <InventoryCommonFormPsFormLabel title="PO DATE" :value="form.po_date" />
                            <InventoryCommonFormPsFormLabel title="PROJECT CODE" :value="form.project_code" />
                            <InventoryCommonFormPsFormLabel title="EQUIPMENT NUMBER" :value="form.equipment_number" />
                        </div>
                        <div class="w-full flex flex-col gap-2">
                            <InventoryCommonFormPsFormLabel title="DATE" :value="form.date" />
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
