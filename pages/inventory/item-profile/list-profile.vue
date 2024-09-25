<script setup>
import { useItemProfileStore } from "@/stores/inventory/itemprofiles"

useHead({
    title: "Item Profile List",
})

const main = useItemProfileStore()
const { itemDetails } = storeToRefs(main)
main.getItemProfile()

const headers = [
    { name: "Item Description", id: "item_description" },
    { name: "Thickness", id: "thickness_val" },
    { name: "Length", id: "length_val" },
    { name: "Width", id: "width_val" },
    { name: "Height", id: "height_val" },
    { name: "Outside Diameter", id: "outside_diameter_val" },
    { name: "Inside Diameter", id: "inside_diameter_val" },
    { name: "Volume", id: "volume_val" },
    { name: "Specification", id: "specification" },
    { name: "Grade", id: "grade" },
    { name: "Color", id: "color" },
    { name: "UOM", id: "uom" },
    { name: "Item Group", id: "item_group" },
    { name: "Sub Item Group", id: "sub_item_group" },
    { name: "Inventory Type", id: "inventory_type" },
    { name: "Active Status", id: "active_status" },
    { name: "Action", id: "" },
]

const changePaginate = (newParams) => {
    itemDetails.value.params.page = newParams.page ?? ""
}

</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.inventory_item_profile,
        ])"
    >
        <LayoutLoadingContainer class="w-full" :loading="itemDetails.isLoading">
            <div class="flex flex-col md:flex-row gap-4 mb-4">
                <InventoryItemProfileList
                    title="Item Profile List"
                    :header-columns="headers"
                    :data="itemDetails.list"
                />
            </div>
            <div class="flex justify-end mx-auto">
                <CustomPagination
                    v-if="itemDetails.list.length"
                    :links="itemDetails.pagination"
                    @change-params="changePaginate"
                />
            </div>
        </LayoutLoadingContainer>
    </LayoutAcessContainer>
</template>
