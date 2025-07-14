<template>
    <div>
        <h2 class="text-lg font-semibold text-center mb-4">
            {{ title }}
        </h2>
        <div class="grid grid-cols-2 gap-4 justify-center items-center mt-4 p-4">
            <div class="flex flex-col gap-1">
                <InventoryCommonFormPsFormLabel title="Request For" :value="requestFor" />
                <InventoryCommonFormPsFormLabel title="Office/Project" :value="officeProject" />
                <InventoryCommonFormPsFormLabel title="Address" :value="address" />
            </div>
            <div class="flex flex-col gap-1">
                <InventoryCommonFormPsFormLabel title="Reference No." :value="referenceNo" />
                <InventoryCommonFormPsFormLabel title="Date Prepared" :value="datePrepared" />
                <InventoryCommonFormPsFormLabel title="Date Needed" :value="dateNeeded" />
                <InventoryCommonFormPsFormLabel title="Equipment No." :value="equipmentNo" />
            </div>
        </div>

        <InventoryCommonCanvasserSelector />

        <LayoutPsTable
            :header-columns="rsInfoHeaders"
            :datas="itemsWithQuotationCount"
            :clickable-rows="false"
            class="rounded-md shadow-sm text-md font-medium"
        />
    </div>
</template>

<script setup>
const itemsWithQuotationCount = computed(() => {
    return props.items.map(item => ({
        ...item,
        price_quotation_count: props.priceQuotationCount
    }))
})

const props = defineProps({
    title: {
        type: String,
        default: ""
    },
    requestFor: {
        type: String,
        default: "N/A"
    },
    officeProject: {
        type: String,
        default: "N/A"
    },
    address: {
        type: String,
        default: "N/A"
    },
    referenceNo: {
        type: String,
        default: "N/A"
    },
    datePrepared: {
        type: String,
        default: "N/A"
    },
    dateNeeded: {
        type: String,
        default: "N/A"
    },
    equipmentNo: {
        type: String,
        default: "N/A"
    },
    rsInfoHeaders: {
        type: Array,
        required: true
    },
    items: {
        type: Array,
        default: () => []
    },
    priceQuotationCount: {
        type: Number,
        default: 0
    }
})
</script>
