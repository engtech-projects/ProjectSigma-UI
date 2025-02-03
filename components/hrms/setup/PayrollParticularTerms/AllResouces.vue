<script setup>
import { usePayrollParticularTerms } from "~/stores/hrms/setup/payroll-particular-terms"
const resourceStore = usePayrollParticularTerms()
const { allList, isEdit, editData, deleteData } = storeToRefs(resourceStore)
const snackbar = useSnackbar()

onMounted(() => {
    if (!allList.value.isLoaded) {
        resourceStore.getAllList()
    }
    allList.value.isLoaded = true
})
onUnmounted(() => {
    allList.value.isLoaded = false
})

const setEdit = (data) => {
    isEdit.value = true
    editData.value.params = JSON.parse(JSON.stringify(data))
}

const deleteLeaves = async (res) => {
    try {
        await resourceStore.sendDeleteResource(res.id)
        snackbar.add({
            type: "success",
            text: deleteData.successMessage || "Successfully deleted."
        })
    } catch (e) {
        snackbar.add({
            type: "error",
            text: e || "Something went wrong."
        })
    }
}

const changePaginate = (newParams) => {
    getParams.value.page = newParams.page ?? ""
}

const headers = [
    { name: "Type", id: "type" },
    { name: "HRMS Payroll Particular", id: "local_particular_name" },
    { name: "Accounting Voucher Term", id: "accounting_particular_name" },
    { name: "Description", id: "description" },
]
const shownActions = {
    edit: true,
    delete: true
}
</script>
<template>
    <LayoutBoards title="Leave List" class="w-full" :loading="allList.isLoading">
        <div class="pb-2 text-gray-500">
            <LayoutPsTable :header-columns="headers" :datas="allList.list" :actions="shownActions" @edit-row="setEdit" @delete-row="deleteLeaves" />
        </div>
        <div class="flex justify-center mx-auto">
            <CustomPagination :links="allList.pagination" @change-params="changePaginate" />
        </div>
    </LayoutBoards>
</template>
