<script setup>
import { useProcurementRequestStore } from "~/stores/inventory/procurement/request"

useHead({
    title: "PROCUREMENT REQUESTS",
})

const procurementRequestStore = useProcurementRequestStore()
const { viewRequests } = storeToRefs(procurementRequestStore)

const route = useRoute()
const router = useRouter()

const priceQuotationData = ref({})

const populateFormWithRequestDetails = () => {
    if (viewRequests.value?.details?.requisition_slip) {
        const requestDetails = viewRequests.value.details.requisition_slip
        const commonData = {
            id: route.query.id,
            date: new Date().toISOString().split("T")[0],
            items: requestDetails.request_stock_items || [],
        }
        priceQuotationData.value = { ...priceQuotationData.value, ...commonData }
    }
}

watch(
    () => viewRequests.value?.details,
    (newDetails) => {
        if (newDetails?.requisition_slip) {
            populateFormWithRequestDetails()
        }
    },
    { deep: true }
)

const currentForm = ref(null)
onMounted(() => {
    if (route.query.pr_id) {
        procurementRequestStore.getOne(route.query.pr_id)
        showInformation({ id: route.query.pr_id })
    }
    if (route.query.pq_id) {
        procurementRequestStore.getPriceQuotation(route.query.pq_id)
    } else {
        currentForm.value = "priceQuotation"
    }
})
const prId = ref(route.query.pr_id || null)
const createPq = ref(false)
const pqId = ref(false)
const createCs = ref(false)
const csId = ref(false)
const createNcpo = ref(false)
const ncpoId = ref(false)

watch(() => route.query.pr_id, (newVal) => {
    prId.value = newVal
    if (newVal) {
        procurementRequestStore.getOne(prId)
    }
})
const closePrDetails = () => {
    router.replace({ query: { ...route.query, pr_id: undefined } })
    prId.value = null
}
const closeCreatePq = () => {
    createPq.value = false
}
const closeEditPq = () => {
    router.replace({ query: { ...route.query, pq_id: undefined } })
    pqId.value = null
}
const closeCreateCs = () => {
    createCs.value = false
}
const closeEditCs = () => {
    router.replace({ query: { ...route.query, cs_id: undefined } })
    csId.value = null
}
const closeCreateNcpo = () => {
    createNcpo.value = false
}
const closeEditNcpo = () => {
    router.replace({ query: { ...route.query, ncpo_id: undefined } })
    ncpoId.value = null
}
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.INVENTORY_PROCUREMENT_PROCUREMENTREQUESTS_GROUP,
        ])"
        class="w-full"
    >
        <div id="showOnlyOneChild" class="flex flex-col md:flex-cols gap-4 [&>*]:hidden [&>:last-child]:block">
            <div class="border border-gray-300 flex-1 rounded-md p-4 bg-white">
                <InventoryProcurementRequestMainLists
                    class="rounded-md shadow-sm"
                />
            </div>
            <LayoutBoards
                v-if="prId"
                title="Procurement Request Details"
            >
                <template #header-options>
                    <button class="text-gray-500 hover:text-white hover:bg-red-600" @click="closePrDetails">
                        <Icon name="mdi:close" class="h-5 w-5" />
                    </button>
                </template>
                <template #default>
                    <InventoryProcurementRequestDetailsInfo />
                </template>
            </LayoutBoards>
            <LayoutBoards
                v-else-if="createPq"
                title="Create Price Quotation"
            >
                <template #header-options>
                    <button class="text-gray-500 hover:text-white hover:bg-red-600" @click="closeCreatePq">
                        <Icon name="mdi:close" class="h-5 w-5" />
                    </button>
                </template>
                <template #default>
                    <InventoryProcurementRequestCreatePriceQuotation
                        :pr-id="prId"
                        @close="closeCreatePq"
                    />
                </template>
            </LayoutBoards>
            <LayoutBoards
                v-else-if="!pqId"
                title="Procurement Request Details"
            >
                <template #header-options>
                    <button class="text-gray-500 hover:text-white hover:bg-red-600" @click="closeEditPq">
                        <Icon name="mdi:close" class="h-5 w-5" />
                    </button>
                </template>
                <template #default>
                    EDIT PRICE QUOTATION HERE
                </template>
            </LayoutBoards>
            <LayoutBoards
                v-else-if="createCs"
                title="Create Canvass Summary"
            >
                <template #header-options>
                    <button class="text-gray-500 hover:text-white hover:bg-red-600" @click="closeCreateCs">
                        <Icon name="mdi:close" class="h-5 w-5" />
                    </button>
                </template>
                <template #default>
                    <InventoryCanvassSummaryForm
                        v-model="canvassSummaryForm"
                        :request-details="requestDetails"
                        title="CANVASS SUMMARY"
                    />
                </template>
            </LayoutBoards>
            <LayoutBoards
                v-else-if="csId"
                title="Create Canvass Summary"
            >
                <template #header-options>
                    <button class="text-gray-500 hover:text-white hover:bg-red-600" @click="closeEditCs">
                        <Icon name="mdi:close" class="h-5 w-5" />
                    </button>
                </template>
                <template #default>
                    VIEW CANVASS SUMMARY HERE
                </template>
            </LayoutBoards>
            <LayoutBoards
                v-else-if="createNcpo"
                title="Create Canvass Summary"
                loading
            >
                <template #header-options>
                    <button class="text-gray-500 hover:text-white hover:bg-red-600" @click="closeCreateNcpo">
                        <Icon name="mdi:close" class="h-5 w-5" />
                    </button>
                </template>
                <template #default>
                    CREATE NCPO FORM HERE
                </template>
            </LayoutBoards>
            <LayoutBoards
                v-else-if="ncpoId"
                title="Create Canvass Summary"
                loading
            >
                <template #header-options>
                    <button class="text-gray-500 hover:text-white hover:bg-red-600" @click="closeEditNcpo">
                        <Icon name="mdi:close" class="h-5 w-5" />
                    </button>
                </template>
                <template #default>
                    NCPO VIEW HERE
                </template>
            </LayoutBoards>
        </div>
    </LayoutAcessContainer>
</template>
