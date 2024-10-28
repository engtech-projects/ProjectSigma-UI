<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.accounting_journal_group,
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
                            AccessibilityTypes.accounting_journal_group,
                        ])"
                        title="All List"
                        target-id="allList"
                    />
                    <HrmsCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.accounting_journal_group,
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
