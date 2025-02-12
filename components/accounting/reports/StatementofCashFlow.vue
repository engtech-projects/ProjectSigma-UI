<script setup>
useHead({
    title: "Accounting Books",
})

</script>
<template>
    <div class="flex flex-col w-full gap-6 bg-white p-8 min-h-[1000px]">
        <AccountingCommonEvenparHeader :page="{currentPage: 1, totalPages: 1}" />
        <div class="flex flex-col justify-center w-full">
            <h1 class="text-2xl font-bold uppercase text-center">
                Statement of Cash Flow
            </h1>
            <h4 class="text-md italic text-center">
                As of January 5, 2025
            </h4>
        </div>
        <div class="flex flex-col px-16">
            <div class="flex flex-col w-full">
                <div class="flex flex-col w-full">
                    <div class="grid grid-cols-8 border border-black px-2">
                        <span class="col-span-7 font-bold"> Beginning Cash Balance as of January 5, 2025</span>
                        <span class="text-left">xxxx</span>
                    </div>
                </div>
                <div class="flex flex-col">
                    <h3 class="font-bold px-2">
                        Operating Activities
                    </h3>
                    <div class="flex flex-col">
                        <div class="grid grid-cols-8">
                            <span class="col-span-2 text-right text-green-700">Cash Receipts From</span>
                        </div>
                        <div class="grid grid-cols-8">
                            <span class="col-span-2" />
                            <span class="text-left col-span-3">Project Collection</span>
                            <span class="text-right">xxxx</span>
                        </div>
                        <div class="grid grid-cols-8">
                            <span class="col-span-2" />
                            <span class="text-left col-span-3">Advance Payment</span>
                            <span class="text-right">xxxx</span>
                        </div>
                        <div class="grid grid-cols-8">
                            <span class="col-span-2" />
                            <span class="text-left col-span-3">Progress Billing</span>
                            <span class="text-right">xxxx</span>
                        </div>
                        <div class="grid grid-cols-8">
                            <span class="col-span-2" />
                            <span class="text-left col-span-3">Retention</span>
                            <span class="text-right">xxxx</span>
                        </div>
                    </div>

                    <div class="flex flex-col">
                        <div class="grid grid-cols-8">
                            <span class="col-span-2 text-right text-green-700">Cash Paid For</span>
                        </div>
                        <div class="grid grid-cols-8">
                            <span class="col-span-2" />
                            <span class="text-left col-span-3">Supplies</span>
                            <span class="text-right">xxxx</span>
                        </div>
                        <div class="grid grid-cols-8">
                            <span class="col-span-2" />
                            <span class="text-left col-span-3">Equipment Rental</span>
                            <span class="text-right">xxxx</span>
                        </div>
                        <div class="grid grid-cols-8">
                            <span class="col-span-2" />
                            <span class="text-left col-span-3">Communication</span>
                            <span class="text-right">xxxx</span>
                        </div>
                        <div class="grid grid-cols-8">
                            <span class="col-span-2" />
                            <span class="text-left col-span-3">Subcontractors</span>
                            <span class="text-right">xxxx</span>
                        </div>
                        <div class="grid grid-cols-8">
                            <span class="col-span-2" />
                            <span class="text-left col-span-3">Taxes, Licences and Registrations</span>
                            <span class="text-right">xxxx</span>
                        </div>
                        <div class="grid grid-cols-8">
                            <span class="col-span-2" />
                            <span class="text-left col-span-3">Testing of Materials</span>
                            <span class="text-right">xxxx</span>
                        </div>
                        <div class="grid grid-cols-8">
                            <span class="col-span-2" />
                            <span class="text-left col-span-3">Other Operating Activities</span>
                            <span class="text-right">xxxx</span>
                        </div>
                    </div>
                    <div class="flex flex-col w-full">
                        <div class="grid grid-cols-8 border border-black px-2">
                            <span class="col-span-7 font-bold"> Net Cash Flow Provided by Operating Activities</span>
                            <span class="text-left">xxxx</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex flex-col w-full">
                <div class="flex flex-col">
                    <h3 class="font-bold px-2">
                        Investing Activities
                    </h3>
                    <div class="flex flex-col">
                        <div class="grid grid-cols-8">
                            <span class="col-span-2 text-right text-green-700">Cash Receipts From</span>
                        </div>
                        <div class="grid grid-cols-8">
                            <span class="col-span-2" />
                            <span class="text-left col-span-3">Redemption of Time Deposits</span>
                            <span class="text-right">xxxx</span>
                        </div>
                        <div class="grid grid-cols-8">
                            <span class="col-span-2" />
                            <span class="text-left col-span-3">Interest Revenues</span>
                            <span class="text-right">xxxx</span>
                        </div>
                    </div>

                    <div class="flex flex-col">
                        <div class="grid grid-cols-8">
                            <span class="col-span-2 text-right text-green-700">Cash Paid For</span>
                        </div>
                        <div class="grid grid-cols-8">
                            <span class="col-span-2" />
                            <span class="text-left col-span-3">Investment to Treasury Bills</span>
                            <span class="text-right">xxxx</span>
                        </div>
                        <div class="grid grid-cols-8">
                            <span class="col-span-2" />
                            <span class="text-left col-span-3">Purchase of Property, Plant and Equipment</span>
                            <span class="text-right">xxxx</span>
                        </div>
                    </div>

                    <div class="flex flex-col w-full">
                        <div class="grid grid-cols-8 border border-black px-2">
                            <span class="col-span-7 font-bold"> Net Cash Flow Provided by Investing Activities</span>
                            <span class="text-left">xxxx</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex flex-col w-full">
                <div class="flex flex-col">
                    <h3 class="font-bold px-2">
                        Financing Activities
                    </h3>
                    <div class="flex flex-col">
                        <div class="grid grid-cols-8">
                            <span class="col-span-2 text-right text-green-700">Cash Receipts From</span>
                        </div>
                        <div class="grid grid-cols-8">
                            <span class="col-span-2" />
                            <span class="text-left col-span-3">Releases of Bank Loans</span>
                            <span class="text-right">xxxx</span>
                        </div>
                    </div>

                    <div class="flex flex-col">
                        <div class="grid grid-cols-8">
                            <span class="col-span-2 text-right text-green-700">Cash Paid For</span>
                        </div>
                        <div class="grid grid-cols-8">
                            <span class="col-span-2" />
                            <span class="text-left col-span-3">Repayments of Bank Loan Payable</span>
                            <span class="text-right">xxxx</span>
                        </div>
                        <div class="grid grid-cols-8">
                            <span class="col-span-2" />
                            <span class="text-left col-span-3">Repayment of Finance Lease Payable</span>
                            <span class="text-right">xxxx</span>
                        </div>
                        <div class="grid grid-cols-8">
                            <span class="col-span-2" />
                            <span class="text-left col-span-3">Interest Expense</span>
                            <span class="text-right">xxxx</span>
                        </div>
                    </div>

                    <div class="flex flex-col w-full">
                        <div class="grid grid-cols-8 border border-black px-2">
                            <span class="col-span-7 font-bold"> Net Cash Flow Provided by Financing Activities</span>
                            <span class="text-left">xxxx</span>
                        </div>
                    </div>
                    <div class="flex flex-col w-full">
                        <div class="grid grid-cols-8 border border-black px-2">
                            <div class="col-span-7 font-bold">
                                <span class="mr-6">Addition: </span>
                                <span>Total Increase in Cash </span>
                            </div>
                            <span class="text-left">xxxx</span>
                        </div>
                    </div>
                    <div class="flex flex-col w-full">
                        <div class="grid grid-cols-8 border border-black px-2">
                            <span class="col-span-7 font-bold">Ending Cash Balance as of January 5, 2025</span>
                            <span class="text-left">xxxx</span>
                        </div>
                    </div>
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
