<script setup>
useHead({
    title: "Accounting Books",
})
</script>
<template>
    <div class="flex flex-col w-full gap-6 bg-white p-8 min-h-[1000px]">
        <AccountingCommonEvenparHeader :document-code="useAccountingDocCodeEnums.provisional_receipt" :page="{currentPage: 1, totalPages: 1}" />
        <div class="flex flex-col justify-center w-full">
            <h1 class="text-2xl font-bold uppercase text-center py-4">
                Provisional Receipt
            </h1>
        </div>
        <div class="flex flex-col">
            <table class="border border-black text-xs">
                <thead>
                    <tr>
                        <th class="w-1/4 text-left px-2 border border-black">
                            <span class="font-bold text-left">
                                REFERENCE NO.:
                            </span>
                        </th>
                        <th class="h-6 border border-black" colspan="2" />
                    </tr>
                    <tr>
                        <th class="w-1/4 text-left px-2 border border-black">
                            <span class="font-bold text-left">
                                DATE:
                            </span>
                        </th>
                        <th class="h-6 border border-black" colspan="2" />
                    </tr>
                    <tr>
                        <th class="w-1/4 text-left px-2 border border-black">
                            <span class="font-bold text-left">
                                CHECK NO.:
                            </span>
                        </th>
                        <th class="h-6 border border-black" colspan="2" />
                    </tr>
                    <tr>
                        <th class="w-1/4 text-left px-2 border border-black">
                            <span class="font-bold text-left">
                                CV NO.:
                            </span>
                        </th>
                        <th class="h-6 border border-black" colspan="2" />
                    </tr>
                    <tr>
                        <th class="w-1/4 text-left px-2 border border-black">
                            <span class="font-bold text-left">
                                RECEIVED FROM:
                            </span>
                        </th>
                        <th class="h-6 border border-black" colspan="2" />
                    </tr>
                    <tr>
                        <th class="w-1/4 text-left px-2 border h-6 border-black" colspan="3">
                            <span class="text-left font-normal">
                                IN SETTLEMENT OF THE FOLLOWING:
                            </span>
                        </th>
                    </tr>
                </thead>
            </table>
            <table class="border border-black text-xs">
                <thead>
                    <tr>
                        <th class="border border-black py-1 w-1/3 bg-slate-200">
                            PARTICULARS
                        </th>
                        <th class="border border-black py-1 w-1/3 bg-slate-200">
                            PROJECT CODE
                        </th>
                        <th class="border border-black w-1/3 py-1 bg-slate-200">
                            AMOUNT
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="index in 15" :key="index" class="h-6">
                        <td class="border border-black px-4 h-6" />
                        <td class="border border-black px-4 h-6" />
                        <td class="border border-black text-right px-4" />
                    </tr>
                    <tr class="h-6">
                        <td class="border border-black px-4 h-6 font-bold text-right" colspan="2">
                            TOTAL
                        </td>
                        <td class="border border-black text-right px-4" />
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>
    .border-double {
        border-style: double!important;
    }
</style>
