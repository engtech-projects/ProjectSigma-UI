<script lang="ts" setup>
// import { useRoute } from "vue-router"
import { useSupplierStore } from "@/stores/inventory/suppliers"
useHead({
    title: "NCPO",
})
// const route = useRoute()
const mainStore = useSupplierStore()
const { createRequest } = storeToRefs(mainStore)
const validKey = ref(true)
// if (route.query.key) {
//     validKey.value = true
// } else {
//     validKey.value = false
// }
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([AccessibilityTypes.INVENTORY_PROCUREMENT_NOTICEOFCHANGEPURCHASEORDER_GROUP,
        ])"
        class="w-full"
    >
        <!-- <HrmsCommonTabsMainContainer>
            <template #tab-titles>
                <HrmsCommonTabsTabTitle
                    v-if="useCheckAccessibility([AccessibilityTypes.INVENTORY_PROCUREMENT_NOTICEOFCHANGEPURCHASEORDER_ALLREQUEST])"
                    target-id="allRequest"
                    title="All Request"
                />
                <HrmsCommonTabsTabTitle
                    v-if="useCheckAccessibility([AccessibilityTypes.INVENTORY_PROCUREMENT_NOTICEOFCHANGEPURCHASEORDER_MYAPPROVALS])"
                    target-id="myApprovals"
                    title="My Approvals"
                />
                <HrmsCommonTabsTabTitle
                    v-if="useCheckAccessibility([AccessibilityTypes.INVENTORY_PROCUREMENT_NOTICEOFCHANGEPURCHASEORDER_FORMSANDMYREQUESTS])"
                    target-id="myRequests"
                    title="My Request"
                />
            </template>
            <template #tab-containers>
                <HrmsCommonTabsTabContainer id="allRequest">
                    <InventoryNoticeOfChangePORequestAllRequests />
                </HrmsCommonTabsTabContainer>
                <HrmsCommonTabsTabContainer id="myApprovals">
                    <InventoryNoticeOfChangePORequestMyApprovals />
                </HrmsCommonTabsTabContainer>
                <HrmsCommonTabsTabContainer id="myRequests">
                    <InventoryNoticeOfChangePORequestMyRequests />
                </HrmsCommonTabsTabContainer>
            </template>
        </HrmsCommonTabsMainContainer> -->
        <LayoutBoards title="" class="w-full" :loading="createRequest.isLoading">
            <template v-if="validKey">
                <InventoryNoticeOfChangePOItemForm
                    id="listTable"
                    title="PURCHASE ORDER"
                />
                />
            </template>
            <template v-else>
                <div class="grid grid-cols-1 gap-4">
                    <h2> 404 NOT FOUND</h2>
                </div>
            </template>
        </LayoutBoards>
    </LayoutAcessContainer>
</template>
