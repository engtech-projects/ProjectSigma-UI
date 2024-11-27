<script setup>
import { useRoute } from "vue-router"
import { useSupplierStore } from "@/stores/inventory/suppliers"
const route = useRoute()
const mainStore = useSupplierStore()
const { createRequest } = storeToRefs(mainStore)
const validKey = ref(false)

if (route.query.key) {
    validKey.value = true
    await mainStore.getOne(route.query.key)
} else {
    validKey.value = false
}

const headers = [
    { name: "Supplier Code", id: "supplier_code" },
    { name: "Company Name", id: "company_name" },
    { name: "Company Address", id: "company_address" },
    { name: "Company Contact Number", id: "company_contact_number" },
    { name: "Company Email", id: "company_email" },
    { name: "Contact Person Name", id: "contact_person_name" },
    { name: "Contact Person Number", id: "contact_person_number" },
    { name: "Contact Person Designation", id: "contact_person_designation" },
    { name: "Type of Ownership", id: "type_of_ownership" },
    { name: "Nature of Business", id: "nature_of_business" },
    { name: "Product Services", id: "products_services" },
    { name: "Classification", id: "classification" },
    { name: "TIN", id: "tin" },
    { name: "Terms and Conditions", id: "terms_and_conditions" },
    { name: "Filled by", id: "filled_by" },
    { name: "Filled Designation", id: "filled_designation" },
    { name: "Filled Date", id: "filled_date" },
    { name: "Requirements Complete", id: "requirements_complete" },
    { name: "Remarks", id: "remarks" },
    { name: "Uploads", id: "uploads" },
    { name: "Status", id: "request_status" },
]
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.inventory_procurement_suppliers_group,
        ])"
    >
        <LayoutBoards title="SUPPLIER REQUEST DETAILS" class="w-full" :loading="createRequest.isLoading">
            <template v-if="validKey">
                <InventorySuppliersSupplierDetails
                    id="listTable"
                    :header-columns="headers"
                    :datas="createRequest.details"
                />
            </template>
            <template v-else>
                <div class="grid grid-cols-1 gap-4">
                    <h2> 404 NOT FOUND</h2>
                </div>
            </template>
        </LayoutBoards>
    </LayoutAcessContainer>
</template>
