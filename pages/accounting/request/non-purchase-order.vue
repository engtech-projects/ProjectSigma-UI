<script setup>
// import { useStakeHolderStore } from "~/stores/accounting/stakeholders/stakeholder"
// import { usePaymentRequestStore } from "~/stores/accounting/requests/paymentrequest"

// const action = ref("create")
// const paymentRequestStore = usePaymentRequestStore()
// paymentRequestStore.params.status = ""
// paymentRequestStore.getPaymentRequests()
// paymentRequestStore.getVat()

// const stakeholderStore = useStakeHolderStore()
// stakeholderStore.getStakeholders()

// if (useRoute().query.details) {
//     const id = useRoute().query.details
//     action.value = "view"
//     paymentRequestStore.getPaymentRequest(id)
// }

// if (useRoute().query.edit) {
//     const id = useRoute().query.edit
//     action.value = "edit"
//     paymentRequestStore.getPaymentRequest(id)
// }

// const receiveAction = (ac) => {
//     action.value = ac
// }
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.ACCOUNTING_REQUEST_NON_PURCHASE_ORDER,
        ])"
    >
        <div class="flex flex-col gap-4">
            <div class="w-full">
                <AccountingNonPurchaseRequestForm />
            </div>
            <AccountingCommonTabsMainContainer class="w-full">
                <template #tab-titles>
                    <AccountingCommonTabsTabTitle
                        title="All List"
                        target-id="allList"
                    />
                    <AccountingCommonTabsTabTitle
                        title="My Requests"
                        target-id="myRequests"
                    />
                    <AccountingCommonTabsTabTitle
                        title="My Approvals"
                        target-id="myApprovals"
                    />
                </template>
                <template #tab-containers>
                    <AccountingCommonTabsTabContainer id="allList">
                        <AccountingNonPurchaseRequestAllList />
                    </AccountingCommonTabsTabContainer>
                    <AccountingCommonTabsTabContainer id="myRequests">
                        <AccountingNonPurchaseRequestMyRequestList />
                    </AccountingCommonTabsTabContainer>
                    <AccountingCommonTabsTabContainer id="myApprovals">
                        <AccountingNonPurchaseRequestApprovalList />
                    </AccountingCommonTabsTabContainer>
                </template>
            </AccountingCommonTabsMainContainer>
        </div>
    </LayoutAcessContainer>
</template>
