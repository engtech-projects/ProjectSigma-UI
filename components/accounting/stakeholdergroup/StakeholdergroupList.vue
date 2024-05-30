<script setup>
import { storeToRefs } from "pinia"
import { useStakeholderGroupStore } from "~/stores/accounting/stakeholdergroup"

const stakeholderGroupStore = useStakeholderGroupStore()
await stakeholderGroupStore.getStakeholderGroups()

const { list: stakeholderGroupList, stakeholderGroup, isEdit, getParams, pagination, errorMessage, successMessage } = storeToRefs(stakeholderGroupStore)

const setEdit = (st) => {
    isEdit.value = true
    stakeholderGroup.value = st
    return navigateTo("/accounting/stakeholder-group/edit/" + st.stakeholder_group_id)
}

const deleteStakeholderGroup = async (st) => {
    try {
        boardLoading.value = true
        stakeholderGroupStore.isLoading = true
        await stakeholderGroupStore.deleteStakeholderGroup(st.stakeholder_group_id)
        snackbar.add({
            type: "success",
            text: stakeholderGroupStore.successMessage
        })
    } finally {
        boardLoading.value = false
    }
}

const changePaginate = (newParams) => {
    getParams.value.page = newParams.page ?? ""
}

const headers = [
    { name: "Group Name", id: "stakeholder_group_name" },
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
            to="/accounting/stakeholder-group/create"
            class="flex-1 text-white p-2 rounded bg-teal-600 content-center text-center px-4 flex items-center hover:bg-teal-700 active:bg-teal-600"
        >
            <Icon name="fa:plus-circle" class="mr-2 mt-[3px]" />
            <span>New Stakeholder Group</span>
        </NuxtLink>
        <LayoutBoards title="Stakeholder Group List" class="w-full" :loading="stakeholderGroupStore.isLoading">
            <div class="pb-2 text-gray-500">
                <LayoutPsTable
                    id="listTable"
                    :header-columns="headers"
                    :datas="stakeholderGroupList"
                    :actions="actions"
                    @edit-row="setEdit"
                    @delete-row="deleteStakeholderGroup"
                />
                <!-- <i v-if="!stakeholderGroupList.length&&!stakeholderGroupStore.isLoading" class="p-4 text-center block">No data available.</i> -->
            </div>
            <div class="flex justify-center mx-auto">
                <CustomPagination
                    v-if="stakeholderGroupList.length"
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
