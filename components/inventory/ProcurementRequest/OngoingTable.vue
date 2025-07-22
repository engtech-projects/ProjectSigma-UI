<script setup>
import { useProcurementRequestStore } from "~/stores/inventory/procurement/request"
const procurementRequestStore = useProcurementRequestStore()
const { unserved } = storeToRefs(procurementRequestStore)
procurementRequestStore.getUnserved()
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
    unserved.value.params.page = newParams.page ?? ""
}
</script>
<template>
    <LayoutLoadingContainer :loading="unserved.isLoading">
        <LayoutPsTable
            :header-columns="headers"
            :actions="actions"
            :datas="unserved.list ?? []"
            class="rounded-md"
            @show-table="$emit('show-table', $event)"
        />
        <div class="flex justify-center mx-auto">
            <PsCustomPagination :links="unserved.pagination" @change-params="changePaginate" />
        </div>
    </LayoutLoadingContainer>
</template>
