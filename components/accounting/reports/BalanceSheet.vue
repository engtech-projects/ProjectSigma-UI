<script setup>

</script>
<template>
    <div class="flex flex-col w-full gap-6 bg-white p-8 min-h-[1000px]">
        <AccountingCommonEvenparHeader :page="{currentPage: 1, totalPages: 1}" />
        <div class="flex flex-col justify-center w-full">
            <h1 class="text-2xl font-bold uppercase text-center">
                Balance Sheet
            </h1>
            <h4 class="text-md italic text-center">
                As of January 5, 2025
            </h4>
        </div>
        <div class="flex flex-col gap-4 px-16">
            <h2 class="font-bold text-lg uppercase text-center">
                Assets
            </h2>
            <div class="flex flex-col">
                <h3 class="font-bold">
                    Current Assets
                </h3>
                <div class="grid grid-cols-8">
                    <span />
                    <span class="col-span-4">Cash</span>
                    <span class="text-right">xxxx</span>
                    <span class="text-right" />
                </div>
                <div class="grid grid-cols-8">
                    <span />
                    <span class="col-span-4">Accounts Receivable</span>
                    <span class="text-right">xxxx</span>
                    <span class="text-right" />
                </div>
                <div class="grid grid-cols-8">
                    <span />
                    <span class="col-span-4">Prepaid Expenses</span>
                    <span class="text-right border-b border-black">xxxx</span>
                    <span class="text-right">xxxx</span>
                </div>
            </div>
            <div class="flex flex-col">
                <h3 class="font-bold">
                    Noncurrent Assets
                </h3>
                <div class="grid grid-cols-8">
                    <span />
                    <span class="col-span-4">Machinery</span>
                    <span class="text-right">xxxx</span>
                    <span class="text-right" />
                </div>
                <div class="grid grid-cols-8">
                    <span />
                    <span class="col-span-4">Vehicles</span>
                    <span class="text-right">xxxx</span>
                    <span class="text-right" />
                </div>
                <div class="grid grid-cols-8">
                    <span />
                    <span class="col-span-4">Property, Plant, and Equipment</span>
                    <span class="text-right border-b border-black">xxxx</span>
                    <span class="text-right">xxxx</span>
                </div>
            </div>
            <div class="flex flex-col">
                <div class="grid grid-cols-8">
                    <span class="col-span-5 font-bold">Total Assets</span>
                    <span class="text-right border-b border-double border-black">xxxx</span>
                </div>
            </div>
        </div>

        <div class="flex flex-col gap-2 px-16">
            <h2 class="font-bold text-lg uppercase text-center">
                Liabilities & Owners Equity
            </h2>
            <div class="flex flex-col">
                <h3 class="font-bold">
                    Current Liabilities
                </h3>
                <div class="grid grid-cols-8">
                    <span />
                    <span class="col-span-4">Accounts Payable</span>
                    <span class="text-right">xxxx</span>
                    <span class="text-right" />
                </div>
                <div class="grid grid-cols-8">
                    <span />
                    <span class="col-span-4">Loans Payable</span>
                    <span class="text-right">xxxx</span>
                    <span class="text-right" />
                </div>
                <div class="grid grid-cols-8">
                    <span />
                    <span class="col-span-4">Income Taxes Payable</span>
                    <span class="text-right border-b border-black">xxxx</span>
                    <span class="text-right">xxxx</span>
                </div>
            </div>
            <div class="flex flex-col">
                <h3 class="font-bold">
                    Owners Equity
                </h3>
                <div class="grid grid-cols-8">
                    <span />
                    <span class="col-span-4">Capital</span>
                    <span class="text-right" />
                    <span class="text-right">xxxx</span>
                </div>
            </div>
            <div class="flex flex-col">
                <div class="grid grid-cols-8">
                    <span class="col-span-5 font-bold">Total Liabilities &amp; Owners Equity</span>
                    <span class="text-right border-b border-double border-black">xxxx</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .border-double {
        border-style: double;
    }
</style>
