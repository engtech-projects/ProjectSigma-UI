<script lang="ts" setup>
import { useAccountStore } from "~/stores/accounting/account"
import { useBookStore } from "~/stores/accounting/book"
import { useAccountGroupStore } from "~/stores/accounting/accountgroups"

const bookStore = useBookStore()
const accountGroupStore = useAccountGroupStore()
await accountGroupStore.getAccountGroups()
const snackbar = useSnackbar()
const isLoading = ref(false)

const accountStore = useAccountStore()
await accountStore.getAccounts()

function select (val:any) {
    bookStore.book.account_group_id = val.account_group_id
}

async function handleSubmit () {
    try {
        isLoading.value = true
        bookStore.book.account_ids = JSON.stringify(checkedAccounts.value)
        await bookStore.createAccount()
        if (bookStore.errorMessage !== "") {
            snackbar.add({
                type: "error",
                text: bookStore.errorMessage
            })
        } else {
            snackbar.add({
                type: "success",
                text: bookStore.successMessage
            })
            navigateTo("/accounting/books")
        }
    } catch (error) {
        errorMessage.value = errorMessage
        snackbar.add({
            type: "error",
            text: bookStore.errorMessage
        })
    } finally {
        isLoading.value = false
    }
}
// const accountsLists = computed(() => {
//     const accounts = []
//     accountStore.list.forEach((ac) => {
//         ac.checked = false
//         accounts.push(ac)
//     })
//     return accounts
// })
// const checkedAccounts = computed(() => {
//     return accountsLists.value.filter(al => al.checked)
// })
const accounts = ref([])
onMounted(() => {
    accounts.value = JSON.parse(JSON.stringify(accountStore.byTypes))
})
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
</script>
<template>
    <LayoutBoards title="Create New Book" :loading="isLoading" class="w-full">
        <form @submit.prevent="handleSubmit">
            <div class="flex flex-col gap-2">
                <div>
                    <label
                        for="book_name"
                        class="text-xs italic"
                    >Book Name</label>
                    <input
                        id="bookName"
                        v-model="bookStore.book.book_name"
                        type="text"
                        class="w-full rounded-lg"
                        required
                    >
                </div>

                <div>
                    <label
                        for="book_name"
                        class="text-xs italic"
                    >Account Group</label>
                    <AccountingSelectSearch
                        :options="accountGroupStore.list"
                        title="account_group_name"
                        opid="account_group_id"
                        :selected-id="bookStore.book.account_group_id"
                        @select="select"
                    />
                </div>

                <div>
                    <label
                        for="symbol"
                        class="text-xs italic"
                    >Symbol</label>
                    <input
                        id="bookName"
                        v-model="bookStore.book.symbol"
                        type="text"
                        class="w-full rounded-lg"
                        required
                    >
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
            </div>

            <div class="flex justify-end gap-4">
                <NuxtLink
                    to="/accounting/books"
                    class="flex-1 text-white p-2 rounded bg-slate-600 content-center mt-5 text-center"
                >
                    Cancel
                </NuxtLink>
                <button
                    type="submit"
                    class="flex-1 text-white p-2 rounded bg-teal-600 content-center mt-5"
                >
                    Add Book
                </button>
            </div>
        </form>
    </LayoutBoards>
</template>

<style scoped></style>
