<script lang="ts" setup>
import { useAccountType } from "~/stores/accounting/accounttype"
import { useAccountGroupStore } from "~/stores/accounting/accountgroups"

const accountGroupStore = useAccountGroupStore()
const snackbar = useSnackbar()
const isLoading = ref(false)

const accountType = useAccountType()
accountType.getAccountTypes()

function select (val:any) {
    accountGroupStore.accountGroup.type_id = val.type_id
}

async function handleSubmit () {
    try {
        isLoading.value = true
        await accountGroupStore.editAccountGroup()
        snackbar.add({
            type: "success",
            text: accountGroupStore.successMessage
        })
    } catch {
        snackbar.add({
            type: "error",
            text: accountGroupStore.errorMessage || "something went wrong."
        })
    } finally {
        isLoading.value = false
    }
}
function cancelEdit () {
    accountGroupStore.isEdit = false
    accountGroupStore.reset()
    return navigateTo("/accounting/account-groups")
}
</script>

<template>
    <LayoutBoards title="Create New Account Group" :loading="isLoading" class="w-full border-t-8 rounded-lg border-teal-500">
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

                <div>
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
                </div>
            </div>

            <div class="flex justify-end gap-4">
                <button
                    class="flex-1 text-white p-2 rounded bg-slate-600 content-center mt-5"
                    @click.prevent="cancelEdit"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    class="flex-1 text-white p-2 rounded bg-teal-600 content-center mt-5"
                >
                    Update Account Group
                </button>
            </div>
        </form>
    </LayoutBoards>
</template>

<style scoped></style>
