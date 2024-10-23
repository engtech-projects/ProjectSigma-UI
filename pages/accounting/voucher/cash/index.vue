<template>
<<<<<<< HEAD
    <div class="bg-gray-50">
        <AccountingVoucherCashList />
    </div>
=======
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.accounting_journal_group,
        ])"
    >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <AccountingVoucherCashCreate v-if="action==='create'" />
                <AccountingVoucherCashDetails v-if="action==='view'" />
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
                    <HrmsCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.accounting_journal_group,
                        ])"
                        title="My Request"
                        target-id="myRequests"
                    />
                </template>
                <template #tab-containers>
                    <HrmsCommonTabsTabContainer id="allList">
                        <AccountingVoucherCashList @view-details="receiveAction('view')" />
                    </HrmsCommonTabsTabContainer>
                    <HrmsCommonTabsTabContainer id="myApprovals">
                        <span class="block text-center text-gray-300">No approvals yet.</span>
                    </HrmsCommonTabsTabContainer>
                    <HrmsCommonTabsTabContainer id="myRequests">
                        <span class="block text-center text-gray-300">No requests yet.</span>
                    </HrmsCommonTabsTabContainer>
                </template>
            </HrmsCommonTabsMainContainer>
        </div>
    </LayoutAcessContainer>
>>>>>>> 75722efe (Voucher ui revamp with fx)
</template>

<script lang="ts" setup>

import { useVoucherStore } from "~/stores/accounting/voucher"

const voucherStore = useVoucherStore()
voucherStore.getVouchers()

<<<<<<< HEAD
=======
const accountStore = useAccountStore()
accountStore.getAccounts()

const stakeholderStore = useStakeholderStore()
stakeholderStore.getStakeholders()

const bookStore = useBookStore()
await bookStore.getBooks()

const accountGroup = useAccountGroupStore()
accountGroup.showAccountGroup(bookStore.disbursement.id)

const action = ref("create")
const receiveAction = (ac) => {
    action.value = ac
}

>>>>>>> 75722efe (Voucher ui revamp with fx)
</script>
