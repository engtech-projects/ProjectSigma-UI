<script setup>
import { useVoucherStore } from "~/stores/accounting/voucher"

const voucherStore = useVoucherStore()
const emit = defineEmits(["view-details"])

const navigate = (url = "", action = null, voucher = null) => {
    history.pushState(null, "", url)
    if (voucher) {
        voucherStore.voucher = voucher
    }
    emit(action)
}

const voucherList = computed(() => {
    return voucherStore.filteredList.filter(v => v.book_id === 1)
})
</script>
<template>
    <div class="flex flex-col items-end gap-4">
        <div v-if="voucherStore.isLoading.list" class="absolute bg-slate-200/50 rounded-lg w-full h-full flex items-center justify-center">
            <img
                class="flex justify-center w-28 rounded-md"
                src="/loader.gif"
                alt="logo"
            >
        </div>
        <div class="flex gap-2">
            <!-- <div class="flex w-full items-center">
                <label for="sortIput" class="text-xs mr-1">
                    Sort by:
                </label>
                <select
                    id="netAmount"
                    class="bg-gray-50 border h-6 border-gray-300 text-gray-900 rounded-l-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 py-1 px-2 text-xs"
                >
                    <option value="status">
                        Status
                    </option>
                </select>
                <button class="bg-gray-500 hover:bg-gray-600 active:bg-gray-500 text-white text-sm px-2 h-6 pb-1 rounded-r-md border-0">
                    <Icon name="mingcute:arrow-down-fill" class="font-bold mt-1" />
                </button>
            </div> -->
            <div class="flex w-full items-center">
                <label for="sortIput" class="text-xs mr-1 flex-1 block">
                    Status:
                </label>
                <select
                    id="netAmount"
                    v-model="voucherStore.filter.value"
                    class="bg-gray-50 border h-6 border-gray-300 text-gray-900 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 py-1 px-2 text-xs"
                >
                    <option value="">
                        All
                    </option>
                    <option value="draft">
                        Draft
                    </option>
                    <option value="pending">
                        Pending
                    </option>
                    <option value="approved">
                        Approved
                    </option>
                    <option value="rejected">
                        Rejected
                    </option>
                    <option value="void">
                        Void
                    </option>
                </select>
                <!-- <select
                    id="netAmount"
                    class="bg-gray-50 border h-6 border-gray-300 text-gray-900 rounded-r-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 py-1 px-2 text-xs"
                >
                    <option value="status">
                        Open
                    </option>
                </select> -->
            </div>
        </div>
        <div class="pb-2 text-gray-500 w-full">
            <span v-if="voucherList.length === 0" class="text-sm text-center block py-8 pb-72 bg-gray-100 w-full">
                List is empty.
            </span>
            <table v-else class="table-auto w-full border-collapse text-sm">
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
                            Status
                        </th>
                        <th class="p-2 text-sm">
                            Amount
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="voucher, i in voucherList" :key="i" class="border text-left hover:bg-gray-200 hover: text-black" :class="voucher.id === voucherStore.voucher.id ? 'selectedVoucher' : ''">
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
                            {{ voucher.status }}
                        </td>
                        <td class="p-2">
                            {{ useUtilities().value.formatCurrency(voucher.net_amount) }}
                        </td>
                        <td class="p-2">
                            <Icon
                                name="material-symbols:visibility-rounded"
                                color="white"
                                class="bg-green-500 hover:bg-green-600 active:bg-green-700 rounded h-8 w-8 p-1 cursor-pointer"
                                @click="navigate('/accounting/voucher/disbursement?details=' + voucher.id, 'view-details', voucher)"
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>
    .selectedVoucher {
        background-color: #b2d8d8;
        color: black!important
    }
    #listTable tbody tr td, #listTable thead th {
        text-align: left!important;
    }
</style>
