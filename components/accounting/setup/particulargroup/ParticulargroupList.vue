<script setup>
import { storeToRefs } from "pinia"
import { useParticularGroupStore } from "@/stores/accounting/setup/particulargroup"

const particularGroupStore = useParticularGroupStore()

const { list: pGroupList, isEdit, getParams, pagination, errorMessage, successMessage } = storeToRefs(particularGroupStore)

const setEdit = (pg) => {
    isEdit.value = true
    particularGroupStore.particularGroup = pg
}
const deleteParticularGroup = async (pg) => {
    try {
        boardLoading.value = true
        await particularGroupStore.deleteParticularGroup(pg.id)
        snackbar.add({
            type: "success",
            text: particularGroupStore.successMessage
        })
    } finally {
        boardLoading.value = false
    }
}

const changePaginate = (newParams) => {
    getParams.value.page = newParams.page ?? ""
    particularGroupStore.getParticularGroups()
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
    <LayoutBoards title="Particular Group List" class="w-full" :loading="particularGroupStore.isLoading">
        <div class="pb-2 text-gray-500">
            <LayoutPsTable :header-columns="headers" :datas="pGroupList" :actions="actions" @edit-row="setEdit" @delete-row="deleteParticularGroup" />
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
