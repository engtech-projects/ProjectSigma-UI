<script setup>
// import { storeToRefs } from "pinia"
import { usePostingPeriodStore } from "@/stores/accounting/setup/postingperiod"

const postingPeriodStore = usePostingPeriodStore()
const showModal = ref(false)
const addPeriod = () => {
    showModal.value = true
}

const changePaginate = (newParams) => {
    postingPeriodStore.getParams.page = newParams.page ?? ""
    postingPeriodStore.getPostingPeriods()
}
</script>
<template>
    <LayoutBoards title="Posting Period List">
        <div class="py-6">
            <AccountingSetupPostingperiodPeriodGroup
                v-for="p in postingPeriodStore.list"
                :key="p.id"
                class="border-b border-slate-200"
                :data="p"
                @add-period="addPeriod"
            />
        </div>
        <div class="flex justify-center mx-auto my-4">
            <CustomPagination :links="postingPeriodStore.pagination" @change-params="changePaginate" />
        </div>
        <ModalContainer
            :local="showModal"
            :show="true"
            size="modal-sm"
            :header="true"
            @hide="showModal=false"
        >
            <AccountingSetupPostingperiodCreate @saved="showModal=false" />
        </ModalContainer>
    </LayoutBoards>
</template>
