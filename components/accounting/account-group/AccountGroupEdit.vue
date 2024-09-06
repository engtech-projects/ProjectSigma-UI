<script lang="ts" setup>
import { useAccountGroupStore } from "~/stores/accounting/accountgroups"
import { useAccountStore } from "~/stores/accounting/account"

const accountGroupStore = useAccountGroupStore()
const accountStore = useAccountStore()
await accountStore.getAccounts()
const snackbar = useSnackbar()
const isLoading = ref(false)
const accounts = ref([])

async function handleSubmit () {
    try {
        isLoading.value = true
        accountGroupStore.accountGroup.account_ids = JSON.stringify(checkedAccounts.value)
        await accountGroupStore.editAccountGroup()
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
            navigateTo("/accounting/account-groups")
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
const checkedAccounts = computed(() => {
    const ids = []
    accounts.value.forEach((ac) => {
        ac.types.forEach((acc) => {
            if (acc.checked) {
                ids.push(acc.account_id)
            }
        })
    })
    return ids
})
onMounted(() => {
    accounts.value = JSON.parse(JSON.stringify(accountStore.byTypes))
    accounts.value.forEach((ac) => {
        ac.types.forEach((acc) => {
            accountGroupStore.accountGroup.accounts.forEach((ag) => {
                if (acc.account_id === ag.account_id) {
                    acc.checked = true
                    ac.collapse = true
                }
            })
        })
    })
})
</script>
<template>
    <LayoutBoards title="Edit Account Group" :loading="isLoading" class="w-full">
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

            <div>
                <label
                    for="symbol"
                    class="text-xs italic"
                >Accounts</label>
                <div class="flex flex-col ml-4">
                    <div v-for="ac in accounts" :key="ac.id" class="flex flex-col gap-2">
                        <div class="flex gap-4 items-center py-1 border-b">
                            <input id="" v-model="ac.collapse" type="checkbox" name="">
                            <span>{{ ac.type }}</span>
                        </div>
                        <div v-if="ac.collapse" class="flex flex-col ml-8">
                            <div v-for="acc in ac.types" :key="acc.account_id" class="flex gap-4 items-center py-1 border-b">
                                <input id="" v-model="acc.checked" type="checkbox" name="">
                                <span class="text-slate-700">{{ acc.account_name }}</span>
                            </div>
                        </div>
                    </div>
                </div>
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
                    Update Account Group
                </button>
            </div>
        </form>
    </LayoutBoards>
</template>

<style scoped></style>
