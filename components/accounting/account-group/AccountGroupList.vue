<script setup>
import { storeToRefs } from "pinia"
import { useAccountGroupStore } from "~/stores/accounting/accountgroups"
import { useAccountStore } from "~/stores/accounting/account"

const accountGroupStore = useAccountGroupStore()
accountGroupStore.getAccountGroups()

const accountStore = useAccountStore()
await accountStore.getAccounts()
const addAcount = ref(false)

const { list: groupList, accountGroup, isEdit, getParams, pagination, errorMessage, successMessage } = storeToRefs(accountGroupStore)

const setEdit = (ag) => {
    isEdit.value = true
    accountGroup.value = ag
    return navigateTo("/accounting/account-groups/edit/" + ag.account_group_id)
}

const deleteGroup = async (ag) => {
    try {
        accountGroupStore.isLoading = true
        await accountGroupStore.deleteBook(ag.account_group_id)
        snackbar.add({
            type: "success",
            text: accountGroupStore.successMessage
        })
    } finally {
        accountGroupStore.isLoading = false
    }
}

const changePaginate = (newParams) => {
    getParams.value.page = newParams.page ?? ""
}

const headers = [
    { name: "Account Group Name", id: "account_group_name" },
    { name: "Type", id: "type_id" },
]
const actions = {
    edit: true,
    delete: true
}
const loadAccounts = ref(false)
function selectGroup (grp) {
    // loadAccounts.value = true
    // await accountGroupStore.showAccountGroup(grp.account_group_id)
    // loadAccounts.value = false
    accountGroupStore.accountGroup = grp
}
const availableAccounts = computed(() => {
    const accounts = []
    accountStore.list.forEach((ac) => {
        let count = 0
        accountGroupStore.accountGroup.accounts.forEach((ag) => {
            if (ag.account_id === ac.account_id) {
                count++
            }
        })
        if (count === 0) {
            accounts.push(ac)
        }
    })
    return accounts
})
function pluckAccount (ac) {
    accountGroupStore.accountGroup.accounts = accountGroupStore.accountGroup.accounts.filter(acc => ac !== acc)
}
const isLoading = ref(false)
async function updateAccountGroup () {
    try {
        isLoading.value = true
        await accountGroupStore.editAccountGroup()
        snackbar.add({
            type: "success",
            text: accountGroupStore.successMessage
        })
    } catch {
        snackbar.add({
            type: "error",
            text: accountGroupStore.errorMessage || "something went wrong."
        })
    } finally {
        isLoading.value = false
    }
}
const snackbar = useSnackbar()
</script>

<template>
    <div class="flex flex-col items-end gap-4">
        <NuxtLink
            to="/accounting/account-groups/create"
            class="flex-1 text-white p-2 rounded bg-teal-600 content-center text-center px-4 flex items-center hover:bg-teal-700 active:bg-teal-600"
        >
            <Icon name="fa:plus-circle" class="mr-2 mt-[3px]" />
            <span>New Account Group</span>
        </NuxtLink>
        <div class="flex gap-4 w-full">
            <LayoutBoards title="Account Group List" class="w-full flex-1" :loading="accountGroupStore.isLoading">
                <table class="table w-full border">
                    <thead>
                        <th class="text-left p-2 w-3/4">
                            Account Group Name
                        </th>
                        <th class="text-left p-2">
                            Actions
                        </th>
                    </thead>
                    <tbody>
                        <tr v-for="grp in groupList" :key="grp.account_group_id" :class="grp.account_group_id===accountGroup.account_group_id?'bg-slate-200':''" class="border cursor-pointer hover:bg-slate-100" @click="selectGroup(grp)">
                            <td class="p-2">
                                {{ grp.account_group_name }}
                            </td>
                            <td class="p-2">
                                <span class="mr-4 cursor-pointer hover:text-green-500">Edit</span>
                                <span class="mr-4  cursor-pointer hover:text-red-500">Delete</span>
                                <span class="cursor-pointer hover:text-blue-500" @click="addAcount=true">+Account</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </LayoutBoards>
            <LayoutBoards v-if="accountGroup.account_group_id" title="Account List" :loading="isLoading" class="w-full flex-1 flex flex-col justify-between">
                <div class="flex flex-col justify-between min-h-[300px]">
                    <div class="flex flex-col">
                        <div class="flex" />
                        <table class="table w-full border">
                            <thead>
                                <th class="text-left p-2 w-full">
                                    Account Name
                                </th>
                                <th />
                            </thead>
                            <tbody>
                                <tr v-for="ac in accountGroup.accounts" :key="ac.account_id" class="border">
                                    <td class="p-2">
                                        {{ ac.account_name }}
                                    </td>
                                    <td>
                                        <Icon name="iconoir:trash" class="mr-2 text-slate-500 text-xl cursor-pointer hover:text-slate-700" @click="pluckAccount(ac)" />
                                    </td>
                                </tr>
                                <tr v-if="!accountGroup.accounts.length&&!loadAccounts">
                                    <td class="text-center">
                                        No data available
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="flex justify-end">
                        <button class="text-white p-2 px-8 rounded bg-teal-600 content-center text-center px-4 flex items-center hover:bg-teal-700 active:bg-teal-600 mt-4" @click="updateAccountGroup">
                            Save
                        </button>
                    </div>
                </div>
            </LayoutBoards>
            <LayoutBoards v-if="addAcount" title="Add Accounts" class="w-full flex-1">
                <div class="flex flex-col">
                    <table class="table w-full border">
                        <thead>
                            <th class="text-left p-2 w-full">
                                Account Name
                            </th>
                            <th />
                        </thead>
                        <tbody>
                            <tr v-for="ac in availableAccounts" :key="ac.account_id" class="border">
                                <td class="p-2">
                                    {{ ac.account_name }}
                                </td>
                                <td>
                                    <Icon name="iconoir:plus" class="mr-2 text-slate-500 text-xl cursor-pointer hover:text-slate-700" @click="accountGroupStore.accountGroup.accounts.push(ac)" />
                                </td>
                            </tr>
                            <tr v-if="!availableAccounts.length">
                                <td class="text-center">
                                    No accounts available
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </LayoutBoards>
        </div>
        <LayoutBoards v-show="1==2" title="Account Group List" class="w-full" :loading="accountGroupStore.isLoading">
            <div class="pb-2 text-gray-500">
                <LayoutPsTable
                    id="listTable"
                    :header-columns="headers"
                    :datas="groupList"
                    :actions="actions"
                    @edit-row="setEdit"
                    @delete-row="deleteGroup"
                />
                <i v-if="!groupList.length&&!accountGroupStore.isLoading" class="p-4 text-center block">No data available.</i>
            </div>
            <div class="flex justify-center mx-auto">
                <CustomPagination
                    v-if="groupList.length"
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
