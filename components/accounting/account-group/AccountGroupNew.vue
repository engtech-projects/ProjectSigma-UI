<script lang="ts" setup>
import { useAccountGroupStore } from "~/stores/accounting/accountgroups"

const accountGroupStore = useAccountGroupStore()
const snackbar = useSnackbar()
const isLoading = ref(false)

async function handleSubmit () {
    try {
        isLoading.value = true
        await accountGroupStore.createAccountGroup()
        if (accountGroupStore.errorMessage !== "") {
            snackbar.add({
                type: "error",
                text: accountGroupStore.errorMessage
            })
        } else {
            snackbar.add({
                type: "success",
                text: accountGroupStore.successMessage
            })
        }
    } catch (error) {
        errorMessage.value = errorMessage
        snackbar.add({
            type: "error",
            text: accountGroupStore.errorMessage
        })
    } finally {
        isLoading.value = false
    }
}
</script>

<template>
    <LayoutBoards title="Create New Account Group" :loading="isLoading" class="w-full">
        <form @submit.prevent="handleSubmit">
            <div class="flex flex-col gap-2">
                <div>
                    <label
                        for="account_group_name"
                        class="text-xs italic"
                    >Account Group Name</label>
                    <input
                        id="accountGroupName"
                        v-model="accountGroupStore.accountGroup.account_group_name"
                        type="text"
                        class="w-full rounded-lg"
                        required
                    >
                </div>

                <!-- <div>
                    <label
                        for="account_type"
                        class="text-xs italic"
                    >Account Type</label>
                    <AccountingSelectSearch
                        :options="accountType.list"
                        title="account_type"
                        opid="type_id"
                        :selected-id="accountGroupStore.accountGroup.type_id"
                        @select="select"
                    />
                </div> -->
            </div>

            <div class="flex justify-end gap-4">
                <NuxtLink
                    to="/accounting/account-groups"
                    class="flex-1 text-white p-2 rounded bg-slate-600 content-center mt-5 text-center"
                >
                    Cancel
                </NuxtLink>
                <button
                    type="submit"
                    class="flex-1 text-white p-2 rounded bg-teal-600 content-center mt-5"
                >
                    Add Account Group
                </button>
            </div>
        </form>
    </LayoutBoards>
</template>

<style scoped></style>
