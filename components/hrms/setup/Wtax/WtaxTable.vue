<script setup>
import { storeToRefs } from "pinia"
import { useWtaxStore } from "@/stores/wtax"

const withholdings = useWtaxStore()
withholdings.getWithholding()

const { list: withholdingList, isEdit, withholding, getParams, pagination } = storeToRefs(withholdings)

const boardLoading = ref(false)

const setEdit = (tax) => {
    isEdit.value = true
    withholding.value = tax
}
const deleteWtax = (tax) => {
    withholdings.deleteWithholding(tax.id)
}

const changePaginate = (newParams) => {
    getParams.value.page = newParams.page ?? ""
    // getParams.value.syId = newParams.id ?? ""
    // getParams.value.semId = newParams.semId ?? ""
    // getParams.value.feeType = newParams.feeType ?? ""
    // getParams.value.particularName = newParams.particularName ?? ""
}

const headers = [
    { name: "Term", id: "term" },
    { name: "Salary Range From", id: "range_from" },
    { name: "Salary Range To", id: "range_to" },
    { name: "Tax Base", id: "tax_base" },
    { name: "Tax Amount", id: "tax_amount" },
    { name: "Tax Percent Over Base", id: "tax_percent_over_base" },
]
const actions = {
    edit: true,
    delete: true
}
</script>

<template>
    <LayoutBoards title="Withholding Table" class="w-full" :loading="boardLoading">
        <div class="pb-2 text-gray-500">
            <LayoutPsTable :header-columns="headers" :datas="withholdingList" :actions="actions" @edit-row="setEdit" @delete-row="deleteWtax" />
        </div>
        <div class="flex justify-center mx-auto">
            <CustomPagination :links="pagination" @change-params="changePaginate" />
        </div>
    </LayoutBoards>
</template>
