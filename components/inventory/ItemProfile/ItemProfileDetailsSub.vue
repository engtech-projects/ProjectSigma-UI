<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useItemProfileStore } from "@/stores/inventory/itemprofiles"

interface HeaderColumn {
    name: string,
    id: string,
    style: string
}

defineProps({
    title: {
        type: String,
        required: true,
    },
    headerColumns: {
        type: Array<HeaderColumn>,
        required: true,
    },
    datas: {
        type: Array<any>,
        required: true,
    },
    dataApproval: {
        type: Object,
        required: true,
    },
})

const { data: userData } = useAuth()

const profileStore = useItemProfileStore()

const snackbar = useSnackbar()
const boardLoading = ref(false)

const { remarks } = storeToRefs(profileStore)
const clearRemarks = () => {
    remarks.value = ""
}
const approvedRequest = async (id:number) => {
    try {
        boardLoading.value = true
        await profileStore.approveApprovalForm(id)
        snackbar.add({
            type: "success",
            text: profileStore.successMessage
        })
        profileStore.approvalReset()
        if (profileStore.errorMessage) {
            snackbar.add({
                type: "error",
                text: profileStore.errorMessage
            })
        }
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error || "something went wrong."
        })
    } finally {
        boardLoading.value = false
    }
}
const denyRequest = async (id:any) => {
    try {
        boardLoading.value = true
        await profileStore.denyApprovalForm(id)
        snackbar.add({
            type: "success",
            text: profileStore.successMessage
        })
        profileStore.approvalReset()
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error || "something went wrong."
        })
    } finally {
        boardLoading.value = false
    }
}
</script>

<template>
    <div class="flex flex-col gap-2 w-full p-4">
        <div id="headline">
            <div class="basis-[10%] grow-1 shrink-0 flex items-center justify-between border-b rounded-t dark:border-gray-600">
                <h3 v-if="title" class="pl-4 text-xl font-light text-gray-900 dark:text-white p-4">
                    {{ title }}
                </h3>
            </div>
        </div>
        <div id="content">
            <LayoutPsTable
                id="itemProfileListTable"
                :header-columns="headerColumns"
                :datas="datas"
            />
        </div>
        <div id="approvals" class="w-full">
            <LayoutApprovalsListView :approvals="dataApproval.approvals" />
        </div>
        <div id="footer">
            <div v-if="dataApproval.next_approval?.user_id === userData.id" class="flex gap-2 p-2 justify-end relative">
                <HrmsCommonApprovalDenyButton
                    v-model:deny-remarks="remarks"
                    :request-id="dataApproval.id"
                    @approve="approvedRequest"
                    @deny="denyRequest"
                    @clear="clearRemarks"
                />
            </div>
        </div>
    </div>
</template>
