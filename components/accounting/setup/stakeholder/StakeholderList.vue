<script setup>
import { storeToRefs } from "pinia"
import { useStakeHolderStore } from "@/stores/accounting/setup/stakeholder"

const stakeholderStore = useStakeHolderStore()

const { list: stakeholderList, isEdit, getParams, pagination, errorMessage, successMessage } = storeToRefs(stakeholderStore)

const setEdit = (stakeholder) => {
    isEdit.value = true
    stakeholderStore.stakeholder = stakeholder
}
const deleteStakeholder = async (stakeholder) => {
    try {
        boardLoading.value = true
        await stakeholderStore.deleteStakeholder(stakeholder.id)
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
    stakeholderStore.getStakeholders()
}

const headers = [
    { name: "Name", id: "name" },
    { name: "Type", id: "stakeholdable_type" },
]
const actions = {
    edit: true,
    delete: true
}

const snackbar = useSnackbar()
const boardLoading = ref(false)

</script>
<template>
    <LayoutBoards title="Stakeholders List" class="w-full" :loading="stakeholderStore.isLoading">
        <div class="pb-2 text-gray-500">
            <LayoutPsTable :header-columns="headers" :datas="stakeholderList" :actions="actions" @edit-row="setEdit" @delete-row="deleteStakeholder" />
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
