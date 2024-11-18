<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.accounting_journal_group,
        ])"
    >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <AccountingVoucherCashCreate v-if="action==='create'" @detach="prDetails=false" />
                <AccountingVoucherCashEdit v-if="action==='edit'" @view-details="receiveAction('view')" />
                <AccountingVoucherCashDetails v-if="action==='view'" @edit="receiveAction('edit')" @create="receiveAction('create')" />
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
                        title="For Vouchering"
                        target-id="forVouchering"
                    />
                </template>
                <template #tab-containers>
                    <HrmsCommonTabsTabContainer id="allList">
                        <AccountingVoucherCashList @view-details="receiveAction('view')" />
                    </HrmsCommonTabsTabContainer>
                    <HrmsCommonTabsTabContainer id="myApprovals">
                        <span class="block text-center text-gray-300">No approvals yet.</span>
                    </HrmsCommonTabsTabContainer>
                    <HrmsCommonTabsTabContainer id="forVouchering">
                        <AccountingVoucherDisbursementList target="cash" />
                    </HrmsCommonTabsTabContainer>
                </template>
            </HrmsCommonTabsMainContainer>
        </div>
    </LayoutAcessContainer>
</template>

<script lang="ts" setup>

import { useVoucherStore } from "~/stores/accounting/vouchers/voucher"
import { useAccountStore } from "~/stores/accounting/setup/account"
import { useStakeHolderStore } from "~/stores/accounting/stakeholders/stakeholder"
import { useBookStore } from "~/stores/accounting/setup/book"
import { useAccountGroupStore } from "~/stores/accounting/setup/accountgroups"

const voucherStore = useVoucherStore()
voucherStore.reset()
voucherStore.params.book = "cash"
voucherStore.params.status = "pending"
voucherStore.getVouchers()

voucherStore.vparams.book = "disbursement"
voucherStore.vparams.status = "approved"
voucherStore.getForVouchering()

const accountStore = useAccountStore()
accountStore.getAccounts()

const stakeholderStore = useStakeHolderStore()
stakeholderStore.getStakeholders()

const bookStore = useBookStore()
await bookStore.getBooks()

const accountGroup = useAccountGroupStore()
accountGroup.showAccountGroup(bookStore.disbursement.id)

const action = ref("create")

if (useRoute().query.details) {
    const id = useRoute().query.details
    action.value = "view"
    voucherStore.showVoucher(id)
}

if (useRoute().query.edit) {
    const id = useRoute().query.edit
    action.value = "edit"
    voucherStore.showVoucher(id)
}
const receiveAction = (ac) => {
    action.value = ac
}

const prDetails = ref(false)

</script>
