<script setup>
import { storeToRefs } from "pinia"
import { useSupplierStore } from "@/stores/inventory/suppliers"
const mainStore = useSupplierStore()
const { myRequests } = storeToRefs(mainStore)
onMounted(() => {
    if (!myRequests.value.isLoaded) {
        mainStore.getMyRequests()
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
    myRequests.value.params.page = newParams.page ?? ""
}
</script>
<template>
    <LayoutLoadingContainer class="w-full" :loading="myRequests.isLoading">
        <div class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
            <LayoutPsTable
                :header-columns="headers"
                :datas="myRequests.list ?? []"
            />
        </div>
        <div class="flex justify-center mx-auto">
            <CustomPagination :links="myRequests.pagination" @change-params="changePaginate" />
        </div>
    </LayoutLoadingContainer>
</template>
