<script setup>
useHead({
    title: "Accounting Books",
})
</script>
<template>
    <div class="flex flex-col w-full gap-6 bg-white p-8 min-h-[1000px]">
        <AccountingCommonEvenparHeader :page="{currentPage: 1, totalPages: 1}" />
        <div class="flex flex-col justify-center w-full">
            <h1 class="text-2xl font-bold uppercase text-center py-4">
                Payroll Liquidation
            </h1>
        </div>
        <div class="flex flex-col">
            <table class="border border-black text-xs mb-6">
                <thead>
                    <tr>
                        <th class="h-6 w-1/4 text-left px-2 border border-black">
                            <span class="font-bold text-left">
                                PAYEE:
                            </span>
                        </th>
                    </tr>
                    <tr>
                        <th class="h-6 w-1/4 text-left px-2 border border-black">
                            <span class="font-bold text-left">
                                DV NO.
                            </span>
                        </th>
                    </tr>
                    <tr>
                        <th class="h-6 w-1/4 text-left px-2 border border-black">
                            <span class="font-bold text-left">
                                CV NO.
                            </span>
                        </th>
                    </tr>
                    <tr>
                        <th class="h-6 w-1/4 text-left px-2 border border-black">
                            <span class="font-bold text-left">
                                Date Released:
                            </span>
                        </th>
                    </tr>
                    <tr>
                        <th class="h-6 w-1/4 text-left px-2 border border-black">
                            <span class="font-bold text-left">
                                Date Liquidated:
                            </span>
                        </th>
                    </tr>
                    <tr>
                        <th class="h-6 w-1/4 text-left px-2 border border-black">
                            <span class="font-bold text-left">
                                Particulars:
                            </span>
                        </th>
                    </tr>
                </thead>
            </table>
            <table class="border border-black text-xs">
                <thead>
                    <tr>
                        <th class="border border-black py-1 bg-slate-200" rowspan="2">
                            PROJECT CODE/SECTION
                        </th>
                        <th class="border border-black py-1 border-b-0" colspan="4">
                            Pay Elements
                        </th>
                        <th class="border border-black py-1 bg-slate-200" rowspan="2">
                            Gross Pay
                        </th>
                        <th class="border border-black py-1 !border-b-0" colspan="7">
                            Deductions
                        </th>
                        <th class="border border-black py-1 bg-slate-200" rowspan="2">
                            Amount Liquidated
                        </th>
                    </tr>
                    <tr>
                        <th class="border border-black py-1 bg-slate-200 border-t-0">
                            Basic Pay
                        </th>
                        <th class="border border-black py-1 bg-slate-200 border-t-0">
                            Overtime Pay
                        </th>
                        <th class="border border-black py-1 bg-slate-200 border-t-0">
                            Salary Adjustment
                        </th>
                        <th class="border border-black py-1 bg-slate-200 border-t-0">
                            Allowance
                        </th>
                        <th class="border border-black py-1 bg-slate-200 border-t-0">
                            Advances to Officers and Employees
                        </th>
                        <th class="border border-black py-1 bg-slate-200 border-t-0">
                            SSS Contribution Payable
                        </th>
                        <th class="border border-black py-1 bg-slate-200 border-t-0">
                            SSS (Loan Payable)
                        </th>
                        <th class="border border-black py-1 bg-slate-200 border-t-0">
                            PHIC Contribution Payable
                        </th>
                        <th class="border border-black py-1 bg-slate-200 border-t-0">
                            HDMF (Loan Payable)
                        </th>
                        <th class="border border-black py-1 bg-slate-200 border-t-0">
                            Coop Loan
                        </th>
                        <th class="border border-black py-1 bg-slate-200 border-t-0">
                            Donation
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="index in 4" :key="index" class="h-6">
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
                        <td class="border border-black px-4 h-6" />
                        <td class="border border-black px-4 h-6" />
                    </tr>
                    <tr class="h-6">
                        <td class="border border-black px-4 h-6" />
                        <td class="border border-black px-4 h-6" />
                        <td class="border border-black px-4 h-6" />
                        <td class="border border-black px-4 h-6" />
                        <td class="border border-black px-4 h-6" />
                        <td class="border border-black px-4 h-6" />
                        <td class="border border-black px-4 h-6" />
                        <td class="border border-black px-4 h-6" />
                        <td class="border border-black px-4 h-6" />
                        <td class="border border-black px-4 h-6" colspan="4">
                            <span class="font-bold">
                                Cash Advance per DV
                            </span>
                        </td>
                        <td class="border border-black px-4 h-6" />
                    </tr>
                    <tr class="h-6">
                        <td class="border border-black px-4 h-6" />
                        <td class="border border-black px-4 h-6" />
                        <td class="border border-black px-4 h-6" />
                        <td class="border border-black px-4 h-6" />
                        <td class="border border-black px-4 h-6" />
                        <td class="border border-black px-4 h-6" />
                        <td class="border border-black px-4 h-6" />
                        <td class="border border-black px-4 h-6" />
                        <td class="border border-black px-4 h-6" />
                        <td class="border border-black px-4 h-6" colspan="4">
                            <span class="font-bold">
                                Excess (Refund)
                            </span>
                        </td>
                        <td class="border border-black px-4 h-6" />
                    </tr>
                    <tr class="h-6">
                        <td class="border border-black px-4 h-6" />
                        <td class="border border-black px-4 h-6" />
                        <td class="border border-black px-4 h-6" />
                        <td class="border border-black px-4 h-6" />
                        <td class="border border-black px-4 h-6" />
                        <td class="border border-black px-4 h-6" />
                        <td class="border border-black px-4 h-6" />
                        <td class="border border-black px-4 h-6" />
                        <td class="border border-black px-4 h-6" />
                        <td class="border border-black px-4 h-6" colspan="4">
                            <span class="font-bold">
                                Provisional Receipt #(cash return)
                            </span>
                        </td>
                        <td class="border border-black px-4 h-6" />
                    </tr>
                </tbody>
            </table>
            <div class="flex py-8 px-4 border border-t-0 border-black">
                <FormSignatory
                    label="Prepared By"
                    :signatory="{
                        name: '',
                        title: ''
                    }"
                    class="flex-1"
                />
                <FormSignatory
                    label="Certified Correct"
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
