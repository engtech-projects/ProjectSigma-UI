<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useBOMStore } from "@/stores/inventory/bom"
const BOMStore = useBOMStore()
const { allRequests: List } = storeToRefs(BOMStore)
onMounted(() => {
    if (!List.isLoaded) {
        BOMStore.getAllRequests()
    }
})
const headers = [
    { name: "Item Summary", id: "profile_summary" },
    { name: "Request Status", id: "request_status" },
]
const actions = {
    showTable: true,
    edit: false,
    delete: false,
}
</script>
<template>
    <div class="h-full w-full">
        <div id="itemDetails">
            <InventoryCommonLayoutBOMTable
                :header-columns="headers"
                :actions="actions"
                :datas="List.list ?? []"
            />
        </div>
    </div>
</template>
