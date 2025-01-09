<script setup>
import { useVoucherStore } from "@/stores/accounting/vouchers/voucher"
const voucher = useVoucherStore()
const { data: userData } = useAuth()
const snackbar = useSnackbar()
const props = defineProps({
    voucherId: {
        type: Number,
        required: true
    }
})

const received = async () => {
    try {
        voucher.cashReceivedForm.voucher_id = props.voucherId
        voucher.cashReceivedForm.received_by = userData.value.employee.fullname_last
        await voucher.cashReceived()
        snackbar.add({
            type: "success",
            text: voucher.value.successMessage
        })
    } catch {
        snackbar.add({
            type: "error",
            text: voucher.value.errorMessage
        })
    }
}
</script>
<template>
    <div class="flex flex-col gap-4 mt-5 py-4 border-t border-dashed border-gray-950">
        <h1>
            CASH RECEIPT FORM
        </h1>
        <Form @submit.prevent="received">
            <div class="grid grid-cols-1 gap-4">
                <div>
                    <label for="receipt_no" class="text-xs italic">Receipt No.:</label>
                    <input
                        id="receipt_no"
                        v-model="voucher.cashReceivedForm.receipt_no"
                        type="text"
                        class="w-full rounded-lg"
                        required
                    >
                </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label for="received_by" class="text-xs italic">Received By:</label>
                    <p class="py-4">
                        {{ userData.employee.fullname_last }}
                    </p>
                </div>
                <div>
                    <label for="received_date" class="text-xs italic">Received Date:</label>
                    <input
                        id="received_date"
                        v-model="voucher.cashReceivedForm.received_date"
                        type="date"
                        class="w-full rounded-lg"
                        required
                    >
                </div>
            </div>
            <div class="flex justify-end">
                <div>
                    <button type="submit" class="w-full text-white p-2 rounded bg-teal-600 content-center mt-5">
                        Received Cash
                    </button>
                </div>
            </div>
        </Form>
    </div>
</template>
