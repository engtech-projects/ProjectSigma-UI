<script lang="ts" setup>
import { useAccountType } from "~/stores/accounting/accounttype"

const accountType = useAccountType()
const boardLoading = ref(false)
const snackbar = useSnackbar()
accountType.getAccountTypes()

async function handleSubmit () {
    try {
        boardLoading.value = true
        await accountType.createAccountType()
        if (accountType.errorMessage !== "") {
            snackbar.add({
                type: "error",
                text: accountType.errorMessage
            })
        } else {
            snackbar.add({
                type: "success",
                text: accountType.successMessage
            })
        }
    } catch (error) {
        errorMessage.value = errorMessage
        snackbar.add({
            type: "error",
            text: accountType.errorMessage
        })
    } finally {
        // accountType.clearMessages()
        boardLoading.value = false
    }
}

async function updateType () {
    try {
        boardLoading.value = true
        await accountType.editAccountType()
        snackbar.add({
            type: "success",
            text: accountType.successMessage
        })
    } catch {
        snackbar.add({
            type: "error",
            text: accountType.errorMessage || "something went wrong."
        })
    } finally {
        // accountType.clearMessages()
        boardLoading.value = false
    }
}

function cancelEdit () {
    accountType.isEdit = false
    accountType.reset()
}
</script>
<template>
    <LayoutBoards title="Create New Type" :loading="boardLoading" class="w-full h-fit">
        <form @submit.prevent="!accountType.isEdit?handleSubmit():updateType()">
            <div class="flex flex-col gap-2">
                <div>
                    <label
                        for="account_type"
                        class="text-xs italic"
                    >Type Name</label>
                    <input
                        id="accountNumber"
                        v-model="accountType.accountType.account_type"
                        type="text"
                        class="w-full rounded-lg"
                        required
                    >
                </div>
                <div>
                    <label
                        for="class_name"
                        class="text-xs italic"
                    >Account Category</label>
                    <select
                        id="className"
                        v-model="accountType.accountType.account_category"
                        class="w-full rounded-lg"
                        required
                    >
                        <option value="asset">
                            Asset
                        </option>
                        <option value="equity">
                            Equity
                        </option>
                        <option value="expense">
                            Expense
                        </option>
                        <option value="income">
                            Income
                        </option>
                        <option value="liability">
                            Liability
                        </option>
                    </select>
                </div>
                <div class="flex gap-4">
                    <div class="flex-1">
                        <label
                            for="balance_type"
                            class="text-xs italic"
                        >Balance Type</label>
                        <select
                            id="className"
                            v-model="accountType.accountType.balance_type"
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
                    <div class="flex-1">
                        <label
                            for="notation"
                            class="text-xs italic"
                        >Notation</label>
                        <select
                            id="className"
                            v-model="accountType.accountType.notation"
                            class="w-full rounded-lg"
                            required
                        >
                            <option value="+">
                                ( + ) - Plus
                            </option>
                            <option value="-">
                                ( - ) - Minus
                            </option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="flex justify-end">
                <button
                    v-if="!accountType.isEdit"
                    type="submit"
                    class="flex-1 text-white p-2 rounded bg-teal-600 content-center mt-5"
                >
                    Add Type
                </button>
                <div v-else class="flex gap-2 flex-1">
                    <button
                        class="flex-1 text-white p-2 rounded bg-slate-500 content-center mt-5"
                        @click.prevent="cancelEdit"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        class="flex-1 text-white p-2 rounded bg-teal-600 content-center mt-5"
                    >
                        Update Type
                    </button>
                </div>
            </div>
        </form>
    </LayoutBoards>
</template>

<style scoped></style>
