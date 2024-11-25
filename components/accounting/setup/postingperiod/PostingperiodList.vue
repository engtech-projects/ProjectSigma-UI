<script setup>
import { storeToRefs } from "pinia"
import { usePostingPeriodStore } from "@/stores/accounting/setup/postingperiod"

const postingPeriodStore = usePostingPeriodStore()

const { list: postingPeriodList, getParams, pagination, errorMessage, successMessage } = storeToRefs(postingPeriodStore)

const changePaginate = (newParams) => {
    getParams.value.page = newParams.page ?? ""
    postingPeriodStore.getPostingPeriods()
}

const headers = [
    { name: "Period Start", id: "period_start", style: "text-left" },
    { name: "Period End", id: "period_end", style: "text-left" },
    { name: "Status", id: "status", style: "text-left" }
]

</script>
<template>
    <LayoutBoards title="Posting Period List" class="w-full" :loading="postingPeriodStore.isLoading">
        <div class="pb-2 text-gray-500">
            <LayoutPsTable :header-columns="headers" :datas="postingPeriodList" class="!text-left" />
        </div>
        <div class="flex justify-center mx-auto my-8">
            <CustomPagination :links="pagination" @change-params="changePaginate" />
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
