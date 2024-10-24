<script setup>
import { useVoucherStore } from "~/stores/accounting/voucher"

const voucherStore = useVoucherStore()
const emit = defineEmits(["view-details"])

const setAction = (action, voucher) => {
    if (action === "view-details" || action === "edit") {
        voucherStore.voucher = voucher
    }
    emit(action)
}
const voucherList = computed(() => {
    return voucherStore.list.filter(v => v.book_id === 2)
})
</script>
<template>
    <div class="flex flex-col items-end gap-4">
        <div v-if="voucherStore.isLoading" class="absolute bg-slate-200/50 rounded-lg w-full h-full flex items-center justify-center">
            <img
                class="flex justify-center w-28 rounded-md"
                src="/loader.gif"
                alt="logo"
            >
        </div>
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
                    <tr v-for="voucher, i in voucherList" :key="i" class="border text-left">
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
                            <Icon
                                name="material-symbols:visibility-rounded"
                                color="white"
                                class="bg-green-500 hover:bg-green-600 active:bg-green-700 rounded h-8 w-8 p-1 cursor-pointer"
                                @click="setAction('view-details', voucher)"
                            />
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
