<script setup>
import { use13thMonthStore } from "@/stores/hrms/payroll/13thmonth"
const dataStore = use13thMonthStore()
const { summary } = storeToRefs(dataStore)
</script>
<template>
    <LayoutLoadingContainer class="w-full">
        <div class="flex gap-2">
            <LayoutFormPsDateInput v-model="summary.params.date_requested" title="13th Month Date" />
            <LayoutFormPsButton
                button-title="Get Summary"
                :loading="dataStore.summary.isLoading"
                @click="dataStore.getSummary"
            />
        </div>
        <LayoutPrint>
            <div class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2 items-center">
                <HrmsPayroll13thMonthResultSummaryTable
                    :data="dataStore.summary.data"
                />
            </div>
        </LayoutPrint>
    </LayoutLoadingContainer>
</template>
