<script setup>
import { storeToRefs } from "pinia"
import { useAccountType } from "~/stores/accounting/accounttype"

const accountTypeStore = useAccountType()

const { list: accountTypeList, getParams, pagination, errorMessage, successMessage } = storeToRefs(accountTypeStore)

const changePaginate = (newParams) => {
    getParams.value.page = newParams.page ?? ""
}

const headers = [
    { name: "Type Name", id: "account_type_name" },
    { name: "Category", id: "account_category" },
    { name: "Balance Type", id: "balance_type" },
    { name: "Notation", id: "notation" },
]

</script>

<template>
    <LayoutBoards title="List of Account Types" class="w-full" :loading="accountTypeStore.isLoading">
        <div class="pb-2 text-gray-500">
            <LayoutPsTable
                id="listTable"
                :header-columns="headers"
                :datas="accountTypeList"
            />
            <i v-if="!accountTypeList.length&&!accountTypeStore.isLoading" class="p-4 text-center block">No data available.</i>
        </div>
        <div class="flex justify-center mx-auto">
            <CustomPagination
                v-if="accountTypeList.length"
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
