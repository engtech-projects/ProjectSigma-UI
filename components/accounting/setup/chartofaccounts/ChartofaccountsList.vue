<script setup>
import { useAccountStore } from "~/stores/accounting/setup/account"

const accountStore = useAccountStore()
const showModal = ref(true)
</script>
<template>
    <div class="flex flex-col relative">
        <LayoutBoards title="Chart of Accounts" :loading="accountStore.isLoading.chart" class="w-full flex-2">
            <div v-for="ac,i in accountStore.chart" :key="i" class="flex flex-col gap-4 pt-4">
                <h1 class="font-bold w-full bg-gray-100 py-2 px-2">
                    {{ upperFirst(i) }}
                </h1>
                <div v-for="aa,p in ac" :key="p" class="flex flex-col">
                    <div class="flex items-center justify-between">
                        <h2 class="w-full text-md text-blue-500 px-5">
                            {{ upperFirst(p) }}
                        </h2>
                        <button class="text-xs w-12 py-[2px] rounded-sm block bg-green-500 hover:bg-green-600 active:bg-green-500 text-white">
                            + ADD
                        </button>
                    </div>
                    <div v-for="act in aa" :key="act.id" class="flex flex-col">
                        <div class="flex items-center hover:bg-green-100">
                            <h3 class="w-full text-xs px-8 py-1 border flex-1 h-full">
                                {{ upperFirst(act.account_number) }}
                            </h3>
                            <h3 class="w-full text-xs px-8 py-1 border flex-4 h-full">
                                {{ upperFirst(act.account_name) }}
                            </h3>
                            <h3 class="w-full text-xs px-8 py-1 border flex-1 h-full">
                                {{ upperFirst(act.account_type?.balance_type) + " ( " + act.account_type?.notation + " ) " }}
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutBoards>
        <ModalContainer
            :local="showModal"
            :show="true"
            size="modal-sm"
            :header="false"
            @hide="showModal=false"
        >
            <AccountingSetupAccountCreate />
        </ModalContainer>
    </div>
</template>

<style scoped>
    .flex-2 {
        flex: 2
    }
    .flex-3 {
        flex: 3
    }
    .flex-4 {
        flex: 4
    }
    .flex-5 {
        flex: 5
    }
</style>
