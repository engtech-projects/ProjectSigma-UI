<script lang="ts" setup>
import { useChartOfAccountsStore } from "~/stores/accounting/chartofaccounts"

const accounts = useChartOfAccountsStore()
const btnAction = ref("")
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
                :class="btnAction=='class'?'active':''"
                class="px-4 py-2 w-42 bg-slate-100 hover:bg-slate-200 active:bg-slate-100 border border-slate-200 rounded-l-md"
                @click="btnAction = 'class'"
            >
                <Icon name="fa:plus-circle" class="mr-1" />
                New Class
            </button>
            <button
                :class="btnAction=='type'?'active':''"
                class="px-4 py-2 w-42 bg-slate-100 hover:bg-slate-200 active:bg-slate-100 border border-slate-200"
                @click="btnAction = 'type'"
            >
                <Icon name="fa:plus-circle" class="mr-1" />
                New Type
            </button>
            <button
                :class="btnAction=='account'?'active':''"
                class="px-4 py-2 w-42 bg-slate-100 hover:bg-slate-200 active:bg-slate-100 border border-slate-200 rounded-r-md"
                @click="btnAction = 'account'"
            >
                <Icon name="fa:plus-circle" class="mr-1" />
                New Account
            </button>
        </div>
        <div class="flex gap-4">
            <AccountingNewClass v-show="btnAction == 'class'" class="flex-1" />
            <AccountingNewType v-show="btnAction == 'type'" class="flex-1" />
            <AccountingNewAccount v-show="btnAction == 'account'" class="flex-1 h-fit" />
            <AccountingChartOfAccounts class="flex-2" />
        </div>
    </div>
</template>

<style scoped>
    .active {
        background-color: rgb(20 184 166)!important;
        color: white!important;
    }
</style>
