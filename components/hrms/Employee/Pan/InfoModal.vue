<script setup>
import { storeToRefs } from "pinia"
import { usePersonelActionNotice } from "@/stores/hrms/pan"

defineProps({
    data: {
        type: Object,
        required: true,
    },
})

const { data: userData } = useAuth()
const showModal = defineModel("showModal", { required: false, type: Boolean })

const pan = usePersonelActionNotice()
const { remarks } = storeToRefs(pan)

const snackbar = useSnackbar()
const boardLoading = ref(false)

const closeViewModal = () => {
    showModal.value = false
}
const denyRequest = async (id) => {
    try {
        boardLoading.value = true
        await pan.denyRequest(id)
        snackbar.add({
            type: "success",
            text: pan.successMessage
        })
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error || "something went wrong."
        })
    } finally {
        boardLoading.value = false
        closeViewModal()
    }
}

const approvedRequest = async (id) => {
    try {
        boardLoading.value = true
        await pan.approvedPanRequest(id)
        snackbar.add({
            type: "success",
            text: "Successfully Approved."
        })
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error || "something went wrong."
        })
    } finally {
        boardLoading.value = false
        closeViewModal()
    }
}

</script>
<template>
    <PsModal v-model:show-modal="showModal" :is-loading="boardLoading" :title="'Personnel Action Notice for ' + data.type">
        <template #body>
            <div class="p-2">
                <LayoutPrint>
                    <HrmsEmployeePanPersonalActionFormInfo :pan-data="data" />
                </LayoutPrint>
            </div>
        </template>
        <template #footer>
            <div v-if="data.next_approval?.user_id === userData?.id || useCheckAccessibility([AccessibilityTypes.SUPERADMIN])" class="flex gap-2 p-2 justify-end">
                <HrmsCommonApprovalDenyButton
                    v-model:deny-remarks="remarks"
                    :request-id="data.id"
                    @approve="approvedRequest"
                    @deny="denyRequest"
                />
            </div>
        </template>
    </PsModal>
</template>
