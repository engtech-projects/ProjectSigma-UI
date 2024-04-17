<script setup>
import { storeToRefs } from "pinia"
import { useAnnouncements } from "@/stores/hrms/announcements"

const mains = useAnnouncements()

// const { isEdit, main, getParams, pagination, errorMessage, successMessage } = storeToRefs(mains)
const { list: mainList, announcement, isEdit } = storeToRefs(mains)

const setEdit = (dept) => {
    isEdit.value = true
    announcement.value = dept
}

const deleteone = async (dept) => {
    try {
        boardLoading.value = true
        await mains.deleteone(dept.id)
        snackbar.add({
            type: "success",
            text: mains.successMessage
        })
    } finally {
        boardLoading.value = false
    }
}

// const changePaginate = (newParams) => {
//     getParams.value.page = newParams.page ?? ""
// }

const headers = [
    { name: "Announcement", id: "title" },
    { name: "Content", id: "content" },
    { name: "Date From", id: "start_date" },
    { name: "Date to", id: "end_date" },
]
const actions = {
    edit: true,
    delete: true
}
const snackbar = useSnackbar()
const boardLoading = ref(false)

</script>
<template>
    <LayoutBoards title="Announcement List">
        <div class="mt-5 mb-6">
            <LayoutPsTable :header-columns="headers" :actions="actions" :datas="mainList" @edit-row="setEdit" @delete-row="deleteone" />
        </div>
    </LayoutBoards>
</template>
