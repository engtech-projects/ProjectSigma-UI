<script setup>

</script>
<template>
    <div class="flex flex-col w-full gap-6 bg-white p-8 min-h-[1000px]">
        <AccountingCommonEvenparHeader class="mb-12" :page="{currentPage: 1, totalPages: 1}" />
        <div class="flex flex-col justify-center w-full">
            <h1 class="text-xl font-bold uppercase text-center">
                Expenses for the Month as of
            </h1>
            <h1 class="text-xl font-bold uppercase text-center">
                Project Code
            </h1>
            <h1 class="text-xl font-bold uppercase text-center">
                Project Name
            </h1>
        </div>
        <div class="flex flex-col gap-4 px-12 text-sm">
            <div class="flex flex-col">
                <h3 class="font-bold uppercase">
                    Direct Costs
                </h3>
                <div class="grid grid-cols-8">
                    <span />
                    <span class="col-span-6">Construction Cost - Materials</span>
                    <span class="text-right">xxxx</span>
                </div>
                <div class="grid grid-cols-8">
                    <span />
                    <span class="col-span-6">Construction Cost - Materials</span>
                    <span class="text-right">xxxx</span>
                </div>
                <div class="grid grid-cols-8">
                    <span />
                    <span class="col-span-6">Construction Cost - Labor</span>
                    <span class="text-right">xxxx</span>
                </div>
                <div class="grid grid-cols-8">
                    <span />
                    <span class="col-span-6">Construction Cost - Equipment Rental</span>
                    <span class="text-right">xxxx</span>
                </div>
                <div class="grid grid-cols-8">
                    <span />
                    <span class="col-span-6">Construction Cost - Fuel</span>
                    <span class="text-right">xxxx</span>
                </div>
                <div class="grid grid-cols-8">
                    <span />
                    <span class="col-span-6">Construction Cost - Direct Overhead</span>
                    <span class="text-right">xxxx</span>
                </div>
                <div class="flex flex-col">
                    <div class="grid grid-cols-8">
                        <span />
                        <span />
                        <span class="col-span-5">Communication Expenses</span>
                        <span class="text-right">xxxx</span>
                    </div>
                    <div class="grid grid-cols-8">
                        <span />
                        <span />
                        <span class="col-span-5">Facilities for Project Office & Bunkhouse</span>
                        <span class="text-right">xxxx</span>
                    </div>
                    <div class="grid grid-cols-8">
                        <span />
                        <span />
                        <span class="col-span-5">Health & Safety</span>
                        <span class="text-right">xxxx</span>
                    </div>
                    <div class="grid grid-cols-8">
                        <span />
                        <span />
                        <span class="col-span-5">Insurance Expenses</span>
                        <span class="text-right">xxxx</span>
                    </div>
                    <div class="grid grid-cols-8">
                        <span />
                        <span />
                        <span class="col-span-5">Interest Expense</span>
                        <span class="text-right">xxxx</span>
                    </div>
                    <div class="grid grid-cols-8">
                        <span />
                        <span />
                        <span class="col-span-5">Meals Expense</span>
                        <span class="text-right">xxxx</span>
                    </div>
                    <div class="grid grid-cols-8">
                        <span />
                        <span />
                        <span class="col-span-5">Meeting Expense</span>
                        <span class="text-right">xxxx</span>
                    </div>
                    <div class="grid grid-cols-8">
                        <span />
                        <span />
                        <span class="col-span-5">Office Supplies</span>
                        <span class="text-right">xxxx</span>
                    </div>
                    <div class="grid grid-cols-8">
                        <span />
                        <span />
                        <span class="col-span-5">Rent Expense</span>
                        <span class="text-right">xxxx</span>
                    </div>
                    <div class="grid grid-cols-8">
                        <span />
                        <span />
                        <span class="col-span-5">Repairs & Maintenance</span>
                        <span class="text-right">xxxx</span>
                    </div>
                    <div class="grid grid-cols-8">
                        <span />
                        <span />
                        <span class="col-span-5">Representation Expense</span>
                        <span class="text-right">xxxx</span>
                    </div>
                    <div class="grid grid-cols-8">
                        <span />
                        <span />
                        <span class="col-span-5">Traveling Expense</span>
                        <span class="text-right">xxxx</span>
                    </div>
                    <div class="grid grid-cols-8">
                        <span />
                        <span />
                        <span class="col-span-5">Utilities Expense, Light and Water</span>
                        <span class="text-right">xxxx</span>
                    </div>
                </div>
                <div class="grid grid-cols-8">
                    <span class="col-span-7 font-bold">TOTAL DIRECT COSTS</span>
                    <span class="text-right">xxxx</span>
                </div>
            </div>

            <div class="flex flex-col">
                <div class="grid grid-cols-8">
                    <span class="col-span-8 font-bold">Marketing</span>
                </div>
                <div class="grid grid-cols-8">
                    <span />
                    <span class="col-span-6">Marketing Expense</span>

                    <span class="text-right">xxxx</span>
                </div>
                <div class="grid grid-cols-8">
                    <span class="col-span-7 font-bold">TOTAL MARKETING EXPENSES</span>
                    <span class="text-right">xxxx</span>
                </div>
            </div>
            <div class="flex flex-col">
                <div class="grid grid-cols-8">
                    <span class="col-span-7 font-bold">TOTAL PROJECT EXPENSES</span>
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
