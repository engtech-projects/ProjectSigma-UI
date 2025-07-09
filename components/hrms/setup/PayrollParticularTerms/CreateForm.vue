<script setup>
import { usePayrollParticularTerms } from "~/stores/hrms/setup/payroll-particular-terms"
const resourceStore = usePayrollParticularTerms()
const { createData } = storeToRefs(resourceStore)
const snackbar = useSnackbar()
const addLeave = async () => {
    try {
        await resourceStore.sendCreateResource()
        snackbar.add({
            type: "success",
            text: createData.successMessage || "Successfully created."
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
    <LayoutBoards title="HRMS - Accounting Particulars" :loading="createData.isLoading">
        <div class="text-gray-500 mt-2">
            <form @submit.prevent="addLeave">
                <LayoutFormPsSelect v-model="createData.params.type" :options-list="['Loan', 'Other Deduction']" title="Deduction Type" />
                <LayoutFormPsTextInput v-model="createData.params.local_particular_name" title="HRMS Particular Name" />
                <LayoutFormPsTextInput v-model="createData.params.accounting_particular_name" title="Accounting Particular Term" />
                <LayoutFormPsTextInput v-model="createData.params.description" title="Description" />
                <LayoutFormPsButton type="submit" button-title="Create" />
            </form>
        </div>
    </LayoutBoards>
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
