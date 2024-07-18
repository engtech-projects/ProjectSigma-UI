<script setup>
import { storeToRefs } from "pinia"
import { useAccountStore } from "~/stores/accounting/account"

const accountStore = useAccountStore()
await accountStore.getAccounts()

const { list: accountList, getParams, pagination, errorMessage, successMessage } = storeToRefs(accountStore)

// const setEdit = (acct) => {
//     isEdit.value = true
//     account.value = acct
// }

// const deleteAccount = async (acct) => {
//     try {
//         boardLoading.value = true
//         accountStore.isLoading = true
//         await accountStore.deleteAccount(acct.account_id)
//         snackbar.add({
//             type: "success",
//             text: account.successMessage
//         })
//     } finally {
//         boardLoading.value = false
//     }
// }

const changePaginate = (newParams) => {
    getParams.value.page = newParams.page ?? ""
}

const headers = [
    { name: "Account #", id: "account_number" },
    { name: "Account Name", id: "account_name" },
    { name: "Description", id: "account_description" },
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
    <LayoutBoards title="List of Accounts" class="w-full" :loading="accountStore.isLoading">
        <div class="pb-2 text-gray-500">
            <LayoutPsTable
                id="listTable"
                :header-columns="headers"
                :datas="accountList"
            />
            <i v-if="!accountList.length&&!accountStore.isLoading" class="p-4 text-center block">No data available.</i>
        </div>
        <div class="flex justify-center mx-auto">
            <CustomPagination
                v-if="accountList.length"
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
