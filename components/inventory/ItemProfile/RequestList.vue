<script setup>
import { storeToRefs } from "pinia"
import { useItemProfileStore } from "@/stores/inventory/itemprofiles"

const mains = useItemProfileStore()
const { allRequests: List, getParams, pagination, errorMessage, successMessage } = storeToRefs(mains)

const boardLoading = ref(false)

const headers = [
    { name: "ID", id: "item_profiles.id" },
    { name: "SKU", id: "item_profiles.sku" },
    { name: "Item Description", id: "item_profiles.item_description" },
    { name: "Thickness", id: "item_profiles.thickness_val" },
    { name: "Length", id: "item_profiles.thickness_val" },
    { name: "Width", id: "item_profiles.width_val" },
    { name: "Height", id: "item_profiles.height_val" },
    { name: "Outside Diameter", id: "item_profiles.outside_diameter_val" },
    { name: "Inside Diameter", id: "item_profiles.inside_diameter_val" },
    { name: "Specification", id: "item_profiles.specification" },
    { name: "Volume", id: "item_profiles.volume" },
    { name: "Color", id: "item_profiles.color" },
    { name: "Grade", id: "item_profiles.grade" },
    { name: "Inventory Type", id: "item_profiles.inventory_type" },
    { name: "Active Status", id: "item_profiles.active_status" },
    { name: "Is Approved", id: "item_profiles.is_approved" },
]
const actions = {
    showTable: true,
    edit: false,
    delete: false,
}

const infoModalData = ref({})
const showInfoModal = ref(false)
const showInformation = (data) => {
    infoModalData.value = data
    showInfoModal.value = true
}

const changePaginate = (newParams) => {
    getParams.value.page = newParams.page ?? ""
}
</script>

<template>
    <LayoutBoards class="w-full" :loading="boardLoading">
        <div class="pb-2 text-gray-500 p-2">
            <LayoutPsTable
                :header-columns="headers"
                :actions="actions"
                :datas="List.list ?? []"
                @show-table="showInformation"
            />
        </div>
        <div class="flex justify-center mx-auto">
            <CustomPagination :links="pagination" @change-params="changePaginate" />
        </div>
        <p hidden class="error-message text-red-600 text-center font-semibold mt-2 italic" :class="{ 'fade-out': !errorMessage }">
            {{ errorMessage }}
        </p>
        <p
            v-show="successMessage"
            hidden
            class="success-message text-green-600 text-center font-semibold italic"
        >
            {{ successMessage }}
        </p>
        <HrmsTravelOrderInfoModal
            v-model:show-modal="showInfoModal"
            :data="infoModalData"
        />
    </LayoutBoards>
</template>
