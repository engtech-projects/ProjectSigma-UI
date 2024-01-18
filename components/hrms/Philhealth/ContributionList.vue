<script setup>
import { storeToRefs } from "pinia"
import { usePhilhealthStore } from "@/stores/philhealth"

const contributions = usePhilhealthStore()
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
    { name: "Share", id: "share" },
    { name: "Share Type", id: "share_type" },
]
const actions = {
    edit: true,
    delete: true
}

</script>

<template>
    <LayoutBoards title="Contribution Table" class="w-full">
        <div class="pb-2 text-gray-500">
            <LayoutPsTable :header-columns="headers" :datas="contributionList" :actions="actions" @edit-row="setEdit" @delete-row="deleteCont" />
        </div>
        <div class="flex justify-center mx-auto">
            <CustomPagination :links="pagination" @change-params="changePaginate" />
        </div>
    </LayoutBoards>
</template>
