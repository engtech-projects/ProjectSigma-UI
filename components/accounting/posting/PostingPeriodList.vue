<script setup>
import { storeToRefs } from "pinia"
import { usePostingPeriodStore } from "~/stores/accounting/postingperiod"

const postingPeriodStore = usePostingPeriodStore()
const { list: periodList, getParams, pagination, errorMessage, successMessage } = storeToRefs(postingPeriodStore)

// const setEdit = (prd) => {
//     isEdit.value = true
//     postingPeriod.value = prd
//     return navigateTo("/accounting/posting-period/edit/" + prd.period_id)
// }

// const deletePostingPeriod = async (prd) => {
//     try {
//         boardLoading.value = true
//         postingPeriodStore.isLoading = true
//         await postingPeriodStore.deletePostingPeriod(prd.period_id)
//         snackbar.add({
//             type: "success",
//             text: postingPeriodStore.successMessage
//         })
//     } finally {
//         boardLoading.value = false
//     }
// }

const changePaginate = (newParams) => {
    getParams.value.page = newParams.page ?? ""
}

const headers = [
    { name: "Period Start", id: "period_start" },
    { name: "Period End", id: "period_end" },
    { name: "Status", id: "status" },
]
// const actions = {
//     edit: true,
//     delete: true
// }

// const snackbar = useSnackbar()
// const boardLoading = ref(false)

</script>

<template>
    <div class="flex flex-col items-end gap-4">
        <!-- <NuxtLink
            to="/accounting/posting-period/create"
            class="flex-1 text-white p-2 rounded bg-teal-600 content-center text-center px-4 flex items-center hover:bg-teal-700 active:bg-teal-600"
        >
            <Icon name="fa:plus-circle" class="mr-2 mt-[3px]" />
            <span>New Posting Period</span>
        </NuxtLink> -->
        <LayoutBoards title="Posting Period List" class="w-full" :loading="postingPeriodStore.isLoading">
            <div class="pb-2 text-gray-500">
                <LayoutPsTable
                    id="listTable"
                    :header-columns="headers"
                    :datas="periodList"
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
    </div>
</template>

<style>
    #listTable tbody tr td, #listTable thead th {
        text-align: left!important;
    }
</style>
