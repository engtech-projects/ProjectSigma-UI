<script setup>
import { useVoucherStore } from "~/stores/accounting/voucher"

const voucherStore = useVoucherStore()

</script>
<template>
    <div class="flex flex-col items-end gap-4">
        <div class="pb-2 text-gray-500">
            <table class="table-auto w-full border-collapse text-sm">
                <thead>
                    <tr class="text-left">
                        <th class="p-2 text-sm">
                            Voucher No.
                        </th>
                        <th class="p-2 text-sm">
                            Date Created
                        </th>
                        <th class="p-2 text-sm">
                            Payee
                        </th>
                        <th class="p-2 text-sm">
                            Amount
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="voucher, i in voucherStore.list" :key="i" class="border text-left">
                        <td class="p-2">
                            {{ voucher.voucher_no }}
                        </td>
                        <td class="p-2">
                            {{ useUtilities().value.dateToString(new Date(voucher.date_encoded)) }}
                        </td>
                        <td class="p-2">
                            {{ voucher.stakeholder.name }}
                        </td>
                        <td class="p-2">
                            {{ useUtilities().value.formatCurrency(voucher.net_amount) }}
                        </td>
                        <td class="p-2">
                            <NuxtLink :to="'/accounting/voucher/cash/details?id=' + voucher.id">
                                <Icon name="material-symbols:visibility-rounded" color="white" class="bg-green-500 rounded h-8 w-8 p-1 " />
                            </NuxtLink>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>
    #listTable tbody tr td, #listTable thead th {
        text-align: left!important;
    }
</style>
