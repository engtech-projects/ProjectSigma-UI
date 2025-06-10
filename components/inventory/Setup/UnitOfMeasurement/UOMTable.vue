<script setup>
import { storeToRefs } from "pinia"
import { useUOM } from "@/stores/inventory/setup/uom"

const main = useUOM()

const { list, pagination, isEdit, uom, getParams, errorMessage, successMessage, isLoading } = storeToRefs(main)

const snackbar = useSnackbar()
const boardLoading = ref(false)

const setEdit = (cont) => {
    isEdit.value = true
    uom.value = cont
}

const deleteCont = async (cont) => {
    try {
        boardLoading.value = true
        await main.deleteUOM(cont.id)
        if (main.errorMessage !== "") {
            snackbar.add({
                type: "error",
                text: errorMessage.value
            })
        } else {
            snackbar.add({
                type: "success",
                text: successMessage.value
            })
            await main.getUOM()
        }
    } finally {
        boardLoading.value = false
    }
}

const changePaginate = (newParams) => {
    getParams.value.page = newParams.page ?? ""
    await main.getUOM()
}

const headers = [
    { name: "Name", id: "name" },
    { name: "Symbol", id: "symbol" },
]
const actions = {
    edit: true,
    delete: true
}
</script>
<template>
    <div class="relative">
        <div v-if="isLoading" class="absolute bg-slate-200/50 rounded-lg w-full h-full flex items-center justify-center">
            <img
                class="flex justify-center w-28 rounded-md"
                src="/loader.gif"
                alt="logo"
            >
        </div>
        <div>
            <div class="pb-2 text-gray-500 ">
                <div v-if="getParams.filter === 'custom'">
                    <LayoutPsTable :header-columns="headers" :datas="list" :actions="actions" @edit-row="setEdit" @delete-row="deleteCont" />
                </div>
                <div v-else>
                    <LayoutPsTable :header-columns="headers" :datas="list" @delete-row="deleteCont" />
                </div>
            </div>
            <div class="flex justify-center mx-auto p-2">
                <CustomPagination :links="pagination" @change-params="changePaginate" />
            </div>
        </div>
    </div>
</template>
