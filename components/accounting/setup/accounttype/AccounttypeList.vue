<script setup>
import { storeToRefs } from "pinia"
import { useAccountTypeStore } from "@/stores/accounting/setup/accounttype"

const accountTypeStore = useAccountTypeStore()

const { list: atypeList, isEdit, getParams, pagination, errorMessage, successMessage } = storeToRefs(accountTypeStore)

const setEdit = (atype) => {
    isEdit.value = true
    accountTypeStore.accountType = atype
}
const deleteAtype = async (atype) => {
    try {
        boardLoading.value = true
        await accountTypeStore.deleteAccountType(atype.id)
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
    accountTypeStore.getAccountTypes()
}

const headers = [
    { name: "Account Type", id: "account_type" },
    { name: "Category", id: "account_category" },
    { name: "Balance Type", id: "balance_type" },
    { name: "Notation", id: "notation" }
]
const actions = {
    edit: true,
    delete: true
}

const snackbar = useSnackbar()
const boardLoading = ref(false)

</script>
<template>
    <LayoutBoards title="Account Type List" class="w-full" :loading="boardLoading">
        <div class="pb-2 text-gray-500">
            <LayoutPsTable :header-columns="headers" :datas="atypeList" :actions="actions" @edit-row="setEdit" @delete-row="deleteAtype" />
        </div>
        <div class="flex justify-center mx-auto">
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
