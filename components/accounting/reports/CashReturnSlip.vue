<script setup>
useHead({
    title: "Accounting Books",
})
</script>
<template>
    <div class="flex flex-col w-full gap-6 bg-white p-8 min-h-[1000px]">
        <AccountingCommonEvenparHeader :document-code="useAccountingDocCodeEnums.cash_return_slip" :page="{currentPage: 1, totalPages: 1}" />
        <div class="flex flex-col justify-center w-full">
            <h1 class="text-2xl font-bold uppercase text-center py-4">
                Cash Return Slip
            </h1>
        </div>
        <div>
            <div class="grid grid-cols-2">
                <span class="border-l border-t border-black px-2 h-20 flex items-center">
                    PROJECT ENGINEER:
                </span>
                <span class="border border-b-0 border-black px-2 h-20 flex items-center" />
            </div>
            <div class="grid grid-cols-2">
                <span class="border-l border-t border-black px-2 h-20 flex items-center">
                    SECTION/PROJECT CODE:
                </span>
                <span class="border border-b-0 border-black px-2 h-20 flex items-center" />
            </div>
            <div class="grid grid-cols-2">
                <span class="border-l border-t border-black px-2 h-20 flex items-center">
                    PETTY CASH:
                </span>
                <span class="border border-b-0 border-black px-2 h-20 flex items-center" />
            </div>
            <div class="grid grid-cols-2">
                <span class="border-l border-t border-black px-2 h-20 flex items-center">
                    CONTINGENCY FUND:
                </span>
                <span class="border border-b-0 border-black px-2 h-20 flex items-center" />
            </div>
            <div class="grid grid-cols-2">
                <span class="border-l border-t border-black px-2 h-20 flex items-center">
                    LIQUIDATION AMOUNT:
                </span>
                <span class="border border-b-0 border-black px-2 h-20 flex items-center" />
            </div>
            <div class="grid grid-cols-2">
                <span class="border-l border-t border-black px-2 h-20 flex items-center">
                    CASH RETURN:
                </span>
                <span class="border border-b-0 border-black px-2 h-20 flex items-center" />
            </div>
            <div class="grid grid-cols-2">
                <span class="border-l border-t border-black px-2 h-20 flex items-center">
                    APPROVED BY:
                </span>
                <span class="border border-b-0 border-black px-2 h-20 flex items-center" />
            </div>
            <div class="grid grid-cols-2">
                <span class="border-l border-t border-b border-black px-2 h-20 flex items-center">
                    DATE:
                </span>
                <span class="border border-black px-2 h-20 flex items-center" />
            </div>
        </div>
    </div>
</template>

<style scoped>
    .border-double {
        border-style: double!important;
    }
</style>
