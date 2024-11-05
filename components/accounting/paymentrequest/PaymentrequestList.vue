<script setup>
import { usePaymentRequestStore } from "~/stores/accounting/paymentrequest"
import { useStakeholderStore } from "~/stores/accounting/stakeholder"

const paymentRequestStore = usePaymentRequestStore()
const stakeholderStore = useStakeholderStore()
const emit = defineEmits(["view-details", "voucher"])
const props = defineProps({
    target: {
        type: String,
        default: ""
    },
    showFilter: {
        type: Boolean,
        default: true
    }
})

const stakeholder = (id) => {
    return stakeholderStore.list.filter(st => st.id === id)[0]
}

const navigate = (url = "", action = "", pr = null) => {
    history.pushState(null, "", url)
    emit(action)
    if (pr) {
        // paymentRequestStore.paymentRequest = pr
        paymentRequestStore.getPaymentRequest(pr.id)
    }
}
const forVouchering = computed(() => {
    return paymentRequestStore.list.filter(pr => pr.form?.status === "approved")
})
const changePaginate = (newParams) => {
    paymentRequestStore.params.page = newParams.page ?? ""
    paymentRequestStore.getPaymentRequests()
}

</script>
<template>
    <div class="pb-2 text-gray-500 select-none">
        <AccountingLoadScreen :is-loading="paymentRequestStore.isLoading.list" />
        <div v-if="props.showFilter" class="flex w-full items-center justify-end my-2">
            <label for="sortIput" class="text-xs mr-1 block">
                Status:
            </label>
            <select
                id="netAmount"
                v-model="paymentRequestStore.params.filter.status"
                class="bg-gray-50 border h-6 border-gray-300 text-gray-900 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 py-1 px-2 text-xs"
                @change="paymentRequestStore.getPaymentRequests"
            >
                <option value="">
                    All
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
                <option value="issued">
                    Issued
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
        <table id="prfTable" class="table-auto w-full border-collapse mb-8">
            <thead>
                <tr class="text-left !text-sm">
                    <th class="p-2 ">
                        PRF No.
                    </th>
                    <th class="p-2">
                        Date Created
                    </th>
                    <th class="p-2">
                        Payee
                    </th>
                    <th class="p-2">
                        Status
                    </th>
                    <th class="p-2">
                        Total Amount
                    </th>
                    <th />
                </tr>
            </thead>
            <tbody v-if="props.target!=='voucher'">
                <tr v-for="pr, i in paymentRequestStore.list" :key="i" class="border text-left hover:bg-gray-200 hover: !text-black !text-sm" :class="pr.id === paymentRequestStore.paymentRequest.id ? 'selectedItem' : ''">
                    <td class="p-2">
                        {{ pr.prf_no }}
                    </td>
                    <td class="p-2">
                        {{ useUtilities().value.dateToString(new Date(pr.request_date)) }}
                    </td>
                    <td class="p-2">
                        {{ stakeholder(pr.stakeholder_id)?.name }}
                    </td>
                    <td class="p-2">
                        {{ pr.form?.status }}
                    </td>
                    <td class="p-2">
                        {{ useUtilities().value.formatCurrency(pr.total) }}
                    </td>
                    <td class="text-right p-2">
                        <Icon
                            v-if="props.target === 'voucher'"
                            name="material-symbols:visibility-rounded"
                            color="white"
                            class="bg-green-500 hover:bg-green-600 active:bg-green-700 rounded h-8 w-8 p-1 cursor-pointer"
                            @click="emit('voucher', pr.id)"
                        />
                        <Icon
                            v-else
                            name="material-symbols:visibility-rounded"
                            color="white"
                            class="bg-green-500 hover:bg-green-600 active:bg-green-700 rounded h-8 w-8 p-1 cursor-pointer"
                            @click="navigate('/accounting/payment-request?details=' + pr.id, 'view-details', pr)"
                        />
                    </td>
                </tr>
            </tbody>
            <tbody v-else>
                <tr v-for="pr, i in forVouchering" :key="i" class="border text-left hover:bg-gray-200 hover: !text-black !text-sm" :class="pr.id === paymentRequestStore.paymentRequest.id ? 'selectedItem' : ''">
                    <td class="p-2">
                        {{ pr.prf_no }}
                    </td>
                    <td class="p-2">
                        {{ useUtilities().value.dateToString(new Date(pr.request_date)) }}
                    </td>
                    <td class="p-2">
                        {{ stakeholder(pr.stakeholder_id)?.name }}
                    </td>
                    <td class="p-2">
                        {{ pr.form?.status }}
                    </td>
                    <td class="p-2">
                        {{ useUtilities().value.formatCurrency(pr.total) }}
                    </td>
                    <td class="text-right p-2">
                        <Icon
                            v-if="props.target === 'voucher'"
                            name="material-symbols:visibility-rounded"
                            color="white"
                            class="bg-green-500 hover:bg-green-600 active:bg-green-700 rounded h-8 w-8 p-1 cursor-pointer"
                            @click="emit('voucher', pr.id)"
                        />
                        <Icon
                            v-else
                            name="material-symbols:visibility-rounded"
                            color="white"
                            class="bg-green-500 hover:bg-green-600 active:bg-green-700 rounded h-8 w-8 p-1 cursor-pointer"
                            @click="navigate('/accounting/payment-request?details=' + pr.id, 'view-details', pr)"
                        />
                    </td>
                </tr>
            </tbody>
        </table>
        <span v-if="paymentRequestStore.list.length === 0" class="w-full mb-8 text-center block">
            List is emtpy.
        </span>
        <span v-if="forVouchering.length === 0 && props.target==='voucher'" class="w-full mb-8 text-center block">
            List is emtpy.
        </span>
        <div class="flex justify-center mx-auto">
            <CustomPagination
                v-if="paymentRequestStore.list.length && props.target!=='voucher'"
                :links="paymentRequestStore.pagination"
                @change-params="changePaginate"
            />
        </div>
    </div>
</template>

<style scoped>
    .selectedItem {
        background-color: #b2d8d8;
        color: black!important
    }
    #listTable tbody tr td, #listTable thead th {
        text-align: left!important
    }
</style>
