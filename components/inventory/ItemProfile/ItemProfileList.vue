<script setup>
import { storeToRefs } from "pinia"
import { useItemProfileStore } from "@/stores/inventory/itemprofiles"

const mains = useItemProfileStore()
const { list: List, getParams, pagination } = storeToRefs(mains)
const changePaginate = (newParams) => {
    getParams.value.page = newParams.page ?? ""
}
const headers = [
]
const actions = {
    edit: false,
    delete: false
}
const boardLoading = ref(false)

</script>

<template>
    <LayoutBoards title="Item Profile List" class="w-full" :loading="boardLoading">
        <div class="pb-2 text-gray-500">
            <LayoutPsTable :header-columns="headers" :datas="List" :actions="actions" />
        </div>
        <div class="flex justify-center mx-auto">
            <CustomPagination :links="pagination" @change-params="changePaginate" />
        </div>
    </LayoutBoards>
</template>
