<script setup>
import { useSupplierStore } from "@/stores/inventory/suppliers"
const mainStore = useSupplierStore()
const { companyNameList, contactPersonList, supplierCodeList } = storeToRefs(mainStore)

const state = defineModel("state", { type: Object, required: true })

onMounted(() => {
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
</script>
<template>
    <div class="flex flex-row gap-4 p-2 items-center">
        <div>
            <label
                class="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
            >
                Company Name
            </label>
            <LayoutFormPsSelectSearch v-model:result="state.params" v-model:search-input="companyNameList.key" :search-list="companyNameList.list" title="company_name" placeholder="Search Company Name" />
        </div>
        <div>
            <LayoutFormPsSelect
                v-model="state.params.type_of_ownership"
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
            <LayoutFormPsSelectSearch v-model:result="state.params" v-model:search-input="contactPersonList.key" :search-list="contactPersonList.list" title="contact_person_name" placeholder="Search Contact Person Name" />
        </div>
        <div>
            <label
                class="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
            >
                Supplier Code
            </label>
            <LayoutFormPsSelectSearch v-model:result="state.params" v-model:search-input="supplierCodeList.key" :search-list="supplierCodeList.list" title="supplier_code" placeholder="Search Supplier Code" />
        </div>
    </div>
</template>
