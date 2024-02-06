<script setup>
import { storeToRefs } from "pinia"
import { useAccountType } from "~/stores/accounting/accounttype"

const accountTypeStore = useAccountType()

const { list: accountTypeList, accountType, isEdit, getParams, pagination, errorMessage, successMessage } = storeToRefs(accountTypeStore)

const setEdit = (atype) => {
    isEdit.value = true
    accountType.value = atype
}

const deleteAccountType = async (atype) => {
    try {
        boardLoading.value = true
        accountTypeStore.isLoading = true
        await accountTypeStore.deleteAccountType(atype.type_id)
        snackbar.add({
            type: "success",
            text: accountTypeStore.successMessage
        })
    } finally {
        boardLoading.value = false
    }
}

const changePaginate = (newParams) => {
    getParams.value.page = newParams.page ?? ""
}

const headers = [
    { name: "Type Name", id: "account_type" },
    { name: "Category", id: "account_category" },
]
const actions = {
    edit: true,
    delete: true
}

const snackbar = useSnackbar()
const boardLoading = ref(false)

</script>

<template>
    <LayoutBoards title="Account Type List" class="w-full" :loading="accountTypeStore.isLoading">
        <div class="pb-2 text-gray-500">
            <LayoutPsTable
                id="listTable"
                :header-columns="headers"
                :datas="accountTypeList"
                :actions="actions"
                @edit-row="setEdit"
                @delete-row="deleteAccountType"
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
    #listTable tbody tr td {
        text-align: left!important;
    }
</style>
