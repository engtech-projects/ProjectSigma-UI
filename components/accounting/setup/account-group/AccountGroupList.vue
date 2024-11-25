<script setup>
import { storeToRefs } from "pinia"
import { useAccountGroupStore } from "@/stores/accounting/setup/accountgroups"

const accountGroupStore = useAccountGroupStore()
const { isEdit, getParams, pagination, errorMessage, successMessage } = storeToRefs(accountGroupStore)

const setEdit = (ac) => {
    isEdit.value = true
    accountGroupStore.accountGroup = ac
}
const deleteAccountGroup = async (ac) => {
    try {
        boardLoading.value = true
        await accountGroupStore.deleteAccountGroup(ac.id)
        snackbar.add({
            type: "success",
            text: accountGroupStore.successMessage
        })
    } finally {
        boardLoading.value = false
    }
}

const changePaginate = (newParams) => {
    getParams.value.page = newParams.page ?? ""
    accountGroupStore.getAccounts()
}

const headers = [
    { name: "Account Group Name", id: "name", style: "text-left" }
]
const actions = {
    edit: true,
    delete: true
}

const snackbar = useSnackbar()
const boardLoading = ref(false)

</script>
<template>
    <LayoutBoards title="Accounts List" class="w-full" :loading="accountGroupStore.isLoading.list">
        <div class="pb-2 text-gray-500">
            <LayoutPsTable :header-columns="headers" :datas="accountGroupStore.list" :actions="actions" @edit-row="setEdit" @delete-row="deleteAccountGroup" />
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
