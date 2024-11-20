<script setup>
import { storeToRefs } from "pinia"
import { useSupplierStore } from "@/stores/inventory/suppliers"
const mainStore = useSupplierStore()
const { myApprovals: List } = storeToRefs(mainStore)
onMounted(() => {
    if (!List.value.isLoaded) {
        mainStore.getMyApprovals()
    }
})
const infoModalData = ref({})
const showInfoModal = ref(false)
const showInformation = (data) => {
    navigateTo({
        path: "/inventory/bom/request-details",
        query: {
            key: data.id
        }
    })
}

const headers = [
    { name: "Company Name", id: "company_name" },
    { name: "Company Address", id: "company_address" },
    { name: "Contact Person", id: "contact_person_number" },
    { name: "Request By", id: "filled_by" },
    { name: "Request at", id: "filled_date" },
]

const actions = {
    showTable: true,
}

const changePaginate = (newParams) => {
    List.value.params.page = newParams.page ?? ""
}
</script>
<template>
    <LayoutLoadingContainer class="w-full" :loading="List.isLoading">
        <div class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
            <LayoutPsTable
                :header-columns="headers"
                :actions="actions"
                :datas="List.list ?? []"
                @show-table="showInformation"
            />
        </div>
        <div class="flex justify-center mx-auto">
            <CustomPagination :links="List.pagination" @change-params="changePaginate" />
        </div>
    </LayoutLoadingContainer>
    <InventoryItemProfileInfoModal
        v-model:show-modal="showInfoModal"
        :data="infoModalData"
    />
</template>
