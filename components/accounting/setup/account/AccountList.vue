<script setup>
import { storeToRefs } from "pinia"
import { useAccountStore } from "@/stores/accounting/setup/account"
import { useAccountTypeStore } from "@/stores/accounting/setup/accounttype"

const accountStore = useAccountStore()
const accountTypeStore = useAccountTypeStore()
const { isEdit, getParams, pagination, errorMessage, successMessage } = storeToRefs(accountStore)

const setEdit = (ac) => {
    isEdit.value = true
    accountStore.account = ac
}
const deleteAccount = async (ac) => {
    try {
        boardLoading.value = true
        await accountStore.deleteAccount(ac.id)
        snackbar.add({
            type: "success",
            text: accountStore.successMessage
        })
    } finally {
        boardLoading.value = false
    }
}

const changePaginate = (newParams) => {
    getParams.value.page = newParams.page ?? ""
    accountStore.getAccounts()
}

const headers = [
    { name: "Account No", id: "account_number" },
    { name: "Account Name", id: "account_name" },
    { name: "Account Type", id: "type_name" }
]
const actions = {
    edit: true,
    delete: true
}
const acType = (id) => {
    return accountTypeStore.list.filter(at => id === at.id)[0]?.account_type
}
const accountsList = computed(() => {
    const list = clone(accountStore.list)
    list.forEach((ac) => {
        ac.type_name = acType(ac.account_type_id)
    })
    return list
})
const snackbar = useSnackbar()
const boardLoading = ref(false)

</script>
<template>
    <LayoutBoards title="Accounts List" class="w-full" :loading="accountStore.isLoading.list">
        <div class="w-1/2 flex px-4">
            <LayoutFormPsTextInput v-model="accountStore.getParams.key" title="Search Account" class="w-full" />
        </div>
        <div class="pb-2 text-gray-500">
            <LayoutPsTable :header-columns="headers" :datas="accountsList" :actions="actions" @edit-row="setEdit" @delete-row="deleteAccount" />
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
