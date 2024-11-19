<script lang="ts" setup>
import { useAccountTypeStore } from "~/stores/accounting/setup/accounttype"
import { useChartOfAccountsStore } from "~/stores/accounting/setup/chartofaccounts"

const accounts = useChartOfAccountsStore()
const accountTypeStore = useAccountTypeStore()
await accountTypeStore.getAccountTypes()
const btnAction = ref("chart")
accounts.getAccounts()
definePageMeta({
    layout: "default",
})
useHead({
    title: "Chart of Accounts",
})
</script>
<template>
    <div class="flex flex-col gap-2">
        <div class="flex justify-end">
            <button
                :class="btnAction=='chart'?'active':''"
                class="px-4 py-2 w-42 bg-slate-100 hover:bg-slate-200 active:bg-slate-100 border border-slate-200 rounded-l-md"
                @click="btnAction = 'chart'"
            >
                <!-- <Icon name="fa:plus-circle" class="mr-1" /> -->
                Chart of Accounts
            </button>
            <button
                :class="btnAction=='type'?'active':''"
                class="px-4 py-2 w-42 bg-slate-100 hover:bg-slate-200 active:bg-slate-100 border border-slate-200"
                @click="btnAction = 'type'"
            >
                <Icon name="fa:plus-circle" class="mr-1" />
                Account Types
            </button>
            <button
                :class="btnAction=='account'?'active':''"
                class="px-4 py-2 w-42 bg-slate-100 hover:bg-slate-200 active:bg-slate-100 border border-slate-200 rounded-r-md"
                @click="btnAction = 'account'"
            >
                <Icon name="fa:plus-circle" class="mr-1" />
                Accounts
            </button>
        </div>
        <div class="flex gap-4">
            <!-- <AccountingNewAccountCategory v-show="btnAction == 'class'" class="flex-1" /> -->
            <div v-show="btnAction == 'type'" class="flex flex-1 gap-4">
                <!-- <AccountingNewType class="flex-1" /> -->
                <AccountingAccountTypeList class="flex-2" />
            </div>
            <div v-show="btnAction == 'account'" class="flex flex-1 gap-4">
                <AccountingAccountList class="flex-2 h-fit" />
            </div>

            <AccountingChartOfAccounts v-show="btnAction == 'chart'" class="flex-1" />
        </div>
    </div>
</template>

<style scoped>
    .active {
        background-color: rgb(20 184 166)!important;
        color: white!important;
    }
</style>
