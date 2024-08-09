<script setup>
import { storeToRefs } from "pinia"
import { useUOM } from "@/stores/inventory/setup/uom"

const main = useUOM()

const { list, pagination, getParams, errorMessage, successMessage } = storeToRefs(main)

const snackbar = useSnackbar()
const boardLoading = ref(false)

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
}

const headers = [
    { name: "Name", id: "name" },
    { name: "Symbol", id: "symbol" },
]
const actions = {
    edit: false,
    delete: true
}

</script>

<template>
    <div class="pb-2 text-gray-500 ">
        <LayoutPsTable :header-columns="headers" :datas="list" :actions="actions" @delete-row="deleteCont" />
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
</template>
