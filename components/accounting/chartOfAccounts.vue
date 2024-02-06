<script setup lang="ts">
import { useChartOfAccountsStore } from "~/stores/accounting/chartofaccounts"

const accounts = useChartOfAccountsStore()
</script>

<template>
    <div class="flex flex-col">
        <LayoutBoards title="Chart of Accounts" :loading="accounts.isLoading" class="w-full flex-2">
            <div class="flex flex-col gap-2 pt-4">
                <table v-for="list in accounts.list" :key="list.account_category" class="table-auto boder w-full">
                    <thead class="bg-slate-100">
                        <th class="text-left px-2 border-y py-2 uppercase">
                            {{ list.account_category }}
                        </th>
                        <th class="text-left px-2 border-y py-2 uppercase">
                            Bank Reconciliation
                        </th>
                        <th class="text-left px-2 border-y py-2 uppercase">
                            Action
                        </th>
                    </thead>
                    <tbody v-for="atype in list.account_type" :key="atype.account_category_id">
                        <tr class="border-y">
                            <td class="p-2 w-7/12">
                                <span class="pr-4 font-bold text-sm text-slate-800">{{ atype.account_type_number }}</span>
                                <span class="font-bold text-sm text-slate-800">{{ atype.account_type }}</span>
                            </td>
                            <td class="p-2">
                                Yes
                            </td>
                            <td class="p-2">
                                Edit
                            </td>
                        </tr>
                        <!-- <tr class="border-y">
                            <td class="p-2 w-7/12">
                                <span class="pl-6 pr-4 text-md">1001</span>
                                <span class="pl-6 pr-4 text-md">Cash on hand</span>
                            </td>
                            <td class="p-2">
                                Yes
                            </td>
                            <td class="p-2">
                                Edit
                            </td>
                        </tr>
                        <tr class="border-y">
                            <td class="p-2 w-7/12">
                                <span class="pl-6 pr-4 text-md">1001</span>
                                <span class="pl-6 pr-4 text-md">Cash Receivable</span>
                            </td>
                            <td class="p-2">
                                Yes
                            </td>
                            <td class="p-2">
                                Edit
                            </td>
                        </tr>
                        <tr class="border-y">
                            <td class="p-2 w-7/12">
                                <span class="pl-6 pr-4 text-md">1001</span>
                                <span class="pl-6 pr-4 text-md">Petty Cash Fund</span>
                            </td>
                            <td class="p-2">
                                Yes
                            </td>
                            <td class="p-2">
                                Edit
                            </td>
                        </tr> -->
                        <tr v-for="account,i in atype.account" :key="i" class="border-y">
                            <td class="p-2 w-7/12">
                                <span class="pl-6 pr-4 text-md">{{ account.account_number }}</span>
                                <span class="pl-6 text-md">{{ account.account_name }}</span>
                            </td>
                            <td class="p-2">
                                Yes
                            </td>
                            <td class="p-2">
                                Edit
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </LayoutBoards>
    </div>
</template>

<style>
    .flex-2 {
        flex: 2
    }
</style>
