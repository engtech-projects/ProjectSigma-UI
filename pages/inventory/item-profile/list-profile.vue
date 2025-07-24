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
    { name: "Thickness", id: "thickness" },
    { name: "Length", id: "length" },
    { name: "Width", id: "width" },
    { name: "Height", id: "height" },
    { name: "Outside Diameter", id: "outside_diameter" },
    { name: "Inside Diameter", id: "inside_diameter" },
    { name: "Angle", id: "angle" },
    { name: "Size", id: "size" },
    { name: "Volume", id: "volume" },
    { name: "Weight", id: "weight" },
    { name: "Grade", id: "grade" },
    { name: "Volts", id: "volts" },
    { name: "Plates", id: "plates" },
    { name: "Part Number", id: "part_number" },
    { name: "Color", id: "color" },
    { name: "Specification", id: "specification" },
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
        <LayoutBoards
            :loading="itemDetails.isLoading"
        >
            <div class="flex flex-col md:flex-row gap-4 mb-4">
                <InventoryItemProfileList
                    title="Item Profile List"
                    :header-columns="headers"
                    :datas="itemDetails.list"
                />
            </div>
            <div class="flex justify-end mx-auto">
                <PsCustomPagination
                    v-if="itemDetails.list.length"
                    :links="itemDetails.pagination"
                    @change-params="changePaginate"
                />
            </div>
        </LayoutBoards>
    </LayoutAcessContainer>
</template>
