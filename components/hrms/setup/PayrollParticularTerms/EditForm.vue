<script setup>
import { usePayrollParticularTerms } from "~/stores/hrms/setup/payroll-particular-terms"
const resourceStore = usePayrollParticularTerms()
const { editData, isEdit } = storeToRefs(resourceStore)
const snackbar = useSnackbar()
const cancelEdit = () => {
    isEdit.value = false
}
const edit = async () => {
    try {
        await resourceStore.sendEditResource()
        snackbar.add({
            type: "success",
            text: editData.successMessage || "Successfully updated."
        })
    } catch (e) {
        snackbar.add({
            type: "error",
            text: e || "Something went wrong."
        })
    }
}

</script>
<template>
    <LayoutEditBoards title="Edit HRMS - Accounting Particulars" :loading="editData.isLoading">
        <div class="text-gray-500 mt-2">
            <form @submit.prevent="edit">
                <LayoutFormPsSelect v-model="editData.params.type" :options-list="['Loan', 'Other Deduction']" title="Deduction Type" />
                <LayoutFormPsTextInput v-model="editData.params.local_particular_name" title="HRMS Particular Name" />
                <LayoutFormPsTextInput v-model="editData.params.accounting_particular_name" title="Accounting Particular Term" />
                <LayoutFormPsTextInput v-model="editData.params.description" title="Description" />
                <LayoutFormPsButton type="submit" button-title="Edit" />
                <LayoutFormPsButton button-title="Cancel" button-icon="material-symbols:cancel" @click="cancelEdit" />
            </form>
        </div>
    </LayoutEditBoards>
</template>

<style scoped>
.error-message,
.success-message {
    transition: opacity 1s ease;
}

.error-message.fade-out,
.success-message.fade-out {
    animation-duration: 1s;
    opacity: 0;
}
</style>
