<script lang="ts" setup>
import { useAccountType } from "~/stores/accounting/accounttype"
import { useAccountStore } from "~/stores/accounting/account"

const accountTypeStore = useAccountType()
const accountStore = useAccountStore()
// const isSub = ref(false)
const snackbar = useSnackbar()

async function handleSubmit () {
    try {
        accountStore.isLoading = true
        await accountStore.createAccount()
        if (accountStore.errorMessage !== "") {
            snackbar.add({
                type: "error",
                text: accountStore.errorMessage
            })
        } else {
            snackbar.add({
                type: "success",
                text: accountStore.successMessage
            })
        }
    } catch (error) {
        errorMessage.value = errorMessage
        snackbar.add({
            type: "error",
            text: accountStore.errorMessage
        })
    } finally {
        // accountType.clearMessages()
    }
}
</script>
<template>
    <LayoutBoards title="Create New Account" :loading="accountStore.isLoading" class="w-full">
        <form @submit.prevent="handleSubmit">
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
                            {{ at.account_type_name }}
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
                <!-- <div>
                    <label
                        for="contract_location"
                        class="text-xs italic"
                    >Bank Recon</label>
                    <select
                        id="bankRecon"
                        class="w-full rounded-lg"
                        required
                    >
                        <option value="">
                            Option 1
                        </option>
                    </select>
                </div> -->
                <!-- <div class="flex gap-3 items-center">
                    <div class="flex flex-col">
                        <label
                            for="sub_account"
                            class="text-xs italic mb-1"
                        >Sub Account</label>
                        <input
                            id="subAccount"
                            v-model="isSub"
                            type="checkbox"
                            class="rounded-lg w-10 h-10"
                        >
                    </div>
                    <div class="flex-1">
                        <label
                            for="contract_location"
                            class="text-xs italic"
                        >Parent Account</label>
                        <select
                            id="parentAccount"
                            class="w-full rounded-lg"
                            required
                            :disabled="!isSub"
                        >
                            <option value="">
                                Option 1
                            </option>
                        </select>
                    </div>
                </div> -->
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
                <!-- <div>
                    <label
                        for="opening_balance"
                        class="text-xs italic"
                    >Opening Balance</label>
                    <input
                        id="openingBalance"
                        type="text"
                        class="w-full rounded-lg"
                        required
                    >
                </div> -->
                <!-- <div>
                    <label
                        for="as_of"
                        class="text-xs italic"
                    >As of</label>
                    <input
                        id="asOf"
                        type="date"
                        class="w-full rounded-lg"
                        required
                    >
                </div> -->
            </div>

            <div class="flex justify-end">
                <button
                    type="submit"
                    class="flex-1 text-white p-2 rounded bg-teal-600 content-center mt-5"
                >
                    Add Account
                </button>
            </div>
        </form>
    </LayoutBoards>
</template>

<style scoped></style>
