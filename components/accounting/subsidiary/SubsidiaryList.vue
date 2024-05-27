<script setup>
import { storeToRefs } from "pinia"
import { useSubsidiaryStore } from "~/stores/accounting/subsidiary"

const subsidiaryStore = useSubsidiaryStore()
await subsidiaryStore.getSubsidiaries()
const { list: accountList, isEdit, getParams, pagination, errorMessage, successMessage } = storeToRefs(subsidiaryStore)

const setEdit = (sub) => {
    console.log(sub)
    isEdit.value = true
    subsidiaryStore.subsidiary = sub
    return navigateTo("/accounting/subsidiary/edit/" + sub.subsidiary_id)
}

const deleteAccount = async (bk) => {
    try {
        subsidiaryStore.isLoading = true
        await subsidiaryStore.deleteAccount(bk.book_id)
        snackbar.add({
            type: "success",
            text: subsidiaryStore.successMessage
        })
    } finally {
        subsidiaryStore.isLoading = false
        subsidiaryStore.getSubsidiaries()
    }
}

const changePaginate = (newParams) => {
    getParams.value.page = newParams.page ?? ""
}

const headers = [
    { name: "Subsidiary Name", id: "subsidiary_name" },
]
const actions = {
    edit: true,
    delete: true
}

const snackbar = useSnackbar()
</script>

<template>
    <div class="flex flex-col items-end gap-4">
        <NuxtLink
            to="/accounting/subsidiary/create"
            class="flex-1 text-white p-2 rounded bg-teal-600 content-center text-center px-4 flex items-center hover:bg-teal-700 active:bg-teal-600"
        >
            <Icon name="fa:plus-circle" class="mr-2 mt-[3px]" />
            <span>Create New Subsidiary</span>
        </NuxtLink>
        <LayoutBoards title="Subsidiary List" class="w-full" :loading="subsidiaryStore.isLoading">
            <div class="pb-2 text-gray-500">
                <LayoutPsTable
                    id="listTable"
                    :header-columns="headers"
                    :datas="accountList"
                    :actions="actions"
                    @edit-row="setEdit"
                    @delete-row="deleteAccount"
                />
                <!-- <i v-if="!accountList.length&&!subsidiaryStore.isLoading" class="p-4 text-center block">No data available.</i> -->
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
    </div>
</template>

<style>
    #listTable tbody tr td, #listTable thead th {
        text-align: left!important;
    }
</style>
