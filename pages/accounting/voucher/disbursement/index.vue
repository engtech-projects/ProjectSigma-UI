<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.accounting_journal_group,
        ])"
    >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <AccountingVoucherDisbursementCreate v-if="action==='create'" @detach="prDetails=false" />
                <AccountingVoucherDisbursementEdit v-if="action==='edit'" @view-details="receiveAction('view')" />
                <AccountingVoucherDisbursementDetails v-if="action==='view'" @edit="receiveAction('edit')" @create="receiveAction('create')" />
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
                        <AccountingVoucherDisbursementList @view-details="receiveAction('view')" />
                    </HrmsCommonTabsTabContainer>
                    <HrmsCommonTabsTabContainer id="myApprovals">
                        <span class="block text-center text-gray-300">No approvals yet.</span>
                    </HrmsCommonTabsTabContainer>
                    <HrmsCommonTabsTabContainer id="forVouchering">
                        <AccountingPaymentrequestList v-if="!prDetails" target="voucher" @voucher="setVoucher" />
                        <AccountingPaymentrequestDetails v-else target="voucher" :border="false" @back-to-list="prDetails=false" @detach="prDetails=false" />
                    </HrmsCommonTabsTabContainer>
                </template>
            </HrmsCommonTabsMainContainer>
        </div>
    </LayoutAcessContainer>
</template>

<script lang="ts" setup>

import { useVoucherStore } from "~/stores/accounting/voucher"
import { useAccountStore } from "~/stores/accounting/account"
import { useStakeholderStore } from "~/stores/accounting/stakeholder"
import { useBookStore } from "~/stores/accounting/book"
import { useAccountGroupStore } from "~/stores/accounting/accountgroups"
import { usePaymentRequestStore } from "~/stores/accounting/paymentrequest"

const action = ref("create")
const voucherStore = useVoucherStore()

voucherStore.reset()
voucherStore.params.filter = {
    book: "disbursement",
    status: "all"
}
voucherStore.getVouchers()
voucherStore.getFormTypes()

const accountStore = useAccountStore()
accountStore.getAccounts()

const stakeholderStore = useStakeholderStore()
stakeholderStore.getStakeholders()

const paymentRequestStore = usePaymentRequestStore()
paymentRequestStore.getPaymentRequests()

const bookStore = useBookStore()
await bookStore.getBooks()

const accountGroup = useAccountGroupStore()
accountGroup.showAccountGroup(bookStore.disbursement.id)

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
const setVoucher = (val:any) => {
    prDetails.value = true
    paymentRequestStore.getPaymentRequest(val)
}

</script>
