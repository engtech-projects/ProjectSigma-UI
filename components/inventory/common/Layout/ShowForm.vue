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
                v-model="localForm"
                :request-details="requestDetails"
                title="REQUEST FOR PRICE QUOTATION"
            />
            <InventoryCanvassSummaryForm
                v-else-if="currentForm === 'canvassSummary'"
                v-model="localForm"
                :request-details="requestDetails"
                title="CANVASS SUMMARY"
            />
        </PrintTableFormat>
    </div>
</template>

<script setup>

const props = defineProps({
    isVisible: Boolean,
    currentForm: {
        type: String,
        default: ""
    },
    form: {
        type: Object,
        default: () => ({})
    },
    requestDetails: {
        type: Object,
        default: () => ({})
    },
    onClose: {
        type: Function,
        default: () => {}
    }
})

const emit = defineEmits(["update:form"])

const localForm = ref({ ...props.form })

watch(() => props.form, (newVal) => {
    localForm.value = { ...newVal }
})

watch(localForm, (val) => {
    emit("update:form", val)
}, { deep: true })
</script>
