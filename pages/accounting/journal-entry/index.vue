<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.accounting_journal_group,
        ])"
    >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <AccountingJournalentryCreate v-if="action==='create'" />
                <AccountingJournalentryEdit v-if="action==='edit'" @view-details="receiveAction('view')" />
                <AccountingJournalentryDetails v-if="action==='view'" @edit="receiveAction('edit')" @create="receiveAction('create')" />
            </div>
            <AccountingJournalentryList @view-details="receiveAction('view')" />
        </div>
    </LayoutAcessContainer>
</template>

<script lang="ts" setup>

import { useStakeHolderStore } from "~/stores/accounting/stakeholders/stakeholder"
import { useJournalStore } from "~/stores/accounting/journals/journal"
import { useBookStore } from "~/stores/accounting/setup/book"
import { useAccountGroupStore } from "~/stores/accounting/setup/accountgroups"

const journalStore = useJournalStore()
journalStore.getJournals()

const action = ref("create")
const stakeholderStore = useStakeHolderStore()
stakeholderStore.getStakeholders()

const bookStore = useBookStore()
await bookStore.getBooks()

const accountGroup = useAccountGroupStore()
accountGroup.showAccountGroup(bookStore.disbursement.id)

if (useRoute().query.details) {
    const id = useRoute().query.details
    action.value = "view"
    journalStore.getJournal(id)
}

if (useRoute().query.edit) {
    const id = useRoute().query.edit
    action.value = "edit"
    await journalStore.getJournal(id)
}

const receiveAction = (ac) => {
    action.value = ac
}

</script>
