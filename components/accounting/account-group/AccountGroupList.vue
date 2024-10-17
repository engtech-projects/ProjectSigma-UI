<script setup>
import { storeToRefs } from "pinia"
import { useAccountGroupStore } from "~/stores/accounting/accountgroups"
import { useAccountStore } from "~/stores/accounting/account"

const accountGroupStore = useAccountGroupStore()
accountGroupStore.getAccountGroups()

const accountStore = useAccountStore()
await accountStore.getAccounts()
const { list: groupList, accountGroup, getParams, pagination, errorMessage, successMessage } = storeToRefs(accountGroupStore)

// const setEdit = (ag) => {
//     isEdit.value = true
//     accountGroup.value = ag
//     return navigateTo("/accounting/account-groups/edit?id=" + ag.id)
// }

// const deleteGroup = async (ag) => {
//     try {
//         accountGroupStore.isLoading = true
//         await accountGroupStore.deleteBook(ag.id)
//         snackbar.add({
//             type: "success",
//             text: accountGroupStore.successMessage
//         })
//     } finally {
//         accountGroupStore.isLoading = false
//     }
// }

const changePaginate = (newParams) => {
    getParams.value.page = newParams.page ?? ""
}

const headers = [
    { name: "Account Group Name", id: "account_group_name" },
    { name: "Type", id: "type_id" },
]

// const snackbar = useSnackbar()
</script>
<template>
    <div class="flex flex-col items-end gap-4">
        <!-- <NuxtLink
            to="/accounting/account-groups/create"
            class="flex-1 text-white p-2 rounded bg-teal-600 content-center text-center px-4 flex items-center hover:bg-teal-700 active:bg-teal-600"
        >
            <Icon name="fa:plus-circle" class="mr-2 mt-[3px]" />
            <span>New Account Group</span>
        </NuxtLink> -->
        <div class="flex gap-4 w-full">
            <LayoutBoards title="Account Group List" class="w-full flex-1" :loading="accountGroupStore.isLoading">
                <table class="table w-full border">
                    <thead>
                        <th class="text-left p-2 w-3/4">
                            Account Group Name
                        </th>
                        <!-- <th class="text-left p-2">
                            Actions
                        </th> -->
                    </thead>
                    <tbody>
                        <tr v-for="grp in groupList" :key="grp.id" :class="grp.id===accountGroup.id?'bg-slate-200':''" class="border cursor-pointer hover:bg-slate-100">
                            <td class="p-2">
                                {{ grp.name }}
                            </td>
                            <!-- <td class="p-2">
                                <div class="flex gap-1">
                                    <Icon name="material-symbols:edit" color="white" class="bg-green-400 rounded h-8 w-8 p-1" @click="setEdit(grp)" />
                                    <Icon name="ion:trash" color="white" class="bg-red-500 rounded h-8 w-8 p-1" />
                                </div>
                            </td> -->
                        </tr>
                    </tbody>
                </table>
            </LayoutBoards>
        </div>
        <LayoutBoards v-show="1==2" title="Account Group List" class="w-full" :loading="accountGroupStore.isLoading">
            <div class="pb-2 text-gray-500">
                <LayoutPsTable
                    id="listTable"
                    :header-columns="headers"
                    :datas="groupList"
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

<style scoped>
    #listTable tbody tr td, #listTable thead th {
        text-align: left!important;
    }
</style>
