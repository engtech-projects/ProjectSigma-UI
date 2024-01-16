<script setup>
import { storeToRefs } from "pinia"
import { usePagibigStore } from "@/stores/pagibig"

const contributions = usePagibigStore()
contributions.getContribution()

const { list: contributionList, isEdit, contribution, getParams, pagination } = storeToRefs(contributions)

const setEdit = (cont) => {
    isEdit.value = true
    contribution.value = cont
}
const deleteCont = (cont) => {
    contributions.deleteContribution(cont.id)
}

const changePaginate = (newParams) => {
    getParams.value.page = newParams.page ?? ""
    // getParams.value.syId = newParams.id ?? ""
    // getParams.value.semId = newParams.semId ?? ""
    // getParams.value.feeType = newParams.feeType ?? ""
    // getParams.value.particularName = newParams.particularName ?? ""
}

const headers = [
    { name: "Range From", id: "range_from" },
    { name: "Range To", id: "range_to" },
    { name: "Employer Share", id: "employer_share" },
    { name: "Employee Name", id: "employee_share" },
]
const actions = {
    edit: true,
    delete: true
}

</script>

<template>
    <LayoutBoards title="Department List" class="w-full p-4">
        <div class="pb-2 text-gray-500">
            <LayoutPsTable :header-columns="headers" :datas="contributionList" :actions="actions" @edit-row="setEdit" @delte-row="deleteCont" />
        </div>
        <div class="flex justify-center mx-auto">
            <CustomPagination :links="pagination" @change-params="changePaginate" />
        </div>
    </LayoutBoards>
</template>
