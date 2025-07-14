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

onMounted(() => {
    if (route.query.pr_id) {
        procurementRequestStore.getOne(route.query.pr_id)
    }
    if (route.query.pq_id) {
        procurementRequestStore.getPriceQuotationDetails(route.query.pq_id)
    }
})
const prId = computed(() => route.query.pr_id || null)
const createPq = computed(() => !!route.query.create_pq)
const pqId = computed(() => route.query.pq_id || null)
const createCs = computed(() => !!route.query.create_cs)
const csId = computed(() => route.query.cs_id || null)
const createNcpo = computed(() => !!route.query.create_ncpo)
const ncpoId = computed(() => route.query.ncpo_id || null)

watch(prId, (newVal) => {
    if (newVal) {
        procurementRequestStore.getOne(newVal)
    }
})
watch(pqId, (newVal) => {
    if (newVal) {
        procurementRequestStore.getPriceQuotationDetails(newVal)
    }
})
watch(csId, (newVal) => {
    if (newVal) {
        // eslint-disable-next-line no-console
        console.log("Fetching Canvass Summary details for CS ID:", newVal)
    }
})
watch(ncpoId, (newVal) => {
    if (newVal) {
        // eslint-disable-next-line no-console
        console.log("Fetching NCPO details for NCPO ID:", newVal)
    }
})
const closePrDetails = () => {
    router.replace({ query: { ...route.query, pr_id: undefined } })
    prId.value = null
}
const closeCreatePq = () => {
    router.replace({ query: { ...route.query, create_pq: undefined } })
    createPq.value = false
}
const closeEditPq = () => {
    router.replace({ query: { ...route.query, pq_id: undefined } })
    pqId.value = null
}
const closeCreateCs = () => {
    router.replace({ query: { ...route.query, create_cs: undefined } })
    createCs.value = false
}
const closeEditCs = () => {
    router.replace({ query: { ...route.query, cs_id: undefined } })
    csId.value = null
}
const closeCreateNcpo = () => {
    router.replace({ query: { ...route.query, create_ncpo: undefined } })
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
        <!-- [&>*]:hidden [&>:last-child]:block -->
        <div id="showOnlyOneChild" class="flex flex-col md:flex-cols gap-4 [&>*]:hidden [&>:last-child]:block">
            <LayoutBoards
                title="Procurement Requests"
            >
                <InventoryProcurementRequestMainLists
                    class="rounded-md shadow-sm"
                />
            </LayoutBoards>
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
                v-if="createPq"
                title="Create Price Quotation"
            >
                <template #header-options>
                    <button class="text-gray-500 hover:text-white hover:bg-red-600" @click="closeCreatePq">
                        <Icon name="mdi:close" class="h-5 w-5" />
                    </button>
                </template>
                <template #default>
                    <InventoryPriceQuotationForm
                        :pr-id="prId"
                        @submit-success="closeCreatePq"
                    />
                </template>
            </LayoutBoards>
            <LayoutBoards
                v-if="pqId"
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
                v-if="createCs"
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
                v-if="csId"
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
                v-if="createNcpo"
                title="Create Canvass Summary"
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
                v-if="ncpoId"
                title="Create Canvass Summary"
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
