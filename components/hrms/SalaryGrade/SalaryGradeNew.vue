<script lang="ts" setup>
import { useTransactionTypeStore } from "~/stores/accounting/transactiontype"
import { useBookStore } from "~/stores/accounting/book"
import { useAccountStore } from "~/stores/accounting/account"

const transactionTypeStore = useTransactionTypeStore()
const bookStore = useBookStore()
bookStore.getBooks()
const accountStore = useAccountStore()
accountStore.getAccounts()
const boardLoading = ref(false)
const snackbar = useSnackbar()

async function handleSubmit () {
    try {
        boardLoading.value = true
        await transactionTypeStore.createTransactionType()
        if (transactionTypeStore.errorMessage !== "") {
            snackbar.add({
                type: "error",
                text: transactionTypeStore.errorMessage
            })
        } else {
            snackbar.add({
                type: "success",
                text: transactionTypeStore.successMessage
            })
        }
    } catch (error) {
        transactionTypeStore.errorMessage = errorMessage
        snackbar.add({
            type: "error",
            text: transactionTypeStore.errorMessage
        })
    } finally {
        transactionTypeStore.reset()
        boardLoading.value = false
    }
}

</script>

<template>
    <LayoutBoards title="Create Salary Grade" :loading="boardLoading" class="w-full h-fit">
        <form @submit.prevent="handleSubmit">
            <div class="flex flex-col gap-2">
                <div>
                    <label
                        for="salary_grade"
                        class="text-xs italic"
                    >Salary Grade Level</label>
                    <input
                        id="salaryGradeLevel"
                        v-model="transactionTypeStore.transactionType.transaction_type_name"
                        type="text"
                        class="w-full rounded-lg"
                        required
                    >
                </div>
                <div>
                    <label
                        for="salary_grade_step"
                        class="text-xs italic"
                    >Salary Grade Step</label>
                    <input
                        id="salaryGradeStep"
                        v-model="transactionTypeStore.transactionType.transaction_type_name"
                        type="text"
                        class="w-full rounded-lg"
                        required
                    >
                </div>
                <div>
                    <label
                        for="amount"
                        class="text-xs italic"
                    >Amount</label>
                    <input
                        id="amount"
                        v-model="transactionTypeStore.transactionType.transaction_type_name"
                        type="number"
                        class="w-full rounded-lg"
                        required
                        placeholder="0.00"
                    >
                </div>
            </div>

            <div class="flex justify-end gap-4">
                <button
                    type="submit"
                    class="flex-1 text-white p-2 rounded bg-teal-600 content-center mt-5"
                >
                    Add Salary Grade
                </button>
            </div>
        </form>
    </LayoutBoards>
</template>

<style scoped></style>
