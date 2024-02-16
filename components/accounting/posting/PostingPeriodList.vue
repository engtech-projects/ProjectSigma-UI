<script setup>
import { storeToRefs } from "pinia"
import { usePostingPeriodStore } from "~/stores/accounting/postingperiod"

const postingPeriodStore = usePostingPeriodStore()
await postingPeriodStore.getPostingPeriods()

const { list: periodList, postingPeriod, isEdit, getParams, pagination, errorMessage, successMessage } = storeToRefs(postingPeriodStore)

const setEdit = (prd) => {
    isEdit.value = true
    postingPeriod.value = prd
}

const deletePostingPeriod = async (prd) => {
    try {
        boardLoading.value = true
        postingPeriodStore.isLoading = true
        await postingPeriodStore.deletePostingPeriod(prd.period_id)
        snackbar.add({
            type: "success",
            text: postingPeriodStore.successMessage
        })
    } finally {
        boardLoading.value = false
    }
}

const changePaginate = (newParams) => {
    getParams.value.page = newParams.page ?? ""
}

const headers = [
    { name: "Period Start", id: "period_start" },
    { name: "Period End", id: "period_end" },
    { name: "Status", id: "status" },
]
const actions = {
    edit: true,
    delete: true
}

const snackbar = useSnackbar()
const boardLoading = ref(false)

</script>

<template>
    <LayoutBoards title="Posting Period List" class="w-full" :loading="postingPeriodStore.isLoading">
        <div class="pb-2 text-gray-500">
            <LayoutPsTable
                id="listTable"
                :header-columns="headers"
                :datas="periodList"
                :actions="actions"
                @edit-row="setEdit"
                @delete-row="deletePostingPeriod"
            />
            <i v-if="!periodList.length&&!postingPeriodStore.isLoading" class="p-4 text-center block">No data available.</i>
        </div>
        <div class="flex justify-center mx-auto">
            <CustomPagination
                v-if="periodList.length"
                :links="pagination"
                @change-params="changePaginate"
            />
        </div>
        <p hidden class="error-message text-red-600 text-center font-semibold mt-2 italic" :class="{ 'fade-out': !errorMessage }">
            {{ errorMessage }}
        </p>
        <p
            v-show="successMessage"
            hidden
            class="success-message text-green-600 text-center font-semibold italic"
        >
            {{ successMessage }}
        </p>
    </LayoutBoards>
</template>

<style>
    #listTable tbody tr td, #listTable thead th {
        text-align: left!important;
    }
</style>
