<script setup>
defineProps({
    receivedData: {
        type: Object,
        required: true
    }
})

</script>
<template>
    <div class="flex flex-col gap-4 mt-5 py-4 border-t border-dashed border-gray-950">
        <h1>
            CASH RECEIPT
        </h1>
        <div class="flex gap-2 justify-between">
            <div class="text-left">
                <p class="text-xs italic">
                    Receipt No.:
                </p>
                <p class="py-4">
                    {{ receivedData.receipt_no }}
                </p>
            </div>
            <div class="text-center">
                <p class="text-xs italic">
                    Received By:
                </p>
                <p class="py-4">
                    {{ receivedData.received_by }}
                </p>
            </div>
            <div class="text-right">
                <p class="text-xs italic">
                    Received Date:
                </p>
                <p class="py-4">
                    {{ receivedData.received_date }}
                </p>
            </div>
        </div>
    </div>
</template>
