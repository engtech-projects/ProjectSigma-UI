<script setup>

defineProps({
    type: {
        type: String,
        required: false,
        default: "info"
    },
    entryData: {
        type: Object,
        required: false,
        default: null
    },
    fillable: {
        type: Boolean,
        required: false,
        default: false
    }
})

const showModal = defineModel("showModal", { required: false, type: Boolean })
</script>

<template>
    <PsModal v-model:show-modal="showModal" :is-loading="boardLoading" title="">
        <template #body>
            <div class="grid gap-2 md:justify-between">
                <div class="p-2 flex gap-2">
                    <span class="text-gray-900 text-4xl">Journal Entry ({{ type }})</span>
                </div>
            </div>
            <div class="grid md:grid-cols-3 gap-2 md:justify-between">
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light">Journal No.: </span>
                    <span class="text-gray-900">{{ entryData?.journal_no }}</span>
                </div>
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light">Reference No.: </span>
                    {{ entryData?.reference_no }}
                </div>
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light">Status: </span>
                    {{ entryData?.status }}
                </div>
            </div>
            <div class="grid md:grid-cols-3 gap-2 md:justify-between">
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light">Created by: </span>
                    {{ entryData?.created_by_user ?? "-" }}
                </div>
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light">Journal Date: </span>
                    {{ entryData?.date_filed }}
                </div>
            </div>
            <div class="grid md:grid-cols-3 gap-2 md:justify-between">
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light">Description: </span>
                    {{ entryData?.payment_request?.description }}
                </div>
            </div>
            <div class="p-2 border border-gray-200 rounded-lg">
                <h2 class="text-xl text-gray-800 tex-center font-bold p-2">
                    Journal Entry Details
                </h2>
                <div class="overflow-x-auto">
                    <div class="min-w-full overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg">
                        <table class="min-w-full divide-y border border-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th scope="col" class="px-6 text-bold py-3 text-left text-xs font-medium text-gray-950 uppercase tracking-wider">
                                        CODE
                                    </th>
                                    <th scope="col" class="px-6 text-bold py-3 text-left text-xs font-medium text-gray-950 uppercase tracking-wider">
                                        REFERRENCE SERIES
                                    </th>
                                    <th scope="col" class="px-6 text-bold py-3 text-left text-xs font-medium text-gray-950 uppercase tracking-wider">
                                        REFERRENCE NO
                                    </th>
                                    <th scope="col" class="px-6 text-bold py-3 text-left text-xs font-medium text-gray-950 uppercase tracking-wider">
                                        VOUCHER DATE
                                    </th>
                                    <th scope="col" class="px-6 text-bold py-3 text-left text-xs font-medium text-gray-950 uppercase tracking-wider">
                                        PO NUMBER
                                    </th>
                                    <th scope="col" class="px-6 text-bold py-3 text-left text-xs font-medium text-gray-950 uppercase tracking-wider">
                                        TERMS
                                    </th>
                                    <th scope="col" class="px-6 text-bold py-3 text-left text-xs font-medium text-gray-950 uppercase tracking-wider">
                                        SUPPLIER'S NAME
                                    </th>
                                    <th scope="col" class="px-6 text-bold py-3 text-left text-xs font-medium text-gray-950 uppercase tracking-wider">
                                        PAYEES NAME
                                    </th>
                                    <th scope="col" class="px-6 text-bold py-3 text-left text-xs font-medium text-gray-950 uppercase tracking-wider">
                                        PROJECT CODE
                                    </th>
                                    <th scope="col" class="px-6 text-bold py-3 text-left text-xs font-medium text-gray-950 uppercase tracking-wider">
                                        LOCATION
                                    </th>
                                    <th scope="col" class="px-6 text-bold py-3 text-left text-xs font-medium text-gray-950 uppercase tracking-wider">
                                        MANAGER / LEAD
                                    </th>
                                    <th scope="col" class="px-6 text-bold py-3 text-left text-xs font-medium text-gray-950 uppercase tracking-wider">
                                        ACCOUNT CODE
                                    </th>
                                    <th scope="col" class="px-6 text-bold py-3 text-left text-xs font-medium text-gray-950 uppercase tracking-wider">
                                        ACCOUNT NAME
                                    </th>
                                    <th scope="col" class="px-6 text-bold py-3 text-left text-xs font-medium text-gray-950 uppercase tracking-wider">
                                        MAIN ACCOUNT GROUP
                                    </th>
                                    <th scope="col" class="px-6 text-bold py-3 text-left text-xs font-medium text-gray-950 uppercase tracking-wider">
                                        ACCOUNT GROUP
                                    </th>
                                    <th scope="col" class="px-6 text-bold py-3 text-left text-xs font-medium text-gray-950 uppercase tracking-wider">
                                        SUB ACCOUNT GROUP
                                    </th>
                                    <th scope="col" class="px-6 text-bold py-3 text-left text-xs font-medium text-gray-950 uppercase tracking-wider">
                                        REPORT GROUP
                                    </th>
                                    <th scope="col" class="px-6 text-bold py-3 text-left text-xs font-medium text-gray-950 uppercase tracking-wider">
                                        DEBIT
                                    </th>
                                    <th scope="col" class="px-6 text-bold py-3 text-left text-xs font-medium text-gray-950 uppercase tracking-wider">
                                        CREDIT
                                    </th>
                                    <th scope="col" class="px-6 text-bold py-3 text-left text-xs font-medium text-gray-950 uppercase tracking-wider">
                                        NET AMOUNT
                                    </th>
                                    <th scope="col" class="px-6 text-bold py-3 text-left text-xs font-medium text-gray-950 uppercase tracking-wider">
                                        PARTICULARS
                                    </th>
                                    <th scope="col" class="px-6 text-bold py-3 text-left text-xs font-medium text-gray-950 uppercase tracking-wider">
                                        STATUS
                                    </th>
                                    <th scope="col" class="px-6 text-bold py-3 text-left text-xs font-medium text-gray-950 uppercase tracking-wider">
                                        REMARKS
                                    </th>
                                    <th scope="col" class="px-6 text-bold py-3 text-left text-xs font-medium text-gray-950 uppercase tracking-wider">
                                        EQUIPMENT NO./CODE
                                    </th>
                                    <th scope="col" class="px-6 text-bold py-3 text-left text-xs font-medium text-gray-950 uppercase tracking-wider">
                                        BALANCE
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr v-for="(detail, i) in entryData?.details" :key="detail.id">
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm text-gray-700">
                                            {{ detail?.journal_type ?? "-" }}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm text-gray-700">
                                            {{ detail?.reference_series ?? "-" }}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm text-gray-700">
                                            {{ detail?.reference_no ?? "-" }}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm text-gray-700">
                                            {{ detail?.voucher_date ?? "-" }}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm text-gray-700">
                                            {{ detail?.po_number ?? "-" }}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm text-gray-700">
                                            {{ detail?.terms ?? "-" }}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm text-gray-700">
                                            {{ detail?.supplier_name ?? "-" }}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm text-gray-700">
                                            {{ detail?.payees_name ?? "-" }}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm text-gray-700">
                                            {{ detail?.project_department_name ?? "-" }}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm text-gray-700">
                                            {{ detail?.location ?? "-" }}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm text-gray-700">
                                            {{ detail?.manager ?? "-" }}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm text-gray-700">
                                            {{ detail?.account?.account_number ?? "-" }}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm text-gray-700">
                                            {{ detail?.account?.account_name ?? "-" }}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm text-gray-700">
                                            {{ detail?.account?.account_type?.account_category ?? "-" }}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm text-gray-700">
                                            {{ detail?.account?.account_type?.account_type ?? "-" }}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm text-gray-700">
                                            {{ detail?.account?.sub_account_group ?? "-" }}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm text-gray-700">
                                            {{ detail?.account?.report_group?.name ?? "-" }}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm text-gray-700">
                                            {{ useFormatCurrency(detail?.debit) ?? "-" }}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm text-gray-700">
                                            {{ useFormatCurrency(detail?.credit) ?? "-" }}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div v-if="i === 0" class="text-sm text-gray-700">
                                            {{ useFormatCurrency(detail?.net_amount) ?? "-" }}
                                        </div>
                                        <div v-else class="text-sm text-gray-700">
                                            -
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm text-gray-700">
                                            {{ detail?.particulars ?? "-" }}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div v-if="i === 0" class="text-sm text-gray-700">
                                            {{ detail?.status ?? "-" }}
                                        </div>
                                        <div v-else class="text-sm text-gray-700">
                                            -
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm text-gray-700">
                                            {{ detail?.remarks ?? "-" }}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm text-gray-700">
                                            {{ detail?.particular_group ?? "-" }}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm text-gray-700">
                                            {{ detail?.balance ?? "-" }}
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </template>
    </PsModal>
</template>
