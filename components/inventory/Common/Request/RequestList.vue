<script setup>
import { storeToRefs } from "pinia"
import { useItemProfileStore } from "@/stores/inventory/itemprofiles"

const mains = useItemProfileStore()
const { allRequests: List, getParams, pagination, errorMessage, successMessage } = storeToRefs(mains)
const boardLoading = ref(false)
const headers = [
    { name: "Item Summary", id: "profile_summary" },
    { name: "Active Status", id: "request_status" },
]
const actions = {
    showTable: true,
    edit: false,
    delete: false,
}

const infoModalData = ref({})
const showInfoModal = ref(false)
const showInformation = (data) => {
    navigateTo("item-details?key=" + data.id)
}

const changePaginate = (newParams) => {
    getParams.value.page = newParams.page ?? ""
}
</script>
<template>
    <LayoutBoards class="w-full" :loading="boardLoading">
        <div class="pb-2 text-gray-500 p-2">
            <InventoryCommonLayoutPsTable
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
        <InventoryItemProfileInfoModal
            v-model:show-modal="showInfoModal"
            :data="infoModalData"
        />
    </LayoutBoards>
</template>
