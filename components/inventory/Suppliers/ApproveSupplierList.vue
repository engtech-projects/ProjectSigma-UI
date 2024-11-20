<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useSupplierStore } from "@/stores/inventory/suppliers"
const mainStore = useSupplierStore()
const { approvedSuppliers } = storeToRefs(mainStore)
onMounted(() => {
    if (!approvedSuppliers.isLoaded) {
        mainStore.getApprovedSuppliers()
    }
})
const headers = [
    { name: "Company Name", id: "company_name" },
    { name: "Company Address", id: "company_address" },
    { name: "Contact Number", id: "company_contact_number" },
    { name: "Contact Email", id: "company_email" },
    { name: "Contact Person", id: "contact_person_name" },
    { name: "Contact Person Number", id: "contact_person_number" },
]

const editInformation = (data) => {
    navigateTo({
        path: "/inventory/bom/request-details",
        query: {
            key: data.id
        },
        replace: true
    })
}

const actions = {
    showTable: false,
    edit: useCheckAccessibility([AccessibilityTypes.inventory_procurement_edit]),
    delete: false,
}

</script>
<template>
    <div class="h-full w-full">
        <div id="itemDetails">
            <LayoutPsTable
                :header-columns="headers"
                :actions="actions"
                :datas="approvedSuppliers.list ?? []"
                @edit-row="editInformation"
            />
        </div>
    </div>
</template>
