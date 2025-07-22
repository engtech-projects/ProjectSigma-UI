<script setup>
import { storeToRefs } from "pinia"
import { usePositionStore } from "@/stores/hrms/setup/position"

const positions = usePositionStore()

const { allRequests, isEdit, position, errorMessage, successMessage } = storeToRefs(positions)

const setEdit = (pos) => {
    isEdit.value = true
    position.value = pos
}
const deletePos = async (pos) => {
    try {
        boardLoading.value = true
        await positions.deletePosition(pos.id)
        snackbar.add({
            type: "success",
            text: positions.successMessage
        })
    } finally {
        boardLoading.value = false
    }
}

const changePaginate = (newParams) => {
    allRequests.value.params.page = newParams.page ?? ""
}

const headers = [
    { name: "Department", id: "departments.department_name" },
    { name: "Position Type", id: "position_type" },
    { name: "Position Name", id: "name" },
]
const actions = {
    edit: true,
    delete: true
}

const snackbar = useSnackbar()
const boardLoading = ref(false)

</script>
<template>
    <LayoutBoards title="Position List" class="w-full" :loading="boardLoading">
        <div class="pb-2 text-gray-500">
            <LayoutFormPsTextInput v-model="allRequests.params.name" title="Search Position Name" />
            <LayoutPsTable :header-columns="headers" :datas="allRequests.list" :actions="actions" @edit-row="setEdit" @delete-row="deletePos" />
        </div>
        <div class="flex justify-center mx-auto">
            <PsCustomPagination :links="allRequests.pagination" @change-params="changePaginate" />
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
