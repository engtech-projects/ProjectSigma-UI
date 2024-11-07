<script setup>
import { useChartOfAccountsStore } from "~/stores/accounting/chartofaccounts"

const accounts = useChartOfAccountsStore()
</script>
<template>
    <div class="flex flex-col">
        <LayoutBoards title="Chart of Accounts" :loading="accounts.isLoading" class="w-full flex-2">
            <div class="flex flex-col gap-2 pt-4">
                <table class="table-auto w-full border-collapse">
                    <thead>
                        <tr class="text-left">
                            <th class="p-2">
                                Account Name
                            </th>
                            <th class="p-2">
                                Account #
                            </th>
                            <th class="p-2">
                                Type
                            </th>
                            <!-- <th class="p-2 text-right">
                                Actions
                            </th> -->
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="ac in accounts.list" :key="ac.account_id">
                            <td class="border px-2">
                                {{ ac.account_number }}
                            </td>
                            <td class="border px-2">
                                {{ ac.account_name }}
                            </td>
                            <td class="border px-2">
                                {{ ac.account_type_id }}
                            </td>
                            <!-- <td class="text-right border px-2">
                                <button>
                                    <Icon name="material-symbols:edit" color="white" class="bg-green-400 rounded h-8 w-8 p-1" />
                                </button>
                            </td> -->
                        </tr>
                    </tbody>
                </table>
                <!-- <table v-for="list,j in accounts.list" :key="j" class="table-auto boder w-full">
                    <thead class="bg-slate-100">
                        <th class="text-left px-2 border-y py-2 uppercase">
                            {{ j }}
                        </th>
                        <th class="text-left px-2 border-y py-2 uppercase">
                            Bank Reconciliation
                        </th>
                        <th class="text-left px-2 border-y py-2 uppercase">
                            Action
                        </th>
                    </thead>
                    <tbody>
                        <tr v-for="account in list" :key="account.account_id" class="border-y">
                            <td class="p-2 w-7/12">
                                <span class="ml-4 pr-4 font-bold text-sm text-slate-800">{{ account.account_number }}</span>
                                <span class="font-bold text-sm text-slate-800">{{ account.account_name }}</span>
                            </td>
                            <td class="p-2">
                                Yes
                            </td>
                            <td class="p-2">
                                Edit
                            </td>
                        </tr>
                    </tbody>
                </table> -->
            </div>
        </LayoutBoards>
    </div>
</template>

<style scoped>
    .flex-2 {
        flex: 2
    }
</style>
