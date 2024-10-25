<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.accounting_journal_group,
        ])"
    >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <AccountingJournalentryCreate v-if="action==='create'" />
                <AccountingPaymentrequestEdit v-if="action==='edit'" @view-details="receiveAction('view')" />
                <AccountingPaymentrequestDetails v-if="action==='view'" @edit="receiveAction('edit')" @create="receiveAction('create')" />
            </div>
            <AccountingJournalentryList />
        </div>
    </LayoutAcessContainer>
</template>

<script lang="ts" setup>

import { useStakeholderStore } from "~/stores/accounting/stakeholder"
import { useJournalStore } from "~/stores/accounting/journal"
import { useBookStore } from "~/stores/accounting/book"
import { useAccountGroupStore } from "~/stores/accounting/accountgroups"

const journalStore = useJournalStore()
journalStore.getJournals()

const action = ref("create")
const stakeholderStore = useStakeholderStore()
stakeholderStore.getStakeholders()

const bookStore = useBookStore()
await bookStore.getBooks()

const accountGroup = useAccountGroupStore()
accountGroup.showAccountGroup(bookStore.disbursement.id)

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
