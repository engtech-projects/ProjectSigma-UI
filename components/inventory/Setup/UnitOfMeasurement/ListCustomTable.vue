<script setup>
import { storeToRefs } from "pinia"
import { useUOM } from "@/stores/inventory/setup/uom"

const storeUOM = useUOM()

const { listCustom: uomList, isEdit, uom, getParams, pagination, errorMessage, successMessage } = storeToRefs(storeUOM)

const snackbar = useSnackbar()
const boardLoading = ref(false)

const setEdit = (cont) => {
    isEdit.value = true
    uom.value = cont
}

const deleteCont = async (cont) => {
    try {
        boardLoading.value = true
        await contributions.deleteContribution(cont.id)
        snackbar.add({
            type: "success",
            text: contributions.successMessage
        })
    } finally {
        boardLoading.value = false
    }
}

const changePaginate = (newParams) => {
    getParams.value.page = newParams.page ?? ""
}

const headers = [
    { name: "Name", id: "name" },
    { name: "Symbol", id: "symbol" },
    { name: "Group", id: "group_id" },
    { name: "Standard", id: "is_standard" },
]
const actions = {
    edit: true,
    delete: true
}
</script>

<template>
    <LayoutBoards title="Custom Unit Of Measurement Table" class="w-full" :loading="boardLoading">
        <div class="pb-2 text-gray-500 ">
            <LayoutPsTable :header-columns="headers" :datas="uomList" :actions="actions" @edit-row="setEdit" @delete-row="deleteCont" />
        </div>
        <div class="flex justify-center mx-auto p-2">
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
