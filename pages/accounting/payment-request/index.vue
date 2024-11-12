<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.ACCOUNTING_REQUEST_NON_PURCHASE_ORDER,
        ])"
    >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <AccountingPaymentrequestCreate v-if="action==='create'" />
                <AccountingPaymentrequestEdit v-if="action==='edit'" @view-details="receiveAction('view')" />
                <AccountingPaymentrequestDetails v-if="action==='view'" @edit="receiveAction('edit')" @create="receiveAction('create')" />
            </div>
            <HrmsCommonTabsMainContainer>
                <template #tab-titles>
                    <HrmsCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.ACCOUNTING_REQUEST_NON_PURCHASE_ORDER,
                        ])"
                        title="All List"
                        target-id="allList"
                    />
                    <HrmsCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.ACCOUNTING_REQUEST_NON_PURCHASE_ORDER,
                        ])"
                        title="My Approvals"
                        target-id="myApprovals"
                    />
                </template>
                <template #tab-containers>
                    <HrmsCommonTabsTabContainer id="allList">
                        <AccountingPaymentrequestList @view-details="receiveAction('view')" />
                    </HrmsCommonTabsTabContainer>
                    <HrmsCommonTabsTabContainer id="myApprovals">
                        <span class="block text-center text-gray-300">No approvals yet.</span>
                    </HrmsCommonTabsTabContainer>
                </template>
            </HrmsCommonTabsMainContainer>
        </div>
    </LayoutAcessContainer>
</template>

<script lang="ts" setup>

import { useStakeholderStore } from "~/stores/accounting/stakeholder"
import { usePaymentRequestStore } from "~/stores/accounting/paymentrequest"

const action = ref("create")
const paymentRequestStore = usePaymentRequestStore()
paymentRequestStore.params.status = "pending"
paymentRequestStore.getPaymentRequests()

const stakeholderStore = useStakeholderStore()
stakeholderStore.getStakeholders()

if (useRoute().query.details) {
    const id = useRoute().query.details
    action.value = "view"
    paymentRequestStore.getPaymentRequest(id)
}

if (useRoute().query.edit) {
    const id = useRoute().query.edit
    action.value = "edit"
    paymentRequestStore.getPaymentRequest(id)
}

const receiveAction = (ac) => {
    action.value = ac
}

</script>
