<script setup>
import { useRoute } from "vue-router"
import { useCanvassSummaryStore } from "~/stores/inventory/procurement/canvassSummary"
const mainStore = useCanvassSummaryStore()
const { canvassSummary } = storeToRefs(mainStore)
const route = useRoute()
const validKey = ref(false)
if (route.query.key) {
    validKey.value = true
    await mainStore.getOne(route.query.key)
} else {
    validKey.value = false
}

const headers = [
    { name: "Item Description", id: "item_id" },
    { name: "Specification", id: "specification" },
    { name: "Quantity", id: "qty" },
    { name: "UOM", id: "unit" },
    { name: "Preferred Brand", id: "preferred_brand" },
    { name: "Actual Brand", id: "actual_brand" },
    { name: "Unit Price", id: "unit_price" },
    { name: "Remarks During Canvass", id: "remarks" },
]

useHead({
    title: "Canvass Summary",
})

</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.INVENTORY_PROCUREMENT_CANVASSSUMMARY_GROUP,
        ])"
    >
        <LayoutBoards title="Canvass Summary" class="w-full" :loading="canvassSummary.isLoading">
            <template #header-options>
                <PsCloseBackOrPrevpage prev-page="/inventory/procurement/canvass-summary" />
            </template>
            <template #default>
                <template v-if="validKey">
                    <LayoutPrintAdvanced>
                        <template #system-layout>
                            <LayoutBoards>
                                <InventoryCanvassSummarySystemDetailsLayout
                                    v-if="canvassSummary.details"
                                    title="Canvass Summary"
                                    :data="canvassSummary.details"
                                />
                            </LayoutBoards>
                        </template>
                        <template #print-layout>
                            <InventoryCanvassSummaryPrintDetailsLayout
                                v-if="canvassSummary.details"
                                title="Canvass Summary"
                                :data="canvassSummary.details"
                                :header-columns="headers"
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
    </layoutacesscontainer>
</template>
