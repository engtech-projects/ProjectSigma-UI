<script lang="ts" setup>
import { useAccountType } from "~/stores/accounting/accounttype"
import { useAccountStore } from "~/stores/accounting/account"

const accountTypeStore = useAccountType()
const accountStore = useAccountStore()
// const isSub = ref(false)
const snackbar = useSnackbar()

async function updateType () {
    try {
        await accountStore.editAccount()
        snackbar.add({
            type: "success",
            text: accountStore.successMessage
        })
    } catch {
        snackbar.add({
            type: "error",
            text: accountStore.errorMessage || "something went wrong."
        })
    } finally {
        // accountType.clearMessages()
    }
}

function cancelEdit () {
    accountStore.reset()
    accountStore.isEdit = false
}

</script>

<template>
    <LayoutBoards title="Edit Account" :loading="accountStore.isLoading" class="w-full border-t-8 rounded-lg border-teal-500">
        <form @submit.prevent="updateType">
            <div class="flex flex-col gap-2">
                <div>
                    <label
                        for="project_name"
                        class="text-xs italic"
                    >Type Name</label>
                    <select
                        id="typeName"
                        v-model="accountStore.account.type_id"
                        class="w-full rounded-lg"
                        required
                    >
                        <option v-for="at in accountTypeStore.list" :key="at.id" :value="at.type_id">
                            {{ at.account_type }}
                        </option>
                    </select>
                </div>
                <div>
                    <label
                        for="account_number"
                        class="text-xs italic"
                    >Account Number</label>
                    <input
                        id="accountNumber"
                        v-model="accountStore.account.account_number"
                        type="text"
                        class="w-full rounded-lg"
                        required
                    >
                </div>
                <div>
                    <label
                        for="account_name"
                        class="text-xs italic"
                    >Account Name</label>
                    <input
                        id="accountName"
                        v-model="accountStore.account.account_name"
                        type="text"
                        class="w-full rounded-lg"
                        required
                    >
                </div>
                <div>
                    <label
                        for="account_name"
                        class="text-xs italic"
                    >Opening Balance</label>
                    <input
                        id="openingBalance"
                        v-model="accountStore.account.opening_balance"
                        type="number"
                        class="w-full rounded-lg"
                        required
                    >
                </div>
                <div>
                    <label
                        for="description"
                        class="text-xs italic"
                    >Description</label>
                    <textarea
                        id="description"
                        v-model="accountStore.account.account_description"
                        type="text"
                        class="w-full rounded-lg"
                        required
                    />
                </div>
            </div>

            <div class="flex gap-4 justify-end">
                <button
                    class="flex-1 text-white p-2 rounded bg-slate-600 content-center mt-5"
                    @click="cancelEdit"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    class="flex-1 text-white p-2 rounded bg-teal-600 content-center mt-5"
                >
                    Update Account
                </button>
            </div>
        </form>
    </LayoutBoards>
</template>

<style scoped></style>
