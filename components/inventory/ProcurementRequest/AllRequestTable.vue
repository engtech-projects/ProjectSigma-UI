<script setup>
import { useProcurementRequestStore } from "~/stores/inventory/procurement/request"
const procurementRequestStore = useProcurementRequestStore()
const { allRequests } = storeToRefs(procurementRequestStore)
procurementRequestStore.getAllRequests()
const actions = {
    showTable: true,
    edit: false,
    delete: false,
}
const headers = [
    { name: "RS No.", id: "rs_reference_no" },
    { name: "Date", id: "rs_date_prepared_human" },
    { name: "Status", id: "status" },
]
defineEmits(["show-table"])
const changePaginate = (newParams) => {
    datas.value.params.page = newParams.page ?? ""
}

</script>
<template>
    <LayoutLoadingContainer :loading="allRequests.isLoading">
        <LayoutPsTable
            :header-columns="headers"
            :actions="actions"
            :datas="allRequests.list ?? []"
            class="rounded-md"
            @show-table="$emit('show-table', $event)"
        />
        <div class="flex justify-center mx-auto">
            <CustomPagination :links="allRequests.pagination" @change-params="changePaginate" />
        </div>
    </LayoutLoadingContainer>
</template>
