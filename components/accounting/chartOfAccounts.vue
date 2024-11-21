<script setup>
import { useChartOfAccountsStore } from "~/stores/accounting/setup/chartofaccounts"

const accountStore = useChartOfAccountsStore()
</script>
<template>
    <div class="flex flex-col">
        <LayoutBoards title="Chart of Accounts" :loading="false" class="w-full flex-2">
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
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="ac,i in accountStore.chart" :key="ac.account_id">
                            <td class="border px-2">
                                {{ i }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </LayoutBoards>
    </div>
</template>

<style scoped>
    .flex-2 {
        flex: 2
    }
</style>
