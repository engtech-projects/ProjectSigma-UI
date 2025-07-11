<template>
    <div
        v-if="isVisible && (currentForm === 'priceQuotation' || currentForm === 'canvassSummary')"
        class="border border-gray-300 flex-1 rounded-md p-4 bg-white"
    >
        <div class="flex justify-end">
            <button
                class="text-gray-500 hover:text-white hover:bg-red-600"
                @click="onClose"
            >
                <Icon name="mdi:close" class="h-5 w-5" />
            </button>
        </div>

        <PrintTableFormat>
            <InventoryPriceQuotationForm
                v-if="currentForm === 'priceQuotation'"
                v-model="priceQuotationForm"
                :request-details="requestDetails"
                title="REQUEST FOR PRICE QUOTATION"
                @submit-success="$emit('submit-success')"
            />
            <InventoryPriceQuotationFormEdit
                v-else-if="currentForm === 'priceQuotationEdit'"
                v-model="priceQuotationFormEdit"
                :request-details="requestDetails"
                title="REQUEST FOR PRICE QUOTATION"
                @submit-success="$emit('submit-success')"
            />
            <InventoryCanvassSummaryForm
                v-else
                v-model="canvassSummaryForm"
                :request-details="requestDetails"
                title="CANVASS SUMMARY"
            />
        </PrintTableFormat>
    </div>
</template>

<script setup>
defineEmits(["submit-success"])
defineProps({
    isVisible: Boolean,
    currentForm: {
        type: String,
        default: ""
    },
    form: {
        type: Object,
        default: () => ({})
    },
    onClose: {
        type: Function,
        default: () => {}
    }
})

const priceQuotationForm = defineModel("priceQuotationForm", {
    required: true,
    type: Object
})
const priceQuotationFormEdit = defineModel("priceQuotationFormEdit", {
    required: true,
    type: Object
})

const canvassSummaryForm = defineModel("canvassSummaryForm", {
    required: true,
    type: Object
})
</script>
