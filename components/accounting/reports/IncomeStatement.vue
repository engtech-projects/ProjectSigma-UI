<script setup>

</script>
<template>
    <div class="flex flex-col w-full gap-6 bg-white p-8 min-h-[1000px]">
        <AccountingCommonEvenparHeader :page="{currentPage: 1, totalPages: 1}" />
        <div class="flex flex-col justify-center w-full">
            <h1 class="text-2xl font-bold uppercase text-center">
                Income Statement
            </h1>
            <h4 class="text-md italic text-center">
                As of January 5, 2025
            </h4>
        </div>
        <div class="flex flex-col gap-4 px-12">
            <div class="flex flex-col">
                <h3 class="font-bold uppercase">
                    Revenues
                </h3>
                <div class="grid grid-cols-8">
                    <span />
                    <span class="col-span-5">COLLECTION</span>
                    <span class="text-right">xxxx</span>
                    <span class="text-right">xxxx</span>
                </div>
            </div>

            <div class="flex flex-col">
                <h3 class="font-bold uppercase">
                    Expenses
                </h3>
                <div class="grid grid-cols-8">
                    <span />
                    <span class="col-span-5">Construction Cost - Materials</span>
                    <span class="text-right">xxxx</span>
                    <span class="text-right" />
                </div>
                <div class="grid grid-cols-8">
                    <span />
                    <span class="col-span-5">Construction Cost - Materials</span>
                    <span class="text-right">xxxx</span>
                    <span class="text-right" />
                </div>
                <div class="grid grid-cols-8">
                    <span />
                    <span class="col-span-5">Construction Cost - Labor</span>
                    <span class="text-right">xxxx</span>
                    <span class="text-right" />
                </div>
                <div class="grid grid-cols-8">
                    <span />
                    <span class="col-span-5">Construction Cost - Equipment Rental</span>
                    <span class="text-right">xxxx</span>
                    <span class="text-right" />
                </div>
                <div class="grid grid-cols-8">
                    <span />
                    <span class="col-span-5">Construction Cost - Fuel</span>
                    <span class="text-right">xxxx</span>
                    <span class="text-right" />
                </div>
                <div class="grid grid-cols-8">
                    <span />
                    <span class="col-span-5">Construction Cost - Direct Overhead</span>
                    <span class="text-right">xxxx</span>
                    <span class="text-right" />
                </div>
                <div class="flex flex-col">
                    <div class="grid grid-cols-8">
                        <span />
                        <span />
                        <span class="col-span-3">Communication Expenses</span>
                        <span class="text-right">xxxx</span>
                        <span class="text-right" />
                        <span class="text-right" />
                    </div>
                    <div class="grid grid-cols-8">
                        <span />
                        <span />
                        <span class="col-span-3">Facilities for Project Office & Bunkhouse</span>
                        <span class="text-right">xxxx</span>
                        <span class="text-right" />
                        <span class="text-right" />
                    </div>
                    <div class="grid grid-cols-8">
                        <span />
                        <span />
                        <span class="col-span-3">Health & Safety</span>
                        <span class="text-right">xxxx</span>
                        <span class="text-right" />
                        <span class="text-right" />
                    </div>
                    <div class="grid grid-cols-8">
                        <span />
                        <span />
                        <span class="col-span-3">Insurance Expenses</span>
                        <span class="text-right">xxxx</span>
                        <span class="text-right" />
                        <span class="text-right" />
                    </div>
                    <div class="grid grid-cols-8">
                        <span />
                        <span />
                        <span class="col-span-3">Interest Expense</span>
                        <span class="text-right">xxxx</span>
                        <span class="text-right" />
                        <span class="text-right" />
                    </div>
                    <div class="grid grid-cols-8">
                        <span />
                        <span />
                        <span class="col-span-3">Meals Expense</span>
                        <span class="text-right">xxxx</span>
                        <span class="text-right" />
                        <span class="text-right" />
                    </div>
                    <div class="grid grid-cols-8">
                        <span />
                        <span />
                        <span class="col-span-3">Meeting Expense</span>
                        <span class="text-right">xxxx</span>
                        <span class="text-right" />
                        <span class="text-right" />
                    </div>
                    <div class="grid grid-cols-8">
                        <span />
                        <span />
                        <span class="col-span-3">Office Supplies</span>
                        <span class="text-right">xxxx</span>
                        <span class="text-right" />
                        <span class="text-right" />
                    </div>
                    <div class="grid grid-cols-8">
                        <span />
                        <span />
                        <span class="col-span-3">Rent Expense</span>
                        <span class="text-right">xxxx</span>
                        <span class="text-right" />
                        <span class="text-right" />
                    </div>
                    <div class="grid grid-cols-8">
                        <span />
                        <span />
                        <span class="col-span-3">Repairs & Maintenance</span>
                        <span class="text-right">xxxx</span>
                        <span class="text-right" />
                        <span class="text-right" />
                    </div>
                    <div class="grid grid-cols-8">
                        <span />
                        <span />
                        <span class="col-span-3">Representation Expense</span>
                        <span class="text-right">xxxx</span>
                        <span class="text-right" />
                        <span class="text-right" />
                    </div>
                    <div class="grid grid-cols-8">
                        <span />
                        <span />
                        <span class="col-span-3">Traveling Expense</span>
                        <span class="text-right">xxxx</span>
                        <span class="text-right" />
                        <span class="text-right" />
                    </div>
                    <div class="grid grid-cols-8">
                        <span />
                        <span />
                        <span class="col-span-3">Utilities Expense, Light and Water</span>
                        <span class="text-right">xxxx</span>
                        <span class="text-right" />
                        <span class="text-right" />
                    </div>
                </div>
            </div>

            <div class="flex flex-col">
                <div class="grid grid-cols-8">
                    <span class="col-span-7 font-bold">Income Before Tax</span>
                    <span class="text-right">xxxx</span>
                </div>
                <div class="grid grid-cols-8">
                    <span />
                    <span class="col-span-5">Income Tax Expense</span>
                    <span class="text-right" />
                    <span class="text-right">xxxx</span>
                </div>
            </div>
            <div class="flex flex-col">
                <div class="grid grid-cols-8">
                    <span class="col-span-7 font-bold">Net Income</span>
                    <span class="text-right border-b border-double border-black">xxxx</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .border-double {
        border-style: double!important;
    }
</style>
