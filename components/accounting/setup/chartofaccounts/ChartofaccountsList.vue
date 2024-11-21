<script setup>
import { useAccountStore } from "~/stores/accounting/setup/account"

const accountStore = useAccountStore()
const showModal = ref(false)
const addAccount = (ac) => {
    accountStore.account.account_type_id = ac[0]?.account_type.id
    showModal.value = true
}
</script>
<template>
    <div class="flex flex-col relative">
        <LayoutBoards title="Chart of Accounts" :loading="accountStore.isLoading.chart" class="w-full flex-2">
            <AccountingSetupChartofaccountsChartofAccountsCategory
                v-for="ac,i in accountStore.chart"
                :key="i"
                :data="ac"
                :title="i"
                @add-account="addAccount"
            />
        </LayoutBoards>
        <ModalContainer
            :local="showModal"
            :show="true"
            size="modal-sm"
            :header="true"
            @hide="showModal=false"
        >
            <AccountingSetupAccountCreate />
        </ModalContainer>
    </div>
</template>
