<script setup>
useHead({
    title: "Accounting Books",
})
</script>
<template>
    <div class="flex flex-col w-full gap-6 bg-white p-8 min-h-[1000px]">
        <DocumentTemplatesIsoHeader :document-code="useAccountingDocCodeEnums.liquidation_form" :page="{currentPage: 1, totalPages: 1}" />
        <div class="flex flex-col justify-center w-full">
            <h1 class="text-2xl font-bold uppercase text-center py-4">
                Liquidation Form
            </h1>
        </div>
        <div class="flex flex-col">
            <table class="border border-black text-xs">
                <thead>
                    <tr>
                        <th class="w-1/3 text-left px-2 border border-black">
                            <span class="font-bold text-left">
                                DATE OF LIQUIDATION:
                            </span>
                        </th>
                        <th class="h-6 border border-black" colspan="2" />
                    </tr>
                    <tr>
                        <th class="w-1/3 text-left px-2 border border-black border-b-transparent">
                            <span class="font-bold text-left">
                                PROJECT CODE:
                            </span>
                        </th>
                        <th class="h-6 border border-black border-b-transparent" colspan="2" />
                    </tr>
                </thead>
            </table>
            <table class="border border-black text-xs">
                <thead>
                    <tr>
                        <th class="border border-black py-1 bg-slate-200 w-1/2">
                            PARTICULARS
                        </th>
                        <th class="border border-black py-1 w-1/6 bg-slate-200">
                            RECEIPT DATE
                        </th>
                        <th class="border border-black w-1/6 py-1 bg-slate-200">
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
                        <td class="border border-black px-4 h-6" />
                        <td class="border border-black px-4 h-6 font-bold text-right">
                            TOTAL SPENT:
                        </td>
                        <td class="border border-black text-right px-4" />
                    </tr>
                    <tr class="h-6">
                        <td class="border border-black px-4 h-6" />
                        <td class="border border-black text-right px-4" />
                        <td class="border border-black text-right px-4" />
                    </tr>
                    <tr class="h-6">
                        <td class="border border-black px-4 h-6 text-right" colspan="2">
                            PETTY CASH:
                        </td>
                        <td class="border border-black text-right px-4" />
                    </tr>
                    <tr class="h-6">
                        <td class="border border-black px-4 h-6 text-right" colspan="2">
                            AMOUNT TO BE REIMBURSE:
                        </td>
                        <td class="border border-black text-right px-4" />
                    </tr>
                    <tr class="h-6">
                        <td class="border border-black px-4 h-6" />
                        <td class="border border-black px-4 h-6 font-bold text-right" />
                        <td class="border border-black text-right px-4" />
                    </tr>
                </tbody>
            </table>
            <div class="flex py-8 px-4 border-l border-black">
                <FormSignatory
                    label="Prepared By"
                    :signatory="{
                        name: '',
                        title: ''
                    }"
                    class="flex-1"
                />
                <FormSignatory
                    label="Approved By"
                    :signatory="{
                        name: '',
                        title: ''
                    }"
                    class="flex-1"
                />
            </div>
        </div>
    </div>
</template>

<style scoped>
    .border-double {
        border-style: double!important;
    }
</style>
