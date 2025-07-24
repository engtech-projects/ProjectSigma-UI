<script setup>
useHead({
    title: "Accounting Books",
})
</script>
<template>
    <div class="flex flex-col w-full gap-6 bg-white p-8 min-h-[1000px]">
        <DocumentTemplatesIsoHeader :document-code="useAccountingDocCodeEnums.replenishment_summary" :page="{currentPage: 1, totalPages: 1}" />
        <div class="flex flex-col justify-center w-full">
            <h1 class="text-2xl font-bold uppercase text-center py-4">
                Replenishment Summary
            </h1>
        </div>
        <div class="flex flex-col">
            <table class="text-xs">
                <thead>
                    <tr>
                        <th class="w-1/3 text-left px-2 border-l border-black">
                            <span class="font-bold text-left uppercase">
                                P.O. Replenishment NO.:
                            </span>
                        </th>
                        <th class="h-6 border border-black border-b-transparent" colspan="12" />
                    </tr>
                    <tr class="bg-slate-200">
                        <th class="border border-black py-1 border-t-transparent bg-slate-200 w-1/4" rowspan="2">
                            PARTICULARS
                        </th>
                        <th class="border border-black py-1 w-1/6 bg-slate-200" rowspan="2">
                            PROJECT CODE
                        </th>
                        <th class="border border-black w-1/6 py-1 bg-slate-200" rowspan="2">
                            GROSS AMOUNT
                        </th>
                        <th class="border border-black w-1/6 py-1 bg-slate-200" rowspan="2">
                            INPUT VAT
                        </th>
                        <th class="border border-black w-1/6 py-1 bg-slate-200" rowspan="2">
                            NET OF VAT
                        </th>
                        <th class="w-1/3 px-2 border border-black border-b-transparent py-1 text-center" colspan="5">
                            <span class="font-bold">
                                ACCOUNTS:
                            </span>
                        </th>
                        <th class="w-1/3 px-2 border border-black border-b-transparent py-1 text-center" colspan="2">
                            <span class="font-bold">
                                EWT:
                            </span>
                        </th><th class="w-1/3 px-2 border border-black text-center" rowspan="2">
                            <span class="font-bold">
                                NET PAYABLE:
                            </span>
                        </th>
                    </tr>
                    <tr class="bg-slate-200">
                        <th class="border border-black w-6" />
                        <th class="border border-black w-6" />
                        <th class="border border-black w-6" />
                        <th class="border border-black w-6" />
                        <th class="border border-black w-6" />
                        <th class="border border-black">
                            1%
                        </th>
                        <th class="border border-black">
                            2%
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="index in 10" :key="index" class="h-6">
                        <td class="border border-black px-4 h-6" />
                        <td class="border border-black px-4 h-6" />
                        <td class="border border-black px-4 h-6" />
                        <td class="border border-black px-4 h-6" />
                        <td class="border border-black px-4 h-6" />
                        <td class="border border-black px-4 h-6" />
                        <td class="border border-black px-4 h-6" />
                        <td class="border border-black px-4 h-6" />
                        <td class="border border-black px-4 h-6" />
                        <td class="border border-black px-4 h-6" />
                        <td class="border border-black px-4 h-6" />
                        <td class="border border-black px-4 h-6" />
                        <td class="border border-black text-right px-4" />
                    </tr>
                    <tr class="h-6">
                        <td class="border border-black px-4 h-6 text-right">
                            <span class="font-bold text-md">
                                TOTAL
                            </span>
                        </td>
                        <td class="border border-black px-4 h-6" />
                        <td class="border border-black px-4 h-6" />
                        <td class="border border-black px-4 h-6" />
                        <td class="border border-black px-4 h-6" />
                        <td class="border border-black px-4 h-6" />
                        <td class="border border-black px-4 h-6" />
                        <td class="border border-black px-4 h-6" />
                        <td class="border border-black px-4 h-6" />
                        <td class="border border-black px-4 h-6" />
                        <td class="border border-black px-4 h-6" />
                        <td class="border border-black px-4 h-6" />
                        <td class="border border-black text-right px-4" />
                    </tr>
                </tbody>
            </table>
            <div class="flex py-12 px-4 border-x border-b border-black">
                <FormSignatory
                    label="Prepared By"
                    :signatory="{
                        name: '',
                        title: 'Treasury Specialist'
                    }"
                    class="flex-1"
                />
                <FormSignatory
                    label="Checked By"
                    :signatory="{
                        name: '',
                        title: 'Accounting Specialist'
                    }"
                    class="flex-1"
                />
                <FormSignatory
                    label="Approved By"
                    :signatory="{
                        name: '',
                        title: 'President'
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
