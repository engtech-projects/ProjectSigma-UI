<script setup>
import { useAccountCategoriesStore } from "~/stores/accounting/accountcategories/accountcategory"

const accountCategory = useAccountCategoriesStore()
const { errorMessage } = storeToRefs(accountCategory)
const snackbar = useSnackbar()
const boardLoading = ref(false)
accountCategory.getAccountCategories()

async function handleSubmit () {
    try {
        boardLoading.value = true
        await accountCategory.createAccountCategory()
        if (accountCategory.errorMessage !== "") {
            snackbar.add({
                type: "error",
                text: accountCategory.errorMessage
            })
        } else {
            snackbar.add({
                type: "success",
                text: accountCategory.successMessage
            })
        }
    } catch (error) {
        errorMessage.value = errorMessage
        snackbar.add({
            type: "error",
            text: accountCategory.errorMessage
        })
    } finally {
        // accountCategory.clearMessages()
        boardLoading.value = false
    }
}
</script>
<template>
    <LayoutBoards title="Create New Category" :loading="boardLoading" class="w-full h-fit">
        <form @submit.prevent="handleSubmit">
            <div class="flex flex-col gap-2">
                <div>
                    <label
                        for="account_category"
                        class="text-xs italic"
                    >Account Category</label>
                    <input
                        id="accountCategory"
                        v-model="accountCategory.accountCategory.account_category"
                        type="text"
                        class="w-full rounded-lg"
                        required
                    >
                </div>
                <div>
                    <label
                        for="notation"
                        class="text-xs italic"
                    >Notation</label>
                    <select
                        id="notation"
                        v-model="accountCategory.accountCategory.to_increase"
                        name="notation"
                        class="w-full rounded-lg"
                        required
                    >
                        <option value="debit">
                            Debit
                        </option>
                        <option value="credit">
                            Credit
                        </option>
                    </select>
                </div>
            </div>

            <div class="flex justify-end">
                <button
                    type="submit"
                    class="flex-1 text-white p-2 rounded bg-teal-600 content-center mt-5"
                >
                    Add Class
                </button>
            </div>
        </form>
    </LayoutBoards>
</template>

<style scoped></style>
