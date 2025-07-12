<script setup>
useHead({
    title: "Accounting Books",
})
</script>
<template>
    <div class="flex flex-col w-full gap-6 bg-white p-8 min-h-[1000px]">
        <AccountingCommonEvenparHeader :document-code="useAccountingDocCodeEnums.memorandum_of_deposit" :page="{currentPage: 1, totalPages: 1}" />
        <div class="flex flex-col justify-center w-full">
            <h1 class="text-2xl font-bold uppercase text-center py-4">
                Memorandum of Deposit
            </h1>
        </div>
        <div class="flex flex-col">
            <div class="flex items-center justify-around h-20 px-[10%] border border-black border-b-0">
                <div class="flex items-end gap-2">
                    <div class="w-8 h-6 border border-black" />
                    <span class="text-md uppercase">
                        Project Collection
                    </span>
                </div>
                <div class="flex items-center gap-2">
                    <div class="w-8 h-6 border border-black" />
                    <span class="text-md uppercase">
                        Royalty
                    </span>
                </div>
                <div class="flex items-center gap-2">
                    <div class="w-8 h-6 border border-black" />
                    <span class="text-md uppercase">
                        Cash Return
                    </span>
                </div>
            </div>
            <table class="w-full text-xs">
                <thead>
                    <tr>
                        <th class="border border-black py-1 text-left px-2" colspan="2">
                            PAYEE:
                        </th>
                        <th class="border border-black py-1" colspan="7" />
                    </tr>
                    <tr>
                        <th class="border border-black py-1 text-left px-2" colspan="2">
                            DISBURSEMENT VOUCHER:
                        </th>
                        <th class="border border-black py-1" colspan="7" />
                    </tr>
                    <tr>
                        <th class="border border-black py-1 bg-slate-200">
                            BANK
                        </th>
                        <th class="border border-black py-1 bg-slate-200">
                            COLLECTION DATE
                        </th>
                        <th class="border border-black py-1 bg-slate-200">
                            PROJECT CODE
                        </th>
                        <th class="border border-black py-1 bg-slate-200">
                            PARTICULARS
                        </th>
                        <th class="border border-black py-1 bg-slate-200">
                            DEPOSIT DATE
                        </th>
                        <th class="border border-black py-1 bg-slate-200">
                            BASIC PAY
                        </th>
                        <th class="border border-black py-1 bg-slate-200">
                            OVERTIME
                        </th>
                        <th class="border border-black py-1 bg-slate-200">
                            ALLOWANCE
                        </th>
                        <th class="border border-black py-1 bg-slate-200">
                            TOTAL AMOUNT
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="index in 15" :key="index" class="h-6">
                        <td class="border border-black px-4 h-6" />
                        <td class="border border-black px-4 h-6" />
                        <td class="border border-black text-right px-4" />
                        <td class="border border-black text-right px-4" />
                        <td class="border border-black text-right px-4" />
                        <td class="border border-black text-right px-4" />
                        <td class="border border-black text-right px-4" />
                        <td class="border border-black text-right px-4" />
                        <td class="border border-black text-right px-4" />
                    </tr>
                    <tr>
                        <td class="border border-black px-4 h-6" />
                        <td class="border border-black px-4 h-6" colspan="2">
                            <span class="font-bold text-center block">
                                GRAND TOTAL
                            </span>
                        </td>
                        <td class="border border-black text-right px-4" />
                        <td class="border border-black text-right px-4" />
                        <td class="border border-black text-right px-4" />
                        <td class="border border-black text-right px-4" />
                        <td class="border border-black text-right px-4" />
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
