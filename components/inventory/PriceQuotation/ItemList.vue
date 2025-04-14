<script setup>
import { storeToRefs } from "pinia"
import { usePriceQuotationStore } from "~/stores/inventory/procurement/pricequotation"

const mainStore = usePriceQuotationStore()
const { allRequests } = storeToRefs(mainStore)
onMounted(() => {
    if (!allRequests.isLoaded) {
        mainStore.getAllRequests()
    }
})
const formattedRequests = computed(() => {
    return [
        {
            reference_no: "123456",
            project_code: "N/A",
            qty: 1,
            transaction_date: "2022-01-01",
            item_description: "Item 1",
            prefferred_brand: "Brand 1",
            unit_price: 100
        },
        {
            reference_no: "123456",
            project_code: "N/A",
            qty: 2,
            transaction_date: "2022-01-01",
            item_description: "Item 2",
            prefferred_brand: "Brand 2",
            unit_price: 200
        },
        {
            reference_no: "123456",
            project_code: "N/A",
            qty: 3,
            transaction_date: "2022-01-01",
            item_description: "Item 3",
            prefferred_brand: "Brand 3",
            unit_price: 300
        },
    ]
})

const headers = [
    { name: "Quotation No", id: "quotation_no" },
    { name: "Conso Reference No", id: "conso_reference_no" },
    { name: "Item Description", id: "item_description" },
    { name: "Prefferred Brand", id: "prefferred_brand" },
    { name: "Unit Price", id: "unit_price" },
]
const actions = {
    showTable: true,
    edit: false,
    delete: false,
}
const showInformation = (data) => {
    navigateTo({
        path: "/inventory/request-pricequotation/request-details",
        query: {
            key: data.id
        },
    })
}
const changePaginate = (newParams) => {
    receiving.value.params.page = newParams.page ?? ""
}

</script>
<template>
    <LayoutLoadingContainer class="w-full" :loading="pricequotation.isLoading">
        <div class="pb-2 text-gray-500 overflow-y-auto p-2">
            <LayoutPsTable
                :header-columns="headers"
                :actions="actions"
                :datas="formattedRequests"
                @show-table="showInformation"
            />
        </div>
        <div class="flex justify-center mx-auto">
            <CustomPagination :links="pricequotation.pagination" @change-params="changePaginate" />
        </div>
    </LayoutLoadingContainer>
</template>

