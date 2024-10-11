<script setup>
import { storeToRefs } from "pinia"
import { useVoucherStore } from "~/stores/accounting/voucher"

const voucherStore = useVoucherStore()
const { getParams, pagination, errorMessage, successMessage } = storeToRefs(voucherStore)

const changePaginate = (newParams) => {
    getParams.value.page = newParams.page ?? ""
}

// const setEdit = (voucher) => {
//     voucherStore.voucher = voucher
//     return navigateTo("/accounting/voucher/disbursement/edit?id=" + voucher.voucher_no)
// }

</script>
<template>
    <div class="flex flex-col items-end gap-4">
        <div class="flex items-center justify-end gap-4 w-full">
            <NuxtLink
                to="/accounting/voucher/disbursement/create"
                class="w-48 text-white p-2 rounded bg-teal-600 content-center text-center px-4 flex items-center hover:bg-teal-700 active:bg-teal-600"
            >
                <Icon name="fa:plus-circle" class="mr-2 mt-[3px]" />
                <span>New Voucher</span>
            </NuxtLink>
        </div>
        <LayoutBoards title="List of Vouchers" class="w-full" :loading="voucherStore.isLoading">
            <div class="pb-2 text-gray-500">
                <table class="table-auto w-full border-collapse">
                    <thead>
                        <tr class="text-left">
                            <th class="p-2 ">
                                Voucher No.
                            </th>
                            <th class="p-2">
                                Date Created
                            </th>
                            <th class="p-2">
                                Payee
                            </th>
                            <th class="p-2">
                                Amount
                            </th>
                            <th />
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
                                {{ voucher.payee }}
                            </td>
                            <td class="p-2">
                                {{ useUtilities().value.formatCurrency(voucher.net_amount) }}
                            </td>
                            <NuxtLink :to="'/accounting/voucher/disbursement/details?id=' + voucher.voucher_no" @click="voucherStore.voucher = voucher">
                                <Icon name="material-symbols:visibility-rounded" color="white" class="bg-green-500 rounded h-8 w-8 p-1 " />
                            </NuxtLink>
                            <!-- <td class="text-right">
                                <button @click="setEdit(voucher)">
                                    <Icon name="material-symbols:edit" color="white" class="bg-green-400 rounded h-8 w-8 p-1" />
                                </button>
                            </td> -->
                        </tr>
                    </tbody>
                </table>
                <!-- <LayoutPsTable
                    id="listTable"
                    :header-columns="headers"
                    :datas="voucherStore.list"
                    :actions="actions"
                    @edit-row="setEdit"
                    @delete-row="deleteType"
                /> -->
                <!-- <i v-if="!voucherStore.list.length&&!voucherStore.isLoading" class="p-4 text-center block">No data available.</i> -->
            </div>
            <div class="flex justify-center mx-auto">
                <CustomPagination
                    v-if="voucherStore.list.length"
                    :links="pagination"
                    @change-params="changePaginate"
                />
            </div>
            <p hidden class="error-message text-red-600 text-center font-semibold mt-2 italic" :class="{ 'fade-out': !errorMessage }">
                {{ errorMessage }}
            </p>
            <p
                v-show="successMessage"
                hidden
                class="success-message text-green-600 text-center font-semibold italic"
            >
                {{ successMessage }}
            </p>
        </LayoutBoards>
    </div>
</template>

<style scoped>
    #listTable tbody tr td, #listTable thead th {
        text-align: left!important;
    }
</style>
