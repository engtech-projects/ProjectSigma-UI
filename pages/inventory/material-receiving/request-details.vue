<script setup>
import { useRoute } from "vue-router"
import { useReceivingStore } from "@/stores/inventory/receiving"

const mainStore = useReceivingStore()
const { receiving } = storeToRefs(mainStore)
const route = useRoute()
const validKey = ref(false)
onMounted(async () => {
    if (route.query.key) {
        validKey.value = true
        await mainStore.getOne(route.query.key)
    } else {
        validKey.value = false
    }
})

const systemHeaders = [
    { name: "Item Code", id: "item_code" },
    { name: "Item Description", id: "item_profile" },
    { name: "Specification", id: "specification" },
    { name: "Actual Brand Purchase", id: "actual_brand" },
    { name: "Quantity", id: "qty" },
    { name: "Unit of Measurement", id: "uom" },
    { name: "Unit Price", id: "unit_price" },
    { name: "Ext. Price", id: "ext_price" },
    { name: "Status", id: "status" },
    { name: "Remarks", id: "remarks" },
    { name: "Action", id: "" },
]

const printHeaders = [
    { name: "Item Code", id: "item_code" },
    { name: "Item Description", id: "item_profile" },
    { name: "Specification", id: "specification" },
    { name: "Actual Brand Purchase", id: "actual_brand" },
    { name: "Quantity", id: "accepted_qty" },
    { name: "Unit of Measurement", id: "uom" },
    { name: "Unit Price", id: "unit_price" },
    { name: "Ext. Price", id: "ext_price" },
    { name: "Accepted", id: "accepted" },
    { name: "Rejected", id: "rejected" },
    { name: "Remarks", id: "remarks" },
]

useHead({
    title: "Materials Receiving Report",
})
</script>

<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.INVENTORY_WAREHOUSE_MATERIALS_RECEIVING_GROUP,
        ])"
    >
        <LayoutBoards title="Materials Receiving">
            <template #header-options>
                <PsCloseBackOrPrevpage prev-page="/inventory/material-receiving" />
            </template>
            <template #default>
                <template v-if="validKey">
                    <LayoutPrintAdvanced v-if="receiving.details" class="min-h-40">
                        <template #print-layout>
                            <InventoryReceivingDetailsPrintLayout
                                :data="receiving.details"
                                title="Materials Receiving Report"
                                :header-columns="printHeaders"
                            />
                        </template>
                        <template #system-layout>
                            <InventoryReceivingDetails
                                v-model="receiving.details"
                                title="Materials Receiving"
                                :header-columns="systemHeaders"
                            />
                        </template>
                    </LayoutPrintAdvanced>
                </template>
                <template v-else>
                    <div class="grid grid-cols-1 gap-4">
                        <h2> 404 NOT FOUND</h2>
                    </div>
                </template>
            </template>
        </LayoutBoards>
    </LayoutAcessContainer>
</template>
