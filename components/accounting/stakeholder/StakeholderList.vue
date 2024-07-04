<script setup>
import { storeToRefs } from "pinia"
import { useStakeholderStore } from "~/stores/accounting/stakeholder"

const stakeholderStore = useStakeholderStore()
await stakeholderStore.getStakeholders()

const { list: stakeholderList, stakeholder, isEdit, getParams, pagination, errorMessage, successMessage } = storeToRefs(stakeholderStore)

const setEdit = (st) => {
    isEdit.value = true
    stakeholder.value = st
    return navigateTo("/accounting/stakeholder/edit/" + st.period_id)
}

const deleteStakeholder = async (st) => {
    try {
        boardLoading.value = true
        stakeholderStore.isLoading = true
        await stakeholderStore.deleteStakeholder(st.stakeholder_id)
        snackbar.add({
            type: "success",
            text: stakeholderStore.successMessage
        })
    } finally {
        boardLoading.value = false
    }
}

const changePaginate = (newParams) => {
    getParams.value.page = newParams.page ?? ""
}

const headers = [
    { name: "Display Name", id: "display_name" },
    { name: "Email", id: "email" },
    { name: "Mobile No.", id: "mobile_number" },
    { name: "Company", id: "company" },
    { name: "Type", id: "stakeholder_type" },
]
const actions = {
    edit: true,
    delete: true
}

const snackbar = useSnackbar()
const boardLoading = ref(false)

</script>

<template>
    <div class="flex flex-col items-end gap-4">
        <NuxtLink
            to="/accounting/stakeholder/create"
            class="flex-1 text-white p-2 rounded bg-teal-600 content-center text-center px-4 flex items-center hover:bg-teal-700 active:bg-teal-600"
        >
            <Icon name="fa:plus-circle" class="mr-2 mt-[3px]" />
            <span>New Stakeholder</span>
        </NuxtLink>
        <LayoutBoards title="List of Stakeholders" class="w-full" :loading="stakeholderStore.isLoading">
            <div class="pb-2 text-gray-500">
                <LayoutPsTable
                    id="listTable"
                    :header-columns="headers"
                    :datas="stakeholderList"
                    :actions="actions"
                    @edit-row="setEdit"
                    @delete-row="deleteStakeholder"
                />
                <i v-if="!stakeholderList.length&&!stakeholderStore.isLoading" class="p-4 text-center block">No data available.</i>
            </div>
            <div class="flex justify-center mx-auto">
                <CustomPagination
                    v-if="stakeholderList.length"
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
