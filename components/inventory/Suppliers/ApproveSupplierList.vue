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

const editInformation = (data) => {
    navigateTo({
        path: "/inventory/bom/request-details",
        query: {
            key: data.id
        },
        replace: true
    })
}

const editAccess = () => {
    let access = false
    if (useCheckAccessibility([AccessibilityTypes.inventory_procurement_edit])) {
        access = true
    }
    return access
}
console.log(editAccess())

const actions = {
    showTable: false,
    edit: editAccess(),
    delete: false,
}

</script>
<template>
    <div class="h-full w-full">
        <div id="itemDetails">
            <LayoutPsTable
                :header-columns="headers"
                :actions="actions"
                :datas="List.list ?? []"
                @edit-row="editInformation"
            />
        </div>
    </div>
</template>
