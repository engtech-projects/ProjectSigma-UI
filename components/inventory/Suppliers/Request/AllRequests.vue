<script setup>
import { storeToRefs } from "pinia"
import { useSupplierStore } from "@/stores/inventory/suppliers"

const mainStore = useSupplierStore()
const { allRequests, companyNameList, contactPersonList, supplierCodeList } = storeToRefs(mainStore)
onMounted(() => {
    if (!allRequests.isLoaded) {
        mainStore.getAllRequests()
    }
    if (!companyNameList.value.isLoaded) {
        mainStore.fetchSelector(companyNameList.value, "/api/request-supplier/company-name")
    }
    if (!contactPersonList.value.isLoaded) {
        mainStore.fetchSelector(contactPersonList.value, "/api/request-supplier/contact-person")
    }
    if (!supplierCodeList.value.isLoaded) {
        mainStore.fetchSelector(supplierCodeList.value, "/api/request-supplier/supplier-code")
    }
})
const headers = [
    { name: "Company Name", id: "company_name" },
    { name: "Company Address", id: "company_address" },
    { name: "Contact Person", id: "contact_person_number" },
    { name: "Request By", id: "filled_by" },
    { name: "Request at", id: "filled_date" },
]
const actions = {
    showTable: true,
    edit: false,
    delete: false,
}
const showInformation = (data) => {
    navigateTo({
        path: "/inventory/suppliers/request-details",
        query: {
            key: data.id
        },
        replace: true
    })
}
const changePaginate = (newParams) => {
    allRequests.value.params.page = newParams.page ?? ""
}
</script>
<template>
    <LayoutLoadingContainer class="w-full" :loading="allRequests.isLoading">
        <div class="flex flex-row gap-4 p-2 items-center">
            <InventorySuppliersSupplierFilter v-model:state="allRequests" />
        </div>
        <div class="pb-2 text-gray-500 overflow-y-auto p-2">
            <LayoutPsTable
                :header-columns="headers"
                :actions="actions"
                :datas="allRequests.list ?? []"
                @show-table="showInformation"
            />
        </div>
        <div class="flex justify-center mx-auto">
            <CustomPagination :links="allRequests.pagination" @change-params="changePaginate" />
        </div>
    </LayoutLoadingContainer>
</template>
