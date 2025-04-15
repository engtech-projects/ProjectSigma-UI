<script setup>
import { storeToRefs } from "pinia"
import { usePositionStore } from "@/stores/project-monitoring/positions"

const positionStore = usePositionStore()

const { list: pGroupList, isEdit, getParams, pagination, errorMessage, successMessage } = storeToRefs(positionStore)

const setEdit = (pg) => {
    isEdit.value = true
    positionStore.position = pg
}
const deletePosition = async (pg) => {
    try {
        boardLoading.value = true
        await positionStore.deletePosition(pg.id)
        snackbar.add({
            type: "success",
            text: positionStore.successMessage
        })
    } finally {
        boardLoading.value = false
    }
}

const changePaginate = (newParams) => {
    getParams.value.page = newParams.page ?? ""
    positionStore.getPositions()
}

const headers = [
    { name: "Name", id: "name", style: "text-left" },
    { name: "Description", id: "description", style: "text-left" },
]
const actions = {
    edit: true,
    delete: true
}

const snackbar = useSnackbar()
const boardLoading = ref(false)

</script>
<template>
    <LayoutBoards title="Positions List" class="w-full" :loading="positionStore.isLoading">
        <div class="w-1/2 flex px-4">
            <LayoutFormPsTextInput v-model="positionStore.getParams.key" title="Search Position" class="w-full" />
        </div>
        <div class="pb-2 text-gray-500">
            <LayoutPsTable :header-columns="headers" :datas="pGroupList" :actions="actions" @edit-row="setEdit" @delete-row="deletePosition" />
        </div>
        <div v-if="pGroupList.length" class="flex justify-center mx-auto">
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
