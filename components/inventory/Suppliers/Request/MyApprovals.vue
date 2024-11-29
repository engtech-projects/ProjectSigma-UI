<script setup>
import { storeToRefs } from "pinia"
import { useSupplierStore } from "@/stores/inventory/suppliers"
const mainStore = useSupplierStore()
const { myApprovals, companyNameList } = storeToRefs(mainStore)
onMounted(() => {
    if (!myApprovals.value.isLoaded) {
        mainStore.getMyApprovals()
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
        path: "/inventory/bom/request-details",
        query: {
            key: data.id
        },
        replace: true
    })
}
const changePaginate = (newParams) => {
    myApprovals.value.params.page = newParams.page ?? ""
}
</script>
<template>
    <LayoutLoadingContainer class="w-full" :loading="myApprovals.isLoading">
        <div class="flex flex-row gap-4 p-2 items-center">
            <div>
                <label
                    class="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Company Name
                </label>
                <LayoutFormPsSelectSearch v-model:result="myApprovals.params" v-model:search-input="companyNameList.key" :search-list="companyNameList.list" title="Company Name" placeholder="Search Company Name" />
            </div>
            <div>
                <LayoutFormPsSelect
                    v-model="myApprovals.params.type_of_ownership"
                    :options-list="['Single Proprietorship', 'Partnership', 'Corporation']"
                    class="w-full"
                    title="Type of Ownership"
                />
            </div>
            <div>
                <label
                    class="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Contact Person Name
                </label>
                <LayoutFormPsSelectSearch v-model:result="myApprovals.params" v-model:search-input="companyNameList.key" :search-list="companyNameList.list" title="Contact Person Name" placeholder="Search Contact Person Name" />
            </div>
            <div>
                <label
                    class="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Supplier Code
                </label>
                <LayoutFormPsSelectSearch v-model:result="myApprovals.params" v-model:search-input="companyNameList.key" :search-list="companyNameList.list" title="Supplier Code" placeholder="Search Supplier Code" />
            </div>
        </div>
        <div class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
            <LayoutPsTable
                :header-columns="headers"
                :actions="actions"
                :datas="myApprovals.list ?? []"
                @show-table="showInformation"
            />
        </div>
        <div class="flex justify-center mx-auto">
            <CustomPagination :links="myApprovals.pagination" @change-params="changePaginate" />
        </div>
    </LayoutLoadingContainer>
</template>
