<script setup>
import { storeToRefs } from "pinia"
import { useSupplierStore } from "@/stores/inventory/suppliers"

const mainStore = useSupplierStore()
const { allRequests } = storeToRefs(mainStore)
onMounted(() => {
    if (!allRequests.isLoaded) {
        mainStore.getAllRequests()
    }
})
const headers = [
    { name: "Company Name", id: "company_name" },
    { name: "Company Address", id: "company_address" },
    { name: "Contact Person", id: "contact_person_number" },
    { name: "Request By", id: "filled_by" },
    { name: "Request at", id: "filled_date" },
]
const changePaginate = (newParams) => {
    allRequests.value.params.page = newParams.page ?? ""
}
</script>
<template>
    <LayoutLoadingContainer class="w-full" :loading="allRequests.isLoading">
        <div class="pb-2 text-gray-500 overflow-y-auto p-2">
            <LayoutPsTable
                :header-columns="headers"
                :datas="allRequests.list ?? []"
            />
        </div>
        <div class="flex justify-center mx-auto">
            <CustomPagination :links="allRequests.pagination" @change-params="changePaginate" />
        </div>
    </LayoutLoadingContainer>
</template>
